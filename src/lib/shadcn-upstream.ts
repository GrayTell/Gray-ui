import { spawn } from 'node:child_process'
import fs from 'node:fs'
import net from 'node:net'
import path from 'node:path'

/**
 * Upstream manager for the vendored original shadcn/ui clone.
 *
 * The clone lives at <project>/shadcn-ui (gitignored, local reference only).
 * Its docs app (shadcn-ui/apps/v4) runs `next dev --turbopack` on port 3010
 * with basePath "/shadcn" and is exposed through the Gray UI app via the
 * reverse proxy at src/app/shadcn/[[...slug]]/route.ts.
 *
 * Because sandbox background processes can be reaped between sessions, the
 * upstream is self-healing: if the port is closed the proxy spawns a fresh
 * dev server on demand (guarded by a pid file + spawn cooldown), waits for
 * it to listen, and lets the request proceed.
 */

export const SHADCN_UPSTREAM_HOST = '127.0.0.1'
export const SHADCN_UPSTREAM_PORT = 3010
export const SHADCN_UPSTREAM_ORIGIN = `http://${SHADCN_UPSTREAM_HOST}:${SHADCN_UPSTREAM_PORT}`

const APP_DIR = path.join(process.cwd(), 'shadcn-ui', 'apps', 'v4')
const NEXT_BIN = path.join(APP_DIR, 'node_modules', '.bin', 'next')
const PID_FILE = '/tmp/shadcn-v4-dev.pid'
const LOG_FILE = '/tmp/shadcn-v4-dev.log'
const SPAWN_COOLDOWN_MS = 30_000
const BOOT_TIMEOUT_MS = 180_000

export type ShadcnUpstreamErrorCode = 'CLONE_MISSING' | 'BOOT_TIMEOUT' | 'BOOTING'

export class ShadcnUpstreamError extends Error {
  code: ShadcnUpstreamErrorCode

  constructor(code: ShadcnUpstreamErrorCode, message: string) {
    super(message)
    this.name = 'ShadcnUpstreamError'
    this.code = code
  }
}

/** True when something is listening on the upstream port. */
function isPortOpen(): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = net.connect({ port: SHADCN_UPSTREAM_PORT, host: SHADCN_UPSTREAM_HOST })
    const settle = (open: boolean) => {
      socket.destroy()
      resolve(open)
    }
    socket.setTimeout(1_000)
    socket.once('connect', () => settle(true))
    socket.once('error', () => settle(false))
    socket.once('timeout', () => settle(false))
  })
}

async function waitForPort(timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    if (await isPortOpen()) return
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  throw new ShadcnUpstreamError(
    'BOOT_TIMEOUT',
    'The original shadcn/ui dev server did not start in time.'
  )
}

function readPidFile(): number | null {
  try {
    const raw = fs.readFileSync(PID_FILE, 'utf8').trim()
    const pid = Number.parseInt(raw, 10)
    return Number.isFinite(pid) && pid > 0 ? pid : null
  } catch {
    return null
  }
}

function writePidFile(pid: number): void {
  try {
    fs.writeFileSync(PID_FILE, String(pid))
  } catch {
    // Non-fatal: worst case we spawn a duplicate that fails to bind the port.
  }
}

/** The pid is alive AND looks like the vendored next dev process. */
function isAliveUpstream(pid: number): boolean {
  try {
    process.kill(pid, 0)
  } catch {
    return false
  }
  try {
    const cmdline = fs.readFileSync(`/proc/${pid}/cmdline`, 'utf8')
    return cmdline.includes('next') || cmdline.includes('pnpm')
  } catch {
    // Alive but cmdline unreadable — assume it is ours.
    return true
  }
}

let ensurePromise: Promise<void> | null = null
let lastSpawnAt = 0

/**
 * Make sure the upstream shadcn/ui dev server is listening.
 * Resolves quickly when already up; otherwise boots it and waits.
 */
export async function ensureShadcnUpstream(): Promise<void> {
  if (await isPortOpen()) return

  if (!fs.existsSync(path.join(APP_DIR, 'package.json'))) {
    throw new ShadcnUpstreamError(
      'CLONE_MISSING',
      'The vendored shadcn/ui clone is not present in this environment.'
    )
  }

  if (!ensurePromise) {
    ensurePromise = bootUpstream().finally(() => {
      ensurePromise = null
    })
  }
  await ensurePromise
}

async function bootUpstream(): Promise<void> {
  // Spawned during an earlier request or server lifetime and still booting?
  const pid = readPidFile()
  if (pid && isAliveUpstream(pid)) {
    await waitForPort(BOOT_TIMEOUT_MS)
    return
  }

  // Avoid respawn spam when the boot keeps failing.
  const now = Date.now()
  if (now - lastSpawnAt < SPAWN_COOLDOWN_MS) {
    throw new ShadcnUpstreamError(
      'BOOTING',
      'The original shadcn/ui dev server is still starting; retry in a moment.'
    )
  }
  lastSpawnAt = now

  const logFd = fs.openSync(LOG_FILE, 'a')
  fs.appendFileSync(
    LOG_FILE,
    `\n[${new Date().toISOString()}] spawned by the Gray UI /shadcn proxy\n`
  )
  const runNext = fs.existsSync(NEXT_BIN)
    ? `exec ${JSON.stringify(NEXT_BIN)} dev --turbopack --port ${SHADCN_UPSTREAM_PORT}`
    : `exec corepack pnpm exec next dev --turbopack --port ${SHADCN_UPSTREAM_PORT}`
  const child = spawn('bash', ['-c', `cd ${JSON.stringify(APP_DIR)} && ${runNext}`], {
    cwd: APP_DIR,
    detached: true,
    stdio: ['ignore', logFd, logFd],
    env: process.env,
  })
  child.unref()
  if (child.pid) writePidFile(child.pid)

  await waitForPort(BOOT_TIMEOUT_MS)
}

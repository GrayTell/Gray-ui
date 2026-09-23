/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Gray UI — keep-alive daemon.
 *
 * Watches the dev server on port 3000 and restarts it whenever it dies.
 * Logs: /tmp/gray-ui-daemon.log (daemon) + /tmp/gray-ui-dev.log (server).
 *
 * Usage:  node daemon.cjs        (or: bun run daemon)
 */
const { spawn } = require('child_process')
const fs = require('fs')
const net = require('net')

const APP_DIR = __dirname
const PORT = 3000
const RESTART_DELAY_MS = 3000
const WATCH_INTERVAL_MS = 5000

let child = null
let lastStartAt = 0

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`
  console.log(line)
  try {
    fs.appendFileSync('/tmp/gray-ui-daemon.log', line + '\n')
  } catch {}
}

function probe() {
  return new Promise((resolve) => {
    const socket = net.createConnection({ port: PORT, host: '127.0.0.1' })
    socket.setTimeout(1500)
    socket.once('connect', () => {
      socket.destroy()
      resolve(true)
    })
    socket.once('timeout', () => {
      socket.destroy()
      resolve(false)
    })
    socket.once('error', () => resolve(false))
  })
}

function startServer() {
  if (child) return Promise.resolve()

  const out = fs.openSync('/tmp/gray-ui-dev.log', 'a')
  log('starting next dev ...')
  lastStartAt = Date.now()

  child = spawn('./node_modules/.bin/next', ['dev', '-p', String(PORT)], {
    cwd: APP_DIR,
    stdio: ['ignore', out, out],
    env: { ...process.env, NODE_ENV: 'development' },
  })

  child.on('exit', (code, signal) => {
    const ranFor = Date.now() - lastStartAt
    log(`server exited code=${code} signal=${signal} ranFor=${ranFor}ms`)
    child = null
    // If it crashed immediately, back off a little longer.
    const delay = ranFor < 5000 ? RESTART_DELAY_MS * 3 : RESTART_DELAY_MS
    setTimeout(startServer, delay)
  })

  return Promise.resolve()
}

async function watch() {
  const alive = await probe()
  if (!alive && !child) {
    log('health check failed — restarting server')
    await startServer()
  } else if (alive && !child) {
    // Server is up but not managed by us (e.g. started manually).
    log('port serving from external process — monitoring only')
  }
}

log('daemon started')
;(async () => {
  // Adopt an already-running server if present.
  if (await probe()) {
    log('port 3000 already serving — monitoring only')
  } else {
    await startServer()
  }
  setInterval(watch, WATCH_INTERVAL_MS)
})()

process.on('SIGTERM', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))

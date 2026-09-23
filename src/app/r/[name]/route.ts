import { readFile } from 'fs/promises'
import path from 'path'

import { NextResponse } from 'next/server'

import { ALL_REGISTRY_ITEMS, EXCLUSIVE_ITEMS, LOADING_ITEMS, TOAST_ITEM } from '@/lib/registry'

const REGISTRY_ORIGIN = 'https://gray-ui.vercel.app'
const NO_STORE = { 'Cache-Control': 'no-store' } as const

function notFound() {
  return NextResponse.json({ error: 'Unknown registry item' }, { status: 404, headers: NO_STORE })
}

/**
 * Accept both `/r/button` and `/r/button.json`; the name itself must be
 * kebab-safe so it can never traverse the filesystem.
 */
function sanitizeName(raw: string): string | null {
  const name = raw.endsWith('.json') ? raw.slice(0, -'.json'.length) : raw
  return /^[a-z0-9-]+$/.test(name) ? name : null
}

async function readProjectFile(...segments: string[]): Promise<string> {
  return readFile(path.join(process.cwd(), ...segments), 'utf8')
}

/** Stamp every served item with Gray provenance metadata. */
function withGrayMeta<T extends Record<string, unknown>>(item: T) {
  return {
    ...item,
    meta: {
      ...((item.meta as Record<string, unknown> | undefined) ?? {}),
      registry: "gray",
      source: REGISTRY_ORIGIN,
    },
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name: rawName } = await params
  const name = sanitizeName(rawName)
  if (!name) return notFound()

  // 0) `index` — the registry index (same payload as /r), reachable at the
  //    conventional /r/index.json URL.
  if (name === 'index') {
    const homepage = REGISTRY_ORIGIN
    return NextResponse.json(
      {
        $schema: 'https://ui.shadcn.com/schema/registry.json',
        name: 'gray',
        homepage,
        items: ALL_REGISTRY_ITEMS.map(
          ({ name, type, title, description, dependencies, registryDependencies, files }) => ({
            name,
            type,
            title,
            description,
            dependencies,
            registryDependencies,
            files,
          }),
        ),
      },
      { headers: NO_STORE },
    )
  }

  // 1) Item with a complete registry JSON (with content).
  //    `toast` is intentionally skipped — it is not in the v4 registry and is
  //    rebuilt from local sources below.
  if (name !== 'toast') {
    try {
      const raw = await readProjectFile('src', 'registry', 'vendor', `${name}.json`)
      const item = JSON.parse(raw) as Record<string, unknown>
      return NextResponse.json(withGrayMeta(item), { headers: NO_STORE })
    } catch {
      // No complete JSON — fall through to the generated-item branches.
    }
  }

  // 2) AI components — served under
  //    src/registry/ai-elements/*.json (cross-registry deps rewritten to Gray).
  try {
    const raw = await readProjectFile('src', 'registry', 'ai-elements', `${name}.json`)
    const item = JSON.parse(raw) as Record<string, unknown>
    return NextResponse.json(withGrayMeta(item), { headers: NO_STORE })
  } catch {
    // Not an AI element — fall through to the Gray-original branches.
  }

  // 3) `toast` — served from Gray local files.
  if (name === 'toast') {
    try {
      const [toast, toaster, useToast] = await Promise.all([
        readProjectFile('src', 'components', 'ui', 'toast.tsx'),
        readProjectFile('src', 'components', 'ui', 'toaster.tsx'),
        readProjectFile('src', 'hooks', 'use-toast.ts'),
      ])
      const item = {
        ...TOAST_ITEM,
        files: [
          { ...TOAST_ITEM.files[0], content: toast },
          { ...TOAST_ITEM.files[1], content: toaster },
          { ...TOAST_ITEM.files[2], content: useToast },
        ],
      }
      return NextResponse.json(withGrayMeta(item), { headers: NO_STORE })
    } catch {
      return notFound()
    }
  }

  // 4) Gray originals + loader suite — metadata from the item lists, content
  //    read from src/registry/items/<name>.tsx at request time.
  const grayItem = [...EXCLUSIVE_ITEMS, ...LOADING_ITEMS].find(
    (item) => item.name === name,
  )
  if (grayItem) {
    try {
      const content = await readProjectFile('src', 'registry', 'items', `${name}.tsx`)
      const item = {
        ...grayItem,
        files: grayItem.files.map((file) => ({ ...file, content })),
      }
      return NextResponse.json(withGrayMeta(item), { headers: NO_STORE })
    } catch {
      return notFound()
    }
  }

  return notFound()
}

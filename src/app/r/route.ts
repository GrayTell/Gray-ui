import { NextResponse } from 'next/server'

import { ALL_REGISTRY_ITEMS } from '@/lib/registry'

const NO_STORE = { 'Cache-Control': 'no-store' } as const

/**
 * Registry index — shadcn-compatible listing of all 110 items (55 stock,
 * including the AI suite; content-free — fetch each at /r/<name>.json).
 */
export async function GET(request: Request) {
  const homepage = new URL(request.url).origin

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

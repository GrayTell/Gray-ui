export const MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const
export type PackageManager = (typeof MANAGERS)[number]

/** Production origin of the Gray registry. */
export const DEFAULT_REGISTRY_ORIGIN = 'https://gray-ui.vercel.app'

/** URL of a single registry item, e.g. `${origin}/r/button.json`. */
export function registryItemUrl(slug: string, origin: string = DEFAULT_REGISTRY_ORIGIN): string {
  return `${origin}/r/${slug}.json`
}

/** `shadcn add <url>` command for every package manager. */
export function registryCommands(
  slug: string,
  origin: string = DEFAULT_REGISTRY_ORIGIN,
): Record<PackageManager, string> {
  const url = registryItemUrl(slug, origin)
  return {
    npm: `npx shadcn@latest add "${url}"`,
    pnpm: `pnpm dlx shadcn@latest add "${url}"`,
    yarn: `yarn dlx shadcn@latest add "${url}"`,
    bun: `bunx --bun shadcn@latest add "${url}"`,
  }
}

/** `shadcn add @gray/<slug>` — requires the namespace in components.json.
 *  Accepts a single slug or space-separated slugs (each gets the @gray prefix). */
export function namespaceCommands(
  slug: string,
  origin: string = DEFAULT_REGISTRY_ORIGIN,
): Record<PackageManager, string> {
  const aliases = slug
    .split(/\s+/)
    .filter(Boolean)
    .map((s) => `@gray/${s}`)
    .join(' ')
  return {
    npm: `npx shadcn@latest add ${aliases}`,
    pnpm: `pnpm dlx shadcn@latest add ${aliases}`,
    yarn: `yarn dlx shadcn@latest add ${aliases}`,
    bun: `bunx --bun shadcn@latest add ${aliases}`,
  }
}

/** Pretty-printed `registries` fragment for the user's components.json. */
export function registrySnippet(origin: string = DEFAULT_REGISTRY_ORIGIN): string {
  return JSON.stringify(
    {
      registries: {
        '@gray': `${origin}/r/{name}.json`,
      },
    },
    null,
    2,
  )
}

/**
 * Registry origin used by every displayed/copied snippet.
 * Always the production domain — never `window.location.origin` —
 * so install commands and links read identically in dev, preview and prod.
 */
export function useRegistryOrigin(): string {
  return DEFAULT_REGISTRY_ORIGIN
}

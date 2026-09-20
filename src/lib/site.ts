/**
 * Single source of truth for Gray UI branding, URLs and SEO metadata.
 * Client-safe (no server-only imports).
 */
export const siteConfig = {
  name: 'Gray UI',
  tagline: 'The Canvas for your Next Interface',
  description:
    'Gray UI ships composable, accessible React components with taste baked in. Copy the source, bend it to your will, and ship interfaces that feel engineered.',
  /** Production origin — the canonical Gray UI domain, used everywhere. */
  url: 'https://gray-ui.space-z.ai',
  author: { name: 'Graytell Labs', url: 'https://github.com/graytell' },
  credit: { org: 'Graytell Labs 2026', orgUrl: 'https://github.com/graytell' },
  keywords: [
    'Gray UI',
    'Graytell Labs',
    'Graytell',
    'shadcn',
    'shadcn registry',
    'component library',
    'React components',
    'Next.js',
    'Tailwind CSS',
    'TypeScript',
    'design system',
    'Satoshi font',
    'copy paste components',
  ],
} as const

/**
 * Single source of truth for Gray UI branding, URLs and SEO metadata.
 * Client-safe (no server-only imports).
 *
 * Homepage copy mirrors shadcn/ui v4 exactly (title + description),
 * per the "copy the shadcn interface" mandate.
 */
export const siteConfig = {
  name: 'Gray UI',
  /** Homepage headline — shadcn/ui v4 verbatim. */
  tagline: 'The Foundation for your Design System',
  /** Homepage description — shadcn/ui v4 verbatim. */
  description:
    'Composable, accessible components with thoughtful defaults. Build your own component library with code you can customize, extend, and make your own.',
  /** Production origin — the canonical Gray UI domain, used everywhere. */
  url: 'https://gray-ui.space-z.ai',
  author: { name: 'Graytell Labs', url: 'https://github.com/graytell' },
  credit: { org: 'Graytell Labs 2026', orgUrl: 'https://github.com/graytell' },
  links: {
    github: 'https://github.com/GrayTell/Gray-ui',
    org: 'https://github.com/graytell',
  },
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
    'Geist font',
    'copy paste components',
  ],
} as const

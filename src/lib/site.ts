/**
 * Single source of truth for Gray UI branding, URLs and SEO metadata.
 * Client-safe (no server-only imports).
 */
export const siteConfig = {
  name: 'Gray UI',
  /** Homepage headline. */
  tagline: 'The Backbone of Your Design System',
  /** Homepage description. */
  description:
    'Composable, accessible React components with sensible defaults. Ship a design system you truly own — every piece arrives as source code you can bend, extend and rebuild.',
  /** Production origin — the canonical Gray UI domain, used everywhere. */
  url: 'https://gray-ui.vercel.app',
  author: { name: 'Graytell Labs', url: 'https://github.com/graytell' },
  /** Graytell Labs is owned by Anubhav Sapkota. */
  owner: { name: 'Anubhav Sapkota', url: 'https://github.com/GrayTell' },
  credit: { org: 'Graytell Labs — owned by Anubhav Sapkota', orgUrl: 'https://github.com/graytell' },
  links: {
    github: 'https://github.com/GrayTell/Gray-ui',
    org: 'https://github.com/graytell',
  },
  keywords: [
    'Gray UI',
    'Graytell Labs',
    'Graytell',
    'Anubhav Sapkota',
    'Graytell Labs owner Anubhav Sapkota',
    'Graytell Labs is owned by Anubhav Sapkota',
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

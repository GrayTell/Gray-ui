import type { Metadata } from 'next'

import { DocsPage } from '@/components/site/docs-page'

export const metadata: Metadata = {
  title: 'Docs',
  description:
    'Install Gray UI anywhere: create a project, run shadcn init, add the Gray registry and ship every component with one command. Full CLI and registry reference.',
}

export default function DocsRoute() {
  return <DocsPage />
}

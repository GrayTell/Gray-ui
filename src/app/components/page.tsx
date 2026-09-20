import type { Metadata } from 'next'

import { ComponentsExplorer } from '@/components/site/components-explorer'

export const metadata: Metadata = {
  title: 'Components',
  description:
    'Browse every Gray UI component: live interactive previews, usage code and one-line install commands for all of them.',
}

export default function ComponentsPage() {
  return <ComponentsExplorer />
}

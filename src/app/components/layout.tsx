import type { ReactNode } from 'react'

import {
  ComponentsLayout,
  HashRedirect,
} from '@/components/site/components-docs'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'

/**
 * Shared shell for the whole /components section. Living at the layout
 * level (instead of inside each page) keeps the header, sidebar and
 * footer mounted across navigations — so the sidebar keeps its scroll
 * position when moving between the index and a component page.
 */
export default function ComponentsSectionLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <ComponentsLayout>
        <HashRedirect />
        {children}
      </ComponentsLayout>
      <SiteFooter />
    </div>
  )
}

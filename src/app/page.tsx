import Link from 'next/link'

import { Announcement } from '@/components/site/announcement'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/site/page-header'
import { CardsDemo } from '@/components/site/cards'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site'

/**
 * Gray UI homepage — hero, actions and the live card grid.
 */
export default function IndexPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="main" className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col">
          <PageHeader className="md:**:[.container]:pb-8 lg:**:[.container]:pb-12">
            <Announcement />
            <PageHeaderHeading className="max-w-4xl">
              {siteConfig.tagline}
            </PageHeaderHeading>
            <PageHeaderDescription>
              {siteConfig.description}
            </PageHeaderDescription>
            <PageActions>
              <Button asChild className="h-[35px]">
                <Link href="/docs#installation">Get Started</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/components">View Components</Link>
              </Button>
            </PageActions>
          </PageHeader>
          <div className="container-wrapper flex-1 p-0">
            <div className="container overflow-hidden md:px-0 lg:max-w-none">
              <CardsDemo />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

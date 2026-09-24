'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/lib/site'
import { GrayLogo } from '@/components/site/logo'
import { GitHubLink } from '@/components/site/github-link'
import { MainNav } from '@/components/site/main-nav'
import { ModeSwitcher } from '@/components/site/mode-switcher'
import { SoundToggle } from '@/components/site/sound'
import { SearchTrigger } from '@/components/site/search-trigger'

/**
 * Site header. Client component so both server pages and
 * client pages (docs, components explorer) can render it.
 */
const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
  { href: '/components', label: 'Components' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container-wrapper px-6">
        <div className="flex h-(--header-height) items-center **:data-[slot=separator]:h-4!">
          {/* Mobile: logo wordmark. */}
          <Link
            href="/"
            aria-label="Gray UI home"
            className="flex shrink-0 lg:hidden"
          >
            <GrayLogo />
          </Link>
          <MainNav items={NAV_ITEMS} className="hidden lg:flex" />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <SearchTrigger />
            </div>
            <Separator
              orientation="vertical"
              className="ml-2 hidden lg:block"
            />
            <GitHubLink />
            <Separator orientation="vertical" />
            <SoundToggle />
            <ModeSwitcher />
            <Button asChild size="sm" className="h-[31px] rounded-lg">
              <Link href="/docs">
                <Plus aria-hidden="true" />
                New
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { ArrowUpRight, Github, Moon, Plus, Search, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/site'
import { GrayLogo } from '@/components/site/logo'
import { useAnchorNav } from '@/components/site/use-anchor-nav'

const NAV_LINKS = [
  { label: 'Docs', href: '/docs' },
  { label: 'Components', href: '/components' },
  { label: 'Showcase', href: '/#showcase' },
  { label: 'Features', href: '/#features' },
  { label: 'Original shadcn/ui', href: '/shadcn' },
]

interface SiteHeaderProps {
  onOpenSearch: () => void
}

export function SiteHeader({ onOpenSearch }: SiteHeaderProps) {
  const { setTheme, resolvedTheme } = useTheme()
  const pathname = usePathname()
  const anchorNav = useAnchorNav()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === 'dark'

  /* Same-page anchors scroll smoothly; cross-page anchors route home first. */
  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('/#')) return
    e.preventDefault()
    anchorNav(href.slice(2))
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center transition-opacity hover:opacity-80"
          aria-label="Gray UI home"
        >
          <GrayLogo />
        </Link>

        {/* Nav links */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => onNavClick(e, link.href)}
              aria-current={
                link.href === '/components' && pathname === '/components' ? 'page' : undefined
              }
              className={cn(
                'rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-foreground',
                link.href === '/components' && pathname === '/components'
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Search trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Open command menu (Ctrl+K)"
            className="hidden h-9 items-center gap-2 whitespace-nowrap rounded-lg border border-input bg-muted/50 px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:flex"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="w-32 truncate text-left">Search components...</span>
            <kbd className="ml-4 rounded border border-border bg-muted px-1.5 text-[10px] font-medium">
              ⌘K
            </kbd>
          </button>
          {/* Mobile search */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSearch}
            aria-label="Open command menu"
            className="h-9 w-9 md:hidden"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </Button>

          {/* Our own deployed version of shadcn/ui */}
          <a
            href={siteConfig.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open our deployed version of shadcn/ui at ${siteConfig.url.replace('https://', '')}`}
            title="Our own deployed version of shadcn/ui"
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:flex"
          >
            Live site
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          {/* GitHub stars */}
          <a
            href="https://github.com/graytell"
            target="_blank"
            rel="noreferrer"
            aria-label="Gray UI on GitHub — 124k stars"
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:flex"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium tabular-nums">124k</span>
          </a>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="h-9 w-9"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
          >
            {mounted ? (
              isDark ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>

          {/* CTA */}
          <Button size="sm" className="h-9 gap-1 rounded-lg" aria-label="Create new project">
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            New
            <ArrowUpRight className="ml-1 hidden h-3 w-3 opacity-70 sm:inline" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>
  )
}

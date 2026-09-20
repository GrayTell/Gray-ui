'use client'

import Link from 'next/link'
import { Github } from 'lucide-react'

import { useAnchorNav } from '@/components/site/use-anchor-nav'

export function SiteFooter() {
  const anchorNav = useAnchorNav()

  return (
    <footer className="mt-auto border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:flex-row sm:px-6">
        <p className="text-center text-sm text-muted-foreground sm:text-left">
          Created by{' '}
          <a
            href="https://github.com/graytell"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Graytell Labs
          </a>{' '}
          2026. Visit{' '}
          <a
            href="https://github.com/graytell"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            github.com/graytell
          </a>{' '}
          for more info and our other products.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/#installation"
            onClick={(e) => {
              e.preventDefault()
              anchorNav('installation')
            }}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Docs
          </Link>
          <Link
            href="/components"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Components
          </Link>
          <a
            href="https://github.com/graytell"
            target="_blank"
            rel="noreferrer"
            aria-label="Gray UI on GitHub"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}

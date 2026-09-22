'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import {
  CATEGORY_ORDER,
  COMPONENTS,
  getComponent,
  type ComponentCategory,
} from '@/lib/component-registry'

/**
 * Docs-style shell + sidebar for the /components section, mirroring the
 * shadcn/ui docs layout: sticky left sidebar with a Sections group and one
 * group per component category, on a two-column grid.
 */

const SECTIONS = [
  { name: 'Introduction', href: '/docs' },
  { name: 'Components', href: '/components' },
  { name: 'Installation', href: '/docs#installation' },
  { name: 'CLI', href: '/docs#cli' },
  { name: 'Theming', href: '/docs#theming' },
]

function SidebarButton({
  href,
  active,
  onClick,
  children,
}: {
  href: string
  active: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active ? 'true' : undefined}
      className="relative h-[30px] w-fit overflow-visible rounded-md border border-transparent px-2 text-[0.8rem] font-medium text-foreground outline-none after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring data-[active=true]:border-accent data-[active=true]:bg-accent"
    >
      {/* Full-column hover strip, like the shadcn docs sidebar. */}
      <span className="absolute inset-0 flex w-56 bg-transparent" aria-hidden="true" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  )
}

export function ComponentsSidebar() {
  const pathname = usePathname()

  return (
    <div
      className="sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-10rem)] overflow-hidden overscroll-none bg-transparent lg:flex"
      style={
        {
          '--sidebar-menu-width': 'calc(var(--spacing) * 56)',
        } as React.CSSProperties
      }
    >
      {/* Right-edge hairline, like the shadcn docs sidebar. */}
      <div
        aria-hidden="true"
        className="absolute top-12 right-2 bottom-0 hidden h-full w-px bg-[linear-gradient(to_bottom,transparent_0%,var(--border)_10%,var(--border)_90%,transparent_100%)] lg:block"
      />
      <div className="no-scrollbar h-full w-(--sidebar-menu-width) overflow-x-hidden overflow-y-auto pl-2.5">
        {/* Sections */}
        <div className="relative pt-12 pb-2">
          <p className="mb-1 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-muted-foreground">
            Sections
          </p>
          <div className="flex flex-col gap-0.5">
            {SECTIONS.map((section) => {
              const base = section.href.split('#')[0]
              const active =
                base === '/docs'
                  ? false
                  : base === '/components'
                    ? pathname === '/components' ||
                      pathname.startsWith('/components/')
                    : pathname.startsWith(base)
              return (
                <Link key={section.name} href={section.href} className="w-fit">
                  <SidebarButton href={section.href} active={active}>
                    {section.name}
                  </SidebarButton>
                </Link>
              )
            })}
          </div>
        </div>

        {/* One group per component category */}
        {CATEGORY_ORDER.map((category: ComponentCategory) => {
          const entries = COMPONENTS.filter((c) => c.category === category)
          if (entries.length === 0) return null
          return (
            <div key={category} className="relative pb-2">
              <p className="mb-1 flex h-8 shrink-0 items-center gap-2 rounded-md px-2 text-xs font-medium text-muted-foreground">
                {category}
                <span className="rounded-full bg-muted px-1.5 text-[10px] font-medium tabular-nums text-muted-foreground">
                  {entries.length}
                </span>
              </p>
              <div className="flex flex-col gap-0.5">
                {entries.map((entry) => {
                  const href = `/components/${entry.slug}`
                  return (
                    <Link key={entry.slug} href={href} className="w-fit">
                      <SidebarButton
                        href={href}
                        active={pathname === href}
                      >
                        {entry.name}
                      </SidebarButton>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
        <div className="h-16" aria-hidden="true" />
      </div>
    </div>
  )
}

/** Two-column docs shell: sidebar + content. */
export function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container-wrapper flex flex-1 flex-col px-2">
      <div
        className="flex min-h-min flex-1 flex-col items-start px-0 [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--top-spacing:calc(var(--spacing)*4)]"
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
          } as React.CSSProperties
        }
      >
        <ComponentsSidebar />
        <div className="h-full w-full min-w-0">{children}</div>
      </div>
    </div>
  )
}

/**
 * Back-compat: old links point at /components#dialog. The components
 * section now uses real URLs, so forward any known hash to its page.
 */
export function HashRedirect() {
  const router = useRouter()

  React.useEffect(() => {
    const forward = () => {
      const slug = window.location.hash.replace('#', '')
      if (slug && getComponent(slug)) {
        router.replace(`/components/${slug}`)
      }
    }
    forward()
    window.addEventListener('hashchange', forward)
    return () => window.removeEventListener('hashchange', forward)
  }, [router])

  return null
}

/** "New" indicator used by the components index grid. */
export function NewDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('flex size-2 rounded-full bg-blue-500', className)}
    />
  )
}

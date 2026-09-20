'use client'

import * as React from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  Search,
  Sparkles,
} from 'lucide-react'

import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { getRegistryItemMeta } from '@/lib/registry'
import {
  namespaceCommands,
  registryCommands,
  registrySnippet,
  useRegistryOrigin,
} from '@/lib/install-command'
import {
  CATEGORY_ORDER,
  COMPONENTS,
  getComponent,
  getNeighbours,
  type ComponentCategory,
  type ComponentEntry,
} from '@/lib/component-registry'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CodeBlock } from '@/components/site/code-block'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { CommandMenu } from '@/components/site/command-menu'
import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { PackageManagerTabs, type PackageManager } from '@/components/site/package-manager-tabs'

function SidebarNav({
  selected,
  query,
  onSelect,
}: {
  selected: string
  query: string
  onSelect: (slug: string) => void
}) {
  return (
    <>
      {CATEGORY_ORDER.map((category: ComponentCategory) => {
        const entries = COMPONENTS.filter(
          (c) =>
            c.category === category &&
            (c.name.toLowerCase().includes(query) || c.slug.includes(query))
        )
        if (entries.length === 0) return null
        return (
          <div key={category} className="mb-5">
            <p className="mb-1.5 flex items-center gap-2 px-2 text-xs font-semibold text-foreground">
              {category === 'Originals' && (
                <Sparkles className="h-3 w-3" aria-hidden="true" />
              )}
              {category}
              <span className="rounded-full bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
                {entries.length}
              </span>
            </p>
            <ul className="space-y-0.5">
              {entries.map((entry) => (
                <li key={entry.slug}>
                  <button
                    type="button"
                    onClick={() => onSelect(entry.slug)}
                    aria-current={selected === entry.slug ? 'true' : undefined}
                    className={cn(
                      'w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors',
                      selected === entry.slug
                        ? 'bg-accent font-medium text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                    )}
                  >
                    {entry.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
      {CATEGORY_ORDER.every((category) => {
        const entries = COMPONENTS.filter(
          (c) =>
            c.category === category &&
            (c.name.toLowerCase().includes(query) || c.slug.includes(query))
        )
        return entries.length === 0
      }) && <p className="px-2 text-sm text-muted-foreground">No components match.</p>}
    </>
  )
}

export function ComponentsExplorer() {
  const { toast } = useToast()
  const origin = useRegistryOrigin()
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string>('button')
  const [view, setView] = React.useState<'preview' | 'code'>('preview')
  const [manager, setManager] = React.useState<PackageManager>('npm')
  const [query, setQuery] = React.useState('')
  const [copied, setCopied] = React.useState(false)
  const copyTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const mainRef = React.useRef<HTMLElement | null>(null)

  /* Deep links: /components#dialog */
  React.useEffect(() => {
    const applyHash = () => {
      const slug = window.location.hash.replace('#', '')
      if (slug && getComponent(slug)) {
        setSelected(slug)
        setView('preview')
      }
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  React.useEffect(
    () => () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current)
    },
    []
  )

  const selectComponent = React.useCallback((slug: string) => {
    setSelected(slug)
    setView('preview')
    window.history.replaceState(null, '', `#${slug}`)
    mainRef.current?.scrollIntoView({ block: 'start' })
  }, [])

  const entry: ComponentEntry = getComponent(selected) ?? COMPONENTS[0]
  const neighbours = getNeighbours(entry.slug)
  const meta = React.useMemo(() => getRegistryItemMeta(entry.slug), [entry.slug])

  const copyInstall = () => {
    const command = registryCommands(entry.slug, origin)[manager]
    navigator.clipboard?.writeText(command).catch(() => {})
    setCopied(true)
    if (copyTimeout.current) clearTimeout(copyTimeout.current)
    copyTimeout.current = setTimeout(() => setCopied(false), 1600)
    toast({ title: 'Install command copied', description: command })
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <CommandMenu open={searchOpen} onOpenChange={setSearchOpen} />
      <SiteHeader onOpenSearch={() => setSearchOpen(true)} />

      <div className="mx-auto flex w-full max-w-7xl flex-1 items-stretch px-4 sm:px-6">
        {/* Sidebar (desktop) */}
        <aside
          aria-label="All components"
          className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-56 shrink-0 flex-col overflow-y-auto py-6 pr-6 [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar]:w-1.5 lg:flex"
        >
          <div className="relative mb-4">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              placeholder="Filter components…"
              aria-label="Filter components"
              className="h-8 bg-muted/50 pl-8 text-sm"
            />
          </div>
          <nav aria-label="Component categories">
            <SidebarNav selected={selected} query={query} onSelect={selectComponent} />
          </nav>
        </aside>

        {/* Main */}
        <main ref={mainRef} id="component-main" className="min-w-0 flex-1 py-8 lg:pl-8">
          {/* Mobile / tablet picker */}
          <div className="mb-6 lg:hidden">
            <Select value={entry.slug} onValueChange={selectComponent}>
              <SelectTrigger aria-label="Choose a component" className="w-full">
                <SelectValue placeholder="Choose a component" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_ORDER.map((category) => (
                  <SelectGroup key={category}>
                    <SelectLabel>{category}</SelectLabel>
                    {COMPONENTS.filter((c) => c.category === category).map((c) => (
                      <SelectItem key={c.slug} value={c.slug}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Header */}
          <header>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              {entry.category === 'Originals' ? (
                <Badge variant="outline" className="gap-1 rounded-full font-medium text-foreground">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  Gray Original
                </Badge>
              ) : null}
              {entry.category}
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{entry.name}</h1>
            <p className="mt-3 max-w-2xl text-balance text-muted-foreground">
              {entry.description}
            </p>
          </header>

          {/* Preview / Code */}
          <Tabs
            value={view}
            onValueChange={(v) => setView(v as 'preview' | 'code')}
            className="mt-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <TabsList className="h-9 rounded-lg bg-muted p-0.5">
                <TabsTrigger
                  value="preview"
                  className="h-8 rounded-md px-4 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="h-8 rounded-md px-4 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Code
                </TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm" className="h-9 gap-1.5" onClick={copyInstall}>
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                Copy install
              </Button>
            </div>

            <TabsContent value="preview" className="mt-4">
              <div
                key={entry.slug}
                className="flex min-h-[26rem] items-center justify-center overflow-hidden rounded-xl border border-border p-6 [background-image:radial-gradient(color-mix(in_oklab,var(--border)_70%,transparent)_1px,transparent_1px)] [background-size:14px_14px] sm:p-10"
              >
                <entry.Demo />
              </div>
            </TabsContent>
            <TabsContent value="code" className="mt-4">
              <CodeBlock
                code={entry.code}
                filename={`${entry.slug}-demo.tsx`}
                aria-label={`${entry.name} usage example`}
              />
            </TabsContent>
          </Tabs>

          {/* Installation */}
          <section className="mt-10" aria-label="Installation">
            <h3 className="text-lg font-semibold tracking-tight">Installation</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Run the command below and the source for <span className="font-medium text-foreground">{entry.name}</span> lands
              in your project — no package, no lock-in.
            </p>
            <div className="mt-4">
              <PackageManagerTabs
                commands={registryCommands(entry.slug, origin)}
                manager={manager}
                onManagerChange={setManager}
              />
            </div>

            {/* What's included */}
            {meta && (
              <div className="mt-5">
                <p className="text-xs font-medium text-muted-foreground">What&apos;s included</p>
                <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Files and dependencies included">
                  {meta.files.map((file) => (
                    <li
                      key={file.path}
                      className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-foreground"
                    >
                      {file.path.split('/').pop()}
                    </li>
                  ))}
                  {meta.registryDependencies.map((dep) => (
                    <li
                      key={dep}
                      className="rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      needs: {dep}
                    </li>
                  ))}
                  {meta.dependencies.map((dep) => (
                    <li
                      key={dep}
                      className="rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      pkg: {dep}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Short alias */}
            <Collapsible className="mt-5">
              <CollapsibleTrigger className="group inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-foreground transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Prefer a short alias?
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-180"
                  aria-hidden="true"
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3 space-y-3 overflow-hidden data-[state=closed]:hidden">
                <CodeBlock
                  code={registrySnippet(origin)}
                  filename="components.json"
                  aria-label="Registry configuration snippet"
                />
                <CodeBlock
                  code={namespaceCommands(entry.slug, origin)[manager]}
                  prompt={false}
                  aria-label="Namespace install command"
                />
                <p className="text-sm text-muted-foreground">
                  Add the Gray registry to{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">
                    components.json
                  </code>{' '}
                  once, then install with the short{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">
                    @gray/
                  </code>{' '}
                  alias.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </section>

          {/* Prev / Next */}
          <nav
            aria-label="Component pagination"
            className="mt-12 grid gap-3 border-t border-border/60 pt-8 sm:grid-cols-2"
          >
            {neighbours.prev ? (
              <button
                type="button"
                onClick={() => selectComponent(neighbours.prev!.slug)}
                className="group rounded-xl border border-border p-4 text-left transition-colors hover:bg-accent"
              >
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  Previous
                </span>
                <span className="mt-1 block text-sm font-semibold">{neighbours.prev.name}</span>
              </button>
            ) : (
              <span aria-hidden="true" />
            )}
            {neighbours.next ? (
              <button
                type="button"
                onClick={() => selectComponent(neighbours.next!.slug)}
                className="group rounded-xl border border-border p-4 text-right transition-colors hover:bg-accent sm:col-start-2"
              >
                <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                  Next
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="mt-1 block text-sm font-semibold">{neighbours.next.name}</span>
              </button>
            ) : (
              <span aria-hidden="true" />
            )}
          </nav>
        </main>
      </div>

      <SiteFooter />
    </div>
  )
}

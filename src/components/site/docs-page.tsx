'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Check,
  Sparkles,
  Terminal,
  Wrench,
} from 'lucide-react'

import {
  namespaceCommands,
  registryCommands,
  registryItemUrl,
  registrySnippet,
  useRegistryOrigin,
} from '@/lib/install-command'
import { COMPONENT_COUNT, AI_COUNT } from '@/lib/component-registry'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CodeBlock } from '@/components/site/code-block'
import {
  PackageManagerTabs,
  type PackageManager,
} from '@/components/site/package-manager-tabs'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

const SECTIONS = [
  { id: 'introduction', label: 'Introduction', group: 'Getting Started' },
  { id: 'installation', label: 'Installation', group: 'Getting Started' },
  { id: 'registry', label: 'The Registry', group: 'Getting Started' },
  { id: 'ai', label: 'AI Components', group: 'Getting Started' },
  { id: 'cli', label: 'CLI Reference', group: 'Reference' },
  { id: 'theming', label: 'Theming', group: 'Reference' },
] as const

type SectionId = (typeof SECTIONS)[number]['id']

/** Per-manager "create project" commands (step 1). */
const CREATE_APP: Record<PackageManager, string> = {
  npm: 'npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir',
  pnpm: 'pnpm create next-app@latest my-app --typescript --tailwind --eslint --app --src-dir',
  yarn: 'yarn create next-app@latest my-app --typescript --tailwind --eslint --app --src-dir',
  bun: 'bunx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir',
}

/** Per-manager "init shadcn" commands (step 2). */
const INIT_SHADCN: Record<PackageManager, string> = {
  npm: 'npx shadcn@latest init',
  pnpm: 'pnpm dlx shadcn@latest init',
  yarn: 'yarn dlx shadcn@latest init',
  bun: 'bunx --bun shadcn@latest init',
}

const USAGE_CODE = `import { Button } from '@/components/ui/button'

export default function Page() {
  return <Button>Ship it</Button>
}`

const THEME_CODE = `/* app/globals.css — pure monochrome zinc, both modes */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --border: oklch(0.922 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --border: oklch(1 0 0 / 10%);
}`

const POPULAR: { slug: string; note?: string }[] = [
  { slug: 'button' },
  { slug: 'dialog' },
  { slug: 'card' },
  { slug: 'chart' },
  { slug: 'date-picker' },
  { slug: 'claimable-balance' },
  { slug: 'shimmer' },
  { slug: 'chain-of-thought' },
]

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function StepShell({
  n,
  title,
  children,
}: {
  n: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="relative pl-11">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border bg-background font-mono text-sm font-semibold text-foreground"
      >
        {n}
      </span>
      <h3 className="pt-1.5 text-lg font-semibold tracking-tight">{title}</h3>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  )
}

function Section({
  id,
  title,
  kicker,
  children,
}: {
  id: SectionId
  title: string
  kicker?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      {kicker ? (
        <p className="text-sm font-medium text-muted-foreground">{kicker}</p>
      ) : null}
      <h2
        id={`${id}-title`}
        className="mt-1 scroll-mt-24 text-2xl font-bold tracking-tight sm:text-3xl"
      >
        {title}
      </h2>
      <div className="mt-5 space-y-6">{children}</div>
    </section>
  )
}

function CmdRow({ cmd, note }: { cmd: string; note: string }) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
      <code className="rounded-md bg-muted px-2 py-1 font-mono text-[13px] text-foreground">
        {cmd}
      </code>
      <span className="text-sm text-muted-foreground sm:pl-4">{note}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function DocsPage() {
  const origin = useRegistryOrigin()
  const [manager, setManager] = React.useState<PackageManager>('npm')
  const [active, setActive] = React.useState<SectionId>('introduction')
  const mainRef = React.useRef<HTMLDivElement | null>(null)

  /* Scroll-spy for the sidebar */
  React.useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const probe = window.innerHeight * 0.35
        let current: SectionId = 'introduction'
        for (const s of SECTIONS) {
          const el = document.getElementById(s.id)
          if (el && el.getBoundingClientRect().top <= probe) current = s.id
        }
        setActive(current)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const jump = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  const sidebar = (
    <nav aria-label="Docs sections" className="space-y-6 text-sm">
      {['Getting Started', 'Reference'].map((group) => (
        <div key={group}>
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {group}
          </p>
          <ul className="space-y-0.5">
            {SECTIONS.filter((s) => s.group === group).map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => jump(s.id)}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={cn(
                    'w-full rounded-md px-2 py-1.5 text-left transition-colors',
                    active === s.id
                      ? 'bg-accent font-medium text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                  )}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Separator />
      <div>
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Library
        </p>
        <Link
          href="/components"
          className="flex items-center justify-between rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
        >
          <span className="flex items-center gap-2">
            <Boxes className="h-3.5 w-3.5" aria-hidden="true" />
            Components
          </span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  )

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <div className="mx-auto flex w-full max-w-7xl flex-1 items-stretch px-4 sm:px-6">
        {/* Sidebar (desktop) */}
        <aside
          aria-label="Docs navigation"
          className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-56 shrink-0 flex-col overflow-y-auto py-8 pr-6 [scrollbar-width:thin] lg:flex"
        >
          {sidebar}
        </aside>

        {/* Main */}
        <main
          ref={mainRef}
          id="main"
          className="min-w-0 flex-1 py-8 lg:pl-10"
        >
          {/* Mobile anchor chips */}
          <div className="mb-8 flex gap-1.5 overflow-x-auto pb-1 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => jump(s.id)}
                className={
                  'shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors ' +
                  (active === s.id
                    ? 'border-foreground bg-foreground text-background font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground')
                }
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="max-w-3xl space-y-16 pb-4">
            {/* ------------------------------------------ Introduction */}
            <Section id="introduction" title="Introduction" kicker="Getting Started">
              <p className="text-base leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Gray UI</span> is a
                component registry — not an npm package. Every
                component&apos;s source lands in your repo through the{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">
                  shadcn
                </code>{' '}
                CLI, so you own the code: copy it, bend it, ship it. No lock-in, no
                updates to wait for.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="rounded-full">
                  {COMPONENT_COUNT} components
                </Badge>
                <Badge variant="outline" className="gap-1 rounded-full">
                  {AI_COUNT} AI components
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  React + Tailwind v4
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  TypeScript
                </Badge>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="#installation"
                  onClick={(e) => {
                    e.preventDefault()
                    jump('installation')
                  }}
                  className="group rounded-xl border p-4 transition-colors hover:bg-accent/50"
                >
                  <Terminal className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <p className="mt-2 font-medium">Installation</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    From an empty folder to your first component in four steps.
                  </p>
                </Link>
                <Link
                  href="/components"
                  className="group rounded-xl border p-4 transition-colors hover:bg-accent/50"
                >
                  <Boxes className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <p className="mt-2 font-medium">Component library</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Live previews and one-line installs for all {COMPONENT_COUNT} components.
                  </p>
                </Link>
              </div>
            </Section>

            {/* ------------------------------------------ Installation */}
            <Section id="installation" title="Installation" kicker="Getting Started">
              <p className="text-base leading-relaxed text-muted-foreground">
                Everything you need is right here. Package-manager tabs stay in sync
                across all steps — pick yours once.
              </p>

              <div className="space-y-10">
                <StepShell n={1} title="Create a project">
                  <p>
                    Start from a fresh Next.js app (Vite, Astro and Remix work too —
                    anything the shadcn CLI supports).
                  </p>
                  <PackageManagerTabs
                    commands={CREATE_APP}
                    manager={manager}
                    onManagerChange={setManager}
                  />
                </StepShell>

                <StepShell n={2} title="Run the shadcn init">
                  <p>
                    Sets up <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">components.json</code>,
                    CSS variables and path aliases.
                  </p>
                  <PackageManagerTabs
                    commands={INIT_SHADCN}
                    manager={manager}
                    onManagerChange={setManager}
                  />
                </StepShell>

                <StepShell n={3} title="Add the Gray registry">
                  <p>
                    Register Gray UI under the{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">@gray</code>{' '}
                    alias by merging this into your{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">components.json</code>:
                  </p>
                  <CodeBlock
                    code={registrySnippet(origin)}
                    filename="components.json"
                    aria-label="Registry configuration snippet"
                  />
                </StepShell>

                <StepShell n={4} title="Add components">
                  <p>
                    Install any component by its alias — dependencies are resolved
                    automatically:
                  </p>
                  <PackageManagerTabs
                    commands={namespaceCommands('button', origin)}
                    manager={manager}
                    onManagerChange={setManager}
                  />
                  <p>Prefer no alias? Install straight from the registry URL:</p>
                  <CodeBlock
                    code={registryCommands('button', origin).npm}
                    prompt
                    aria-label="Direct URL install command"
                  />
                  <p className="pt-1">Use it — the source is yours now:</p>
                  <CodeBlock code={USAGE_CODE} filename="app/page.tsx" />
                  <div className="flex items-center gap-3 rounded-xl border p-4">
                    <Button>Ship it</Button>
                    <span className="text-sm text-muted-foreground">
                      Live preview — that&apos;s the real component you just installed.
                    </span>
                  </div>
                </StepShell>
              </div>
            </Section>

            {/* ------------------------------------------ Registry */}
            <Section id="registry" title="The Registry" kicker="Getting Started">
              <p className="text-base leading-relaxed text-muted-foreground">
                Gray UI is served at{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">
                  {origin}/r
                </code>{' '}
                as standard registry items — one JSON manifest per component
                with the full source, dependencies and file targets. The CLI resolves
                transitive dependencies (a{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">sidebar</code>{' '}
                pulls its own ui + hooks) and respects your path aliases.
              </p>
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <caption className="sr-only">
                    Popular components and their direct registry URLs
                  </caption>
                  <thead>
                    <tr className="border-b bg-muted/50 text-left">
                      <th scope="col" className="px-4 py-2.5 font-medium">Component</th>
                      <th scope="col" className="px-4 py-2.5 font-medium">Install from URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {POPULAR.map(({ slug, note }) => (
                      <tr key={slug} className="border-b last:border-0">
                        <td className="px-4 py-2.5 font-medium">
                          {slug}
                          {note ? (
                            <Badge
                              variant="outline"
                              className="ml-2 rounded-full px-1.5 py-0 text-[10px] font-normal text-muted-foreground"
                            >
                              {note}
                            </Badge>
                          ) : null}
                        </td>
                        <td className="px-4 py-2.5">
                          <code className="block truncate font-mono text-xs text-muted-foreground" title={registryItemUrl(slug, origin)}>
                            {registryItemUrl(slug, origin)}
                          </code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground">
                No components.json alias needed for URL installs. Browse every one of
                the {COMPONENT_COUNT} items with copy-ready commands on the{' '}
                <Link href="/components" className="font-medium text-foreground underline underline-offset-4 hover:no-underline">
                  components page
                </Link>
                .
              </p>
            </Section>

            {/* ------------------------------------------ AI Components */}
            <Section id="ai" title="AI Components" kicker="Getting Started">
              <p className="text-base leading-relaxed text-muted-foreground">
                Gray UI ships a <span className="font-medium text-foreground">full suite of AI chat and agent components</span>{' '}
                — conversation, reasoning, chain-of-thought, shimmer, prompt-input, task, tool,
                web-preview, persona and more — served from the Gray registry under the{' '}<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">@gray</code>{' '}alias.
              </p>
              <PackageManagerTabs
                commands={namespaceCommands(
                  'shimmer chain-of-thought conversation message prompt-input reasoning task tool',
                  origin,
                )}
                manager={manager}
                onManagerChange={setManager}
              />
              <p className="text-sm text-muted-foreground">
                Or grab one at a time — every element installs the same way:
              </p>
              <div className="divide-y rounded-xl border px-4">
                <CmdRow cmd="npx shadcn@latest add @gray/shimmer" note="Animated loading text" />
                <CmdRow cmd="npx shadcn@latest add @gray/chain-of-thought" note="Step-by-step reasoning timeline" />
                <CmdRow cmd="npx shadcn@latest add @gray/conversation @gray/message" note="Chat container + message bubbles" />
                <CmdRow cmd="npx shadcn@latest add @gray/prompt-input" note="Full composer with attachments and tools" />
                <CmdRow cmd={`npx shadcn@latest add "${registryItemUrl('shimmer', origin)}"`} note="Install straight from the registry URL" />
              </div>
              <div className="flex items-start gap-2.5 rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <p>
                  <span className="font-medium text-foreground">Heads up:</span> The AI components pull
                  their own npm deps (<code className="font-mono text-[13px] text-foreground">ai</code>,{' '}
                  <code className="font-mono text-[13px] text-foreground">streamdown</code>,{' '}
                  <code className="font-mono text-[13px] text-foreground">motion</code>,{' '}
                  <code className="font-mono text-[13px] text-foreground">shiki</code>,{' '}
                  <code className="font-mono text-[13px] text-foreground">@xyflow/react</code>…), installed
                  automatically by the CLI. Markdown rendering uses Streamdown; the{' '}
                  <code className="font-mono text-[13px] text-foreground">canvas</code> family needs{' '}
                  <code className="font-mono text-[13px] text-foreground">import "@xyflow/react/dist/style.css"</code>.
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                All live previews are in the{' '}
                <Link href="/components/shimmer" className="font-medium text-foreground underline underline-offset-4 hover:no-underline">
                  AI category
                </Link>{' '}on the components page.
              </p>
            </Section>

            {/* ------------------------------------------ CLI */}
            <Section id="cli" title="CLI Reference" kicker="Reference">
              <p className="text-base leading-relaxed text-muted-foreground">
                Gray UI rides the shadcn CLI — no custom tooling to install.
              </p>
              <div className="divide-y rounded-xl border px-4">
                <CmdRow cmd="npx shadcn@latest init" note="Initialize the project setup" />
                <CmdRow cmd="npx shadcn@latest add @gray/button" note="Install by registry alias" />
                <CmdRow
                  cmd={`npx shadcn@latest add "${registryItemUrl('button', origin)}"`}
                  note="Install straight from the registry URL"
                />
                <CmdRow cmd="npx shadcn@latest add @gray/button @gray/dialog" note="Install several at once" />
                <CmdRow cmd="--overwrite" note="Overwrite files that already exist" />
                <CmdRow cmd="--yes" note="Skip the confirmation prompt (CI-friendly)" />
              </div>
              <div className="flex items-start gap-2.5 rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground">
                <Wrench className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <p>
                  <span className="font-medium text-foreground">pnpm / yarn / bun?</span>{' '}
                  Swap the runner: <code className="font-mono text-[13px] text-foreground">pnpm dlx</code>,{' '}
                  <code className="font-mono text-[13px] text-foreground">yarn dlx</code> or{' '}
                  <code className="font-mono text-[13px] text-foreground">bunx --bun</code>.
                </p>
              </div>
            </Section>

            {/* ------------------------------------------ Theming */}
            <Section id="theming" title="Theming" kicker="Reference">
              <p className="text-base leading-relaxed text-muted-foreground">
                Gray UI ships a pure monochrome zinc palette — every token is
                chroma-free oklch, in light and dark. Dark mode is class-based via{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">next-themes</code>;
                charts ride a gray-scale ramp so data never screams.
              </p>
              <CodeBlock code={THEME_CODE} filename="app/globals.css" />
              <p className="text-sm text-muted-foreground">
                Every token is a CSS variable — restyle the whole system by editing{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">globals.css</code>,
                no rebuild required.
              </p>
            </Section>

            {/* ------------------------------------------ Next step CTA */}
            <section
              aria-label="Next step"
              className="rounded-2xl border bg-muted/40 p-6 sm:p-8"
            >
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="flex items-center gap-2 font-semibold">
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    Ready to build?
                  </p>
                  <p className="mt-1 max-w-md text-sm text-muted-foreground">
                    All {COMPONENT_COUNT} components with live previews, usage code and
                    one-line install commands — including the full AI suite.
                  </p>
                </div>
                <Button asChild>
                  <Link href="/components">
                    Browse components
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </section>
          </div>
        </main>
      </div>

      <SiteFooter />
    </div>
  )
}

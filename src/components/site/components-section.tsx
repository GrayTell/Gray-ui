'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Copy, Sparkles } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { COMPONENT_COUNT, ORIGINAL_COUNT } from '@/lib/component-registry'
import { registryCommands, useRegistryOrigin } from '@/lib/install-command'
import { ClaimableBalance } from '@/registry/items/claimable-balance'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/site/code-block'

import { ButtonDemo, SwitchDemo } from './demos/controls'
import { AccordionDemo } from './demos/display'
import { ChartDemo } from './demos/data'
import { ComboboxDemo, DatePickerDemo } from './demos/inputs'
import { CommandDemo, DialogDemo } from './demos/overlays'
import { TabsDemo } from './demos/display'

interface DemoEntry {
  name: string
  slug: string
  category: string
  Component: React.ComponentType
}

/** Claimable Balance centered for the featured-grid cell. */
function ClaimableBalanceDemo() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-xs">
        <ClaimableBalance />
      </div>
    </div>
  )
}

/** A curated taste of the library — the full catalog lives at /components. */
const FEATURED: DemoEntry[] = [
  { name: 'Button', slug: 'button', category: 'Controls', Component: ButtonDemo },
  { name: 'Dialog', slug: 'dialog', category: 'Overlays', Component: DialogDemo },
  { name: 'Tabs', slug: 'tabs', category: 'Navigation', Component: TabsDemo },
  { name: 'Date Picker', slug: 'date-picker', category: 'Inputs', Component: DatePickerDemo },
  { name: 'Switch', slug: 'switch', category: 'Controls', Component: SwitchDemo },
  { name: 'Combobox', slug: 'combobox', category: 'Inputs', Component: ComboboxDemo },
  { name: 'Chart', slug: 'chart', category: 'Data', Component: ChartDemo },
  { name: 'Accordion', slug: 'accordion', category: 'Display', Component: AccordionDemo },
  { name: 'Command', slug: 'command', category: 'Overlays', Component: CommandDemo },
  {
    name: 'Claimable Balance',
    slug: 'claimable-balance',
    category: 'Originals',
    Component: ClaimableBalanceDemo,
  },
]

export function ComponentsSection() {
  const { toast } = useToast()
  const origin = useRegistryOrigin()
  const [copiedName, setCopiedName] = React.useState<string | null>(null)
  const copyTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current)
    },
    []
  )

  const copyCli = React.useCallback(
    (slug: string) => {
      const command = registryCommands(slug, origin).npm
      navigator.clipboard?.writeText(command).catch(() => {})
      setCopiedName(slug)
      if (copyTimeout.current) clearTimeout(copyTimeout.current)
      copyTimeout.current = setTimeout(() => setCopiedName(null), 1600)
      toast({
        title: 'Install command copied',
        description: command,
      })
    },
    [toast, origin]
  )

  return (
    <section
      id="components"
      className="scroll-mt-14 border-t border-border/60 px-4 py-20 sm:py-28"
      aria-labelledby="components-heading"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground">The Library</p>
          <h2
            id="components-heading"
            className="mt-2 text-balance text-3xl font-bold tracking-tighter sm:text-4xl"
          >
            Components
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-muted-foreground">
            A working taste of the library — click, type, drag and toggle; every single one is
            live. Found a keeper? Copy one command and the source lands in your repo.
          </p>
        </motion.div>

        {/* CLI strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mx-auto mt-8 max-w-2xl"
        >
          <CodeBlock
            code="npx shadcn@latest add @gray/button @gray/dialog @gray/date-picker @gray/chart"
            prompt
            aria-label="Component install command"
          />
        </motion.div>

        {/* Featured demo grid */}
        <div className="mt-10 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((demo, i) => (
            <motion.div
              key={demo.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: Math.min(i % 6, 3) * 0.05 }}
              className="overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2 border-b border-border/70 px-4 py-2.5">
                <Link
                  href={`/components#${demo.slug}`}
                  className="group flex min-w-0 items-center gap-2"
                  aria-label={`Open ${demo.name} in the full component library`}
                >
                  <h3 className="truncate text-sm font-medium">{demo.name}</h3>
                  {demo.category === 'Originals' ? (
                    <Badge
                      variant="outline"
                      className="hidden gap-1 rounded-full px-2 py-0 text-[10px] font-medium text-foreground sm:inline-flex"
                    >
                      <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                      Original
                    </Badge>
                  ) : (
                    <span className="hidden rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">
                      {demo.category}
                    </span>
                  )}
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => copyCli(demo.slug)}
                  aria-label={`Copy install command for ${demo.name}`}
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {copiedName === demo.slug ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                </button>
              </div>
              <div className="flex min-h-[11.5rem] items-center justify-center p-5 [background-image:radial-gradient(color-mix(in_oklab,var(--border)_70%,transparent)_1px,transparent_1px)] [background-size:14px_14px]">
                <demo.Component />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Browse-all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-border bg-muted/40 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div>
            <p className="text-lg font-semibold tracking-tight">
              All {COMPONENT_COUNT} components — {ORIGINAL_COUNT} Gray originals
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              The full catalog lives at{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">
                /components
              </code>{' '}
              — preview and install everything from there.
            </p>
          </div>
          <Button
            asChild
            className={cn('h-10 shrink-0 gap-2 rounded-full px-5 text-sm font-medium')}
          >
            <Link href="/components">
              Browse all components
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

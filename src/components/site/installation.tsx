'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Blocks, FolderPlus, Sparkles, Stamp, type LucideIcon } from 'lucide-react'

import { CodeBlock } from '@/components/site/code-block'
import {
  PackageManagerTabs,
  type PackageManager,
} from '@/components/site/package-manager-tabs'
import { Button } from '@/components/ui/button'
import {
  namespaceCommands,
  registryItemUrl,
  registrySnippet,
  useRegistryOrigin,
} from '@/lib/install-command'

const MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const
type Manager = (typeof MANAGERS)[number]

const CREATE_COMMANDS: Record<Manager, string> = {
  npm: 'npm create next-app@latest my-app',
  pnpm: 'pnpm create next-app@latest my-app',
  yarn: 'yarn create next-app@latest my-app',
  bun: 'bun create next-app@latest my-app',
}

const INIT_COMMANDS: Record<Manager, string> = {
  npm: 'npx shadcn@latest init',
  pnpm: 'pnpm dlx shadcn@latest init',
  yarn: 'yarn dlx shadcn@latest init',
  bun: 'bunx --bun shadcn@latest init',
}

const USAGE_CODE = `import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <Button variant="outline">Click me</Button>
  )
}`

function StepShell({
  index,
  icon: Icon,
  title,
  description,
  children,
}: {
  index: number
  icon: LucideIcon
  title: string
  description: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="grid gap-4"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold">
          {index}
        </div>
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            {title}
          </h3>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <div className="pl-0 sm:pl-10">{children}</div>
    </motion.div>
  )
}

export function Installation() {
  const [manager, setManager] = React.useState<Manager>('npm')
  const origin = useRegistryOrigin()

  return (
    <section
      id="installation"
      className="scroll-mt-14 border-t border-border/60 px-4 py-20 sm:py-28"
      aria-labelledby="installation-heading"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground">The CLI</p>
          <h2
            id="installation-heading"
            className="mt-2 text-balance text-3xl font-bold tracking-tighter sm:text-4xl"
          >
            Installation
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-muted-foreground">
            Get Gray UI running in minutes. Build your design system with components you own,
            using the package manager you already love.
          </p>
        </motion.div>

        <div className="mt-12 space-y-10">
          {/* Step 1: create a project */}
          <StepShell
            index={1}
            icon={FolderPlus}
            title="Create a project"
            description="Any Vite, Next.js, or Remix app works — start from scratch, or use the app you already have."
          >
            <PackageManagerTabs
              commands={CREATE_COMMANDS}
              manager={manager}
              onManagerChange={setManager}
            />
          </StepShell>

          {/* Step 2: init shadcn/ui */}
          <StepShell
            index={2}
            icon={Sparkles}
            title="Init shadcn/ui"
            description="The CLI walks you through picking a style and base color, then sets up components.json, CSS variables and the cn() utility."
          >
            <PackageManagerTabs
              commands={INIT_COMMANDS}
              manager={manager}
              onManagerChange={setManager}
            />
          </StepShell>

          {/* Step 3: add the Gray registry */}
          <StepShell
            index={3}
            icon={Blocks}
            title="Add the Gray registry"
            description="One-time setup: point shadcn at the Gray registry."
          >
            <CodeBlock
              code={registrySnippet(origin)}
              filename="components.json"
              aria-label="Gray registry configuration snippet"
            />
          </StepShell>

          {/* Step 4: add components */}
          <StepShell
            index={4}
            icon={Stamp}
            title="Add components"
            description={
              <>
                Pull any component straight into your codebase — source you own, no package to
                install, no dependency to lock in. Or install straight from the registry URL:{' '}
                <code className="whitespace-nowrap rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">
                  npx shadcn@latest add {registryItemUrl('button', origin)}
                </code>
              </>
            }
          >
            <PackageManagerTabs
              commands={namespaceCommands('button', origin)}
              manager={manager}
              onManagerChange={setManager}
            />
            <div className="mt-4 grid gap-3">
              <CodeBlock code={USAGE_CODE} filename="app/page.tsx" aria-label="Usage example" />
              <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
                <Button variant="outline">Click me</Button>
                <Button>Deploy</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <p className="ml-auto hidden text-xs text-muted-foreground sm:block">
                  ↑ rendered with the real components
                </p>
              </div>
            </div>
          </StepShell>

          {/* Jump to the full library */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pt-2 text-center"
          >
            <Link
              href="/components"
              className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              Browse the full component library →
            </Link>
          </motion.p>
        </div>
      </div>
    </section>
  )
}

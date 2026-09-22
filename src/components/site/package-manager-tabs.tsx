'use client'

import * as React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '@/components/site/code-block'
import { registryCommands } from '@/lib/install-command'

export const MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const
export type PackageManager = (typeof MANAGERS)[number]

/**
 * Build the add-component command for every package manager.
 * Delegates to the shared registry helper so the commands always match the
 * CLI-compatible registry URLs served at `/r/<slug>.json`.
 */
export function installCommands(
  slug: string,
  origin?: string,
): Record<PackageManager, string> {
  return registryCommands(slug, origin)
}

interface PackageManagerTabsProps {
  commands: Record<PackageManager, string>
  manager: PackageManager
  onManagerChange: (m: PackageManager) => void
  className?: string
}

export function PackageManagerTabs({
  commands,
  manager,
  onManagerChange,
  className,
}: PackageManagerTabsProps) {
  return (
    <Tabs
      value={manager}
      onValueChange={(v) => onManagerChange(v as PackageManager)}
      className={className ?? 'w-full'}
    >
      <TabsList
        aria-label="Choose a package manager"
        className="mb-2 h-8 w-fit rounded-lg bg-muted p-0.5"
      >
        {MANAGERS.map((m) => (
          <TabsTrigger
            key={m}
            value={m}
            className="h-7 rounded-md px-3 text-xs font-medium capitalize data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            {m}
          </TabsTrigger>
        ))}
      </TabsList>
      {MANAGERS.map((m) => (
        <TabsContent key={m} value={m} className="mt-0">
          <CodeBlock code={commands[m]} prompt={false} aria-label={`${m} command`} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

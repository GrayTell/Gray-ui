'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'

import { namespaceCommands, registryCommands, registrySnippet, DEFAULT_REGISTRY_ORIGIN } from '@/lib/install-command'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  PackageManagerTabs,
  type PackageManager,
} from '@/components/site/package-manager-tabs'
import { CodeBlock } from '@/components/site/code-block'

/**
 * Installation section for component detail pages: package-manager
 * command tabs plus the optional @gray alias setup.
 */
export function ComponentInstall({
  slug,
  name,
}: {
  slug: string
  name: string
}) {
  // Always the production domain — install commands read identically in dev and prod.
  const origin = DEFAULT_REGISTRY_ORIGIN
  const [manager, setManager] = React.useState<PackageManager>('npm')

  return (
    <>
      <PackageManagerTabs
        commands={registryCommands(slug, origin)}
        manager={manager}
        onManagerChange={setManager}
      />
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
            code={namespaceCommands(slug, origin)[manager]}
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
      <p className="mt-4 text-sm text-muted-foreground">
        Run the command and the source for{' '}
        <span className="font-medium text-foreground">{name}</span> lands in
        your project — no package, no lock-in.
      </p>
    </>
  )
}

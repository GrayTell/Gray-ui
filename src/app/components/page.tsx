import type { Metadata } from 'next'
import Link from 'next/link'

import { COMPONENTS, NEW_COMPONENTS } from '@/lib/component-registry'
import { NewDot } from '@/components/site/components-docs'

export const metadata: Metadata = {
  title: 'Components',
  description:
    'Browse the full Gray UI catalog — primitives, dashboard cards and AI chat elements, all live-previewable and installable in one command. New components ship regularly.',
}

function ComponentGrid({
  items,
}: {
  items: typeof COMPONENTS
}) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
      {items.map((component) => {
        const isNew = NEW_COMPONENTS.includes(component.slug)
        return (
          <Link
            key={component.slug}
            href={`/components/${component.slug}`}
            className="inline-flex items-center gap-2 text-lg font-medium underline-offset-4 hover:underline md:text-base"
          >
            {component.name}
            {isNew && (
              <>
                <span className="sr-only">New</span>
                <NewDot />
              </>
            )}
          </Link>
        )
      })}
    </div>
  )
}

export default function ComponentsPage() {
  const newComponents = COMPONENTS.filter((c) =>
    NEW_COMPONENTS.includes(c.slug)
  )
  const allComponents = COMPONENTS.filter(
    (c) => !NEW_COMPONENTS.includes(c.slug)
  )

  return (
    <div className="flex scroll-mt-24 items-stretch pb-8 text-[1.05rem] sm:text-[15px] xl:w-full">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-(--top-spacing) shrink-0" />
        <div className="mx-auto flex w-full max-w-160 min-w-0 flex-1 flex-col gap-6 px-4 py-6 text-foreground md:px-0 lg:py-8 dark:text-foreground">
          <div className="flex flex-col gap-2">
            <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight sm:text-3xl">
              Components
            </h1>
            <p className="text-[1.05rem] text-muted-foreground sm:text-base sm:text-balance md:max-w-[80%]">
              Every building block in the Gray UI catalog — primitives, cards
              and AI chat elements. Each one is live here and ready to drop
              into your project, and the collection keeps growing.
            </p>
          </div>
          <div className="w-full flex-1 pb-16 sm:pb-0">
            {newComponents.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold tracking-tight">
                  New Components
                </h2>
                <ComponentGrid items={newComponents} />
              </>
            )}
            <h2 className="mt-12 text-2xl font-semibold tracking-tight first:mt-0">
              All Components
            </h2>
            <ComponentGrid items={allComponents} />
            <p className="mt-16 text-sm text-muted-foreground">
              Looking for something specific? The{' '}
              <Link
                href="/docs"
                className="font-medium underline underline-offset-4"
              >
                docs
              </Link>{' '}
              walk through the registry end to end — or install straight from
              a URL with{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">
                npx shadcn@latest add &lt;url&gt;
              </code>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

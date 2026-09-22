'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/site/code-block'

/**
 * Component preview: a rounded-2xl bordered
 * card with the live demo on top and the usage code below. On small
 * screens the code collapses behind a "View Code" button.
 */
export function ComponentPreview({
  name,
  slug,
  code,
  children,
}: {
  name: string
  slug: string
  code: string
  children: React.ReactNode
}) {
  const [showCode, setShowCode] = React.useState(false)

  return (
    <div className="relative mt-4 mb-12 flex flex-col overflow-hidden rounded-2xl border">
      <div className="relative flex h-72 w-full items-center justify-center p-10 max-sm:h-64 max-sm:p-4">
        {children}
      </div>
      <div
        className={cn(
          'relative overflow-hidden border-t bg-zinc-950',
          !showCode && 'max-sm:max-h-16'
        )}
      >
        <CodeBlock
          code={code}
          filename={`${slug}.tsx`}
          className="rounded-none border-0 [&_pre]:m-0 [&_pre]:max-h-72 [&_pre]:overflow-auto"
          aria-label={`${name} usage example`}
        />
        {!showCode && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pb-3 sm:hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, transparent, rgba(9, 9, 11, 0.85) 70%, #09090b)',
              }}
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="relative z-10 rounded-lg bg-background text-foreground shadow-none hover:bg-muted dark:bg-background dark:text-foreground dark:hover:bg-muted"
              onClick={() => setShowCode(true)}
            >
              View Code
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

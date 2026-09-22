'use client'

import * as React from 'react'
import { SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CommandMenu } from '@/components/site/command-menu'

/**
 * Header search trigger: outline button with ⌘K hint
 * that opens the command menu. Self-contained client island.
 */
export function SearchTrigger() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        aria-label="Open search (Ctrl+K)"
        className="text-muted-foreground h-8 w-full max-w-64 justify-start gap-2 rounded-lg px-3 font-normal shadow-none md:w-40 lg:w-56"
      >
        <SearchIcon className="size-4 shrink-0" aria-hidden="true" />
        <span className="hidden truncate lg:inline">Search documentation...</span>
        <span className="truncate lg:hidden">Search...</span>
        <kbd className="bg-muted text-muted-foreground pointer-events-none ml-auto inline-flex h-5 shrink-0 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium">
          ⌘K
        </kbd>
      </Button>
      <CommandMenu open={open} onOpenChange={setOpen} />
    </>
  )
}

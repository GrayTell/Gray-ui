'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  ArrowDown,
  ArrowUp,
  Check,
  Component,
  Github,
  Layers,
  MessageCircle,
  Monitor,
  Moon,
  Rocket,
  Sparkles,
  Sun,
  Wrench,
} from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { useAnchorNav } from '@/components/site/use-anchor-nav'
import { namespaceCommands } from '@/lib/install-command'

const COPY_COMMANDS = {
  init: 'npx shadcn@latest init',
  addButton: namespaceCommands('button').npm,
}

const COMPONENT_ITEMS: [string, string][] = [
  ['Button', 'button'],
  ['Dialog', 'dialog'],
  ['Date Picker', 'date-picker'],
  ['Chart', 'chart'],
  ['Table', 'table'],
  ['Combobox', 'combobox'],
  ['Claimable Balance', 'claimable-balance'],
]

interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const { setTheme } = useTheme()
  const router = useRouter()
  const anchorNav = useAnchorNav()
  const [copied, setCopied] = React.useState<string | null>(null)

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  const runAndClose = (fn: () => void) => {
    onOpenChange(false)
    // Defer so the dialog unmounts before the DOM action runs
    setTimeout(fn, 60)
  }

  /** Scroll on the homepage, or navigate home first from another page. */
  const goAnchor = (id: string) => runAndClose(() => anchorNav(id))

  /** Deep-link into the /components explorer. */
  const goComponent = (slug: string) =>
    runAndClose(() => router.push(`/components#${slug}`))

  /** Deep-link into the docs. */
  const goDocs = (anchor?: string) =>
    runAndClose(() => router.push(anchor ? `/docs#${anchor}` : '/docs'))

  const copy = (key: keyof typeof COPY_COMMANDS) => {
    navigator.clipboard?.writeText(COPY_COMMANDS[key]).catch(() => {})
    setCopied(key)
    setTimeout(() => {
      setCopied(null)
      onOpenChange(false)
    }, 700)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} aria-label="Command menu">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => goComponent('button')}>
            <Component aria-hidden="true" />
            <span>Component library</span>
          </CommandItem>
          <CommandItem onSelect={() => goDocs('installation')}>
            <Rocket aria-hidden="true" />
            <span>Installation</span>
          </CommandItem>
          <CommandItem onSelect={() => goAnchor('features')}>
            <Layers aria-hidden="true" />
            <span>Features</span>
          </CommandItem>
          <CommandItem onSelect={() => goAnchor('main')}>
            <ArrowUp aria-hidden="true" />
            <span>Back to top</span>
          </CommandItem>
          <CommandItem onSelect={() => goAnchor('chat-demo')}>
            <MessageCircle aria-hidden="true" />
            <span>Ask Gray AI</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Popular components">
          {COMPONENT_ITEMS.map(([label, slug]) => (
            <CommandItem key={slug} onSelect={() => goComponent(slug)}>
              <Component aria-hidden="true" />
              <span>{label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => copy('init')}>
            {copied === 'init' ? (
              <Check className="text-emerald-500" aria-hidden="true" />
            ) : (
              <Wrench aria-hidden="true" />
            )}
            <span>Copy init command</span>
            <span className="ml-auto text-xs text-muted-foreground">shadcn init</span>
          </CommandItem>
          <CommandItem onSelect={() => copy('addButton')}>
            {copied === 'addButton' ? (
              <Check className="text-emerald-500" aria-hidden="true" />
            ) : (
              <Sparkles aria-hidden="true" />
            )}
            <span>Copy add component command</span>
            <span className="ml-auto text-xs text-muted-foreground">@gray/button</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runAndClose(() =>
                window.open('https://github.com/letsvan', '_blank', 'noopener')
              )
            }
          >
            <Github aria-hidden="true" />
            <span>Open GitHub</span>
            <ArrowDown className="ml-auto rotate-[-45deg] text-muted-foreground" aria-hidden="true" />
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => runAndClose(() => setTheme('light'))}>
            <Sun aria-hidden="true" />
            <span>Light</span>
          </CommandItem>
          <CommandItem onSelect={() => runAndClose(() => setTheme('dark'))}>
            <Moon aria-hidden="true" />
            <span>Dark</span>
          </CommandItem>
          <CommandItem onSelect={() => runAndClose(() => setTheme('system'))}>
            <Monitor aria-hidden="true" />
            <span>System</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

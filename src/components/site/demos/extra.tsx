'use client'

import * as React from 'react'
import {
  Bold,
  Calendar,
  Copy,
  Check,
  FolderSearch,
  Home,
  Inbox,
  Italic,
  Plus,
  Search,
  Settings,
  Underline,
} from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Spinner } from '@/components/ui/spinner'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { ButtonGroup, ButtonGroupText } from '@/components/ui/button-group'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'

/* ------------------------------------------------------------------ */
/* Label                                                               */
/* ------------------------------------------------------------------ */

export function LabelDemo() {
  return (
    <div className="w-full max-w-xs space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="label-demo-name">Project name</Label>
        <Input id="label-demo-name" placeholder="Acme Inc" />
      </div>
      <div className="flex items-center gap-2">
        <Switch id="label-demo-public" defaultChecked />
        <Label htmlFor="label-demo-public">Public repository</Label>
      </div>
      <div className="grid gap-2">
        <Label disabled htmlFor="label-demo-key">
          Legacy API key
        </Label>
        <Input id="label-demo-key" disabled placeholder="Deprecated" />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Toggle Group                                                        */
/* ------------------------------------------------------------------ */

export function ToggleGroupDemo() {
  const [format, setFormat] = React.useState<string[]>(['bold'])

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-4">
      <ToggleGroup type="multiple" variant="outline" value={format} onValueChange={setFormat}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold aria-hidden="true" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic aria-hidden="true" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline aria-hidden="true" />
        </ToggleGroupItem>
      </ToggleGroup>
      <p
        aria-live="polite"
        className={cn(
          'text-center text-sm text-muted-foreground',
          format.includes('bold') && 'font-bold text-foreground',
          format.includes('italic') && 'italic',
          format.includes('underline') && 'underline'
        )}
      >
        The quick brown fox
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Kbd                                                                 */
/* ------------------------------------------------------------------ */

export function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground">
      <p>
        Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command menu
      </p>
      <KbdGroup>
        <Kbd aria-label="Arrow up">↑</Kbd>
        <Kbd aria-label="Arrow down">↓</Kbd>
        <Kbd aria-label="Enter">
          Enter
        </Kbd>
      </KbdGroup>
      <p className="text-xs">Keyboard shortcuts, first-class.</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Spinner                                                             */
/* ------------------------------------------------------------------ */

export function SpinnerDemo() {
  const [state, setState] = React.useState<'idle' | 'deploying' | 'done'>('idle')

  React.useEffect(() => {
    if (state !== 'deploying') return
    const t = setTimeout(() => setState('done'), 2200)
    return () => clearTimeout(t)
  }, [state])

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
        {state === 'deploying' && <Spinner aria-hidden="true" />}
        {state === 'done' ? (
          <>
            <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />
            <span>Deployed to production</span>
          </>
        ) : state === 'deploying' ? (
          <span>Deploying to production…</span>
        ) : (
          <span>Ready when you are</span>
        )}
      </div>
      <Button
        size="sm"
        variant="outline"
        disabled={state === 'deploying'}
        onClick={() => setState('deploying')}
      >
        {state === 'deploying' && <Spinner aria-hidden="true" />}
        {state === 'deploying' ? 'Deploying' : 'Run deploy'}
      </Button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Empty                                                               */
/* ------------------------------------------------------------------ */

export function EmptyDemo() {
  return (
    <Empty className="w-full max-w-sm rounded-xl border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderSearch aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>No projects found</EmptyTitle>
        <EmptyDescription>
          Nothing matches your filters. Try a different search or start something new.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button size="sm">
            <Plus aria-hidden="true" />
            Create project
          </Button>
          <Button variant="outline" size="sm">
            Clear filter
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}

/* ------------------------------------------------------------------ */
/* Item                                                                */
/* ------------------------------------------------------------------ */

export function ItemDemo() {
  const [features, setFeatures] = React.useState({ analytics: true, sso: false, backups: true })

  const toggle = (key: keyof typeof features) =>
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }))

  const rows = [
    {
      key: 'analytics' as const,
      icon: Search,
      title: 'Usage analytics',
      description: 'Weekly reports straight to your inbox.',
    },
    {
      key: 'sso' as const,
      icon: Settings,
      title: 'Single sign-on',
      description: 'SAML and OIDC for your whole team.',
    },
    {
      key: 'backups' as const,
      icon: Copy,
      title: 'Daily backups',
      description: 'Point-in-time recovery, 30-day retention.',
    },
  ]

  return (
    <ItemGroup className="w-full max-w-sm">
      {rows.map((row) => (
        <Item key={row.key} variant="outline">
          <ItemMedia variant="icon">
            <row.icon aria-hidden="true" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{row.title}</ItemTitle>
            <ItemDescription>{row.description}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Switch
              checked={features[row.key]}
              onCheckedChange={() => toggle(row.key)}
              aria-label={`Toggle ${row.title}`}
            />
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  )
}

/* ------------------------------------------------------------------ */
/* Button Group                                                        */
/* ------------------------------------------------------------------ */

export function ButtonGroupDemo() {
  const [view, setView] = React.useState('Week')
  const [copied, setCopied] = React.useState(false)
  const copyTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current)
    },
    []
  )

  const copy = () => {
    navigator.clipboard?.writeText('https://gray-ui.vercel.app/docs').catch(() => {})
    setCopied(true)
    if (copyTimeout.current) clearTimeout(copyTimeout.current)
    copyTimeout.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <ButtonGroup aria-label="Select reporting view">
        {['Day', 'Week', 'Month'].map((v) => (
          <Button
            key={v}
            size="sm"
            variant={view === v ? 'default' : 'outline'}
            onClick={() => setView(v)}
            aria-pressed={view === v}
          >
            {v}
          </Button>
        ))}
      </ButtonGroup>
      <ButtonGroup aria-label="Copy docs link">
        <ButtonGroupText className="bg-muted/50 font-normal text-muted-foreground">
          gray-ui.vercel.app/docs
        </ButtonGroupText>
        <Button size="sm" variant="outline" onClick={copy} aria-label="Copy link">
          {copied ? (
            <Check className="text-emerald-500" aria-hidden="true" />
          ) : (
            <Copy aria-hidden="true" />
          )}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </ButtonGroup>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Field                                                               */
/* ------------------------------------------------------------------ */

export function FieldDemo() {
  const [email, setEmail] = React.useState('')
  const invalid = email.length > 0 && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)

  return (
    <Field className="w-full max-w-sm" invalid={invalid}>
      <FieldLabel htmlFor="field-demo-email">Work email</FieldLabel>
      <Input
        id="field-demo-email"
        type="email"
        placeholder="ada@graytell.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={invalid || undefined}
      />
      <FieldDescription>{invalid ? 'That address looks off.' : 'Used for receipts and product updates only.'}</FieldDescription>
      {invalid && <FieldError>Enter a valid email address.</FieldError>}
    </Field>
  )
}

/* ------------------------------------------------------------------ */
/* Sonner                                                              */
/* ------------------------------------------------------------------ */

export function SonnerDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-3">
      <Button
        size="sm"
        onClick={() =>
          toast.success('Event scheduled', {
            description: 'Friday, 2:00 PM — added to your calendar.',
          })
        }
      >
        <Calendar aria-hidden="true" />
        Success toast
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          toast('File archived', {
            description: 'archive-2025.zip moved to cold storage.',
            action: { label: 'Undo', onClick: () => toast('Restored to Files') },
          })
        }
      >
        Toast with action
      </Button>
      <Toaster position="bottom-right" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Sidebar                                                             */
/* ------------------------------------------------------------------ */

const SIDEBAR_ITEMS = [
  { name: 'Home', icon: Home },
  { name: 'Inbox', icon: Inbox },
  { name: 'Calendar', icon: Calendar },
  { name: 'Search', icon: Search },
  { name: 'Settings', icon: Settings },
]

export function SidebarDemo() {
  const [active, setActive] = React.useState('Inbox')

  return (
    <SidebarProvider className="h-72 min-h-0 w-full max-w-md overflow-hidden rounded-xl border bg-background shadow-sm">
      <Sidebar collapsible="none" className="h-full">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" className="pointer-events-none">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-foreground text-[10px] font-bold text-background">
                  AC
                </div>
                <span className="text-sm font-semibold">Acme Inc</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    isActive={active === item.name}
                    onClick={() => setActive(item.name)}
                    aria-pressed={active === item.name}
                  >
                    <item.icon aria-hidden="true" />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="flex flex-1 flex-col items-center justify-center gap-1 p-4 text-center">
        <p className="text-sm font-medium">{active}</p>
        <p className="text-xs text-muted-foreground">
          Click a menu item — fully interactive.
        </p>
      </div>
    </SidebarProvider>
  )
}

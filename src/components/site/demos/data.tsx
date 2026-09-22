'use client'

import * as React from 'react'
import { Bar, BarChart, XAxis } from 'recharts'

import { Progress } from '@/components/ui/progress'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ToastAction } from '@/components/ui/toast'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

/* -------------------------------- Progress -------------------------------- */

export function ProgressDemo() {
  const [value, setValue] = React.useState(12)

  React.useEffect(() => {
    const t = window.setInterval(() => setValue((v) => (v >= 100 ? 8 : v + 4)), 260)
    return () => window.clearInterval(t)
  }, [])

  return (
    <div className="w-full max-w-[280px] space-y-2.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Uploading assets</span>
        <span className="tabular-nums text-muted-foreground">{value}%</span>
      </div>
      <Progress value={value} />
      <p className="text-xs text-muted-foreground">
        {value >= 100 ? 'Done! Restarting the loop…' : 'Sit tight — this runs itself.'}
      </p>
    </div>
  )
}

/* ------------------------------- Pagination ------------------------------- */

export function PaginationDemo() {
  const [page, setPage] = React.useState(2)

  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-disabled={page === 1}
              className={cn(page === 1 && 'pointer-events-none opacity-50')}
              onClick={(e) => {
                e.preventDefault()
                setPage((p) => Math.max(1, p - 1))
              }}
            />
          </PaginationItem>
          {[1, 2, 3, 4].map((n) => (
            <PaginationItem key={n}>
              <PaginationLink
                href="#"
                isActive={page === n}
                onClick={(e) => {
                  e.preventDefault()
                  setPage(n)
                }}
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              aria-disabled={page === 4}
              className={cn(page === 4 && 'pointer-events-none opacity-50')}
              onClick={(e) => {
                e.preventDefault()
                setPage((p) => Math.min(4, p + 1))
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p aria-live="polite" className="text-xs text-muted-foreground">
        Showing page {page} of 4 — 96 components
      </p>
    </div>
  )
}

/* ------------------------------- Breadcrumb ------------------------------- */

const CRUMBS = ['Home', 'Design System', 'Components', 'Button']

export function BreadcrumbDemo() {
  const [index, setIndex] = React.useState(3)

  return (
    <div className="flex flex-col items-center gap-3">
      <Breadcrumb>
        <BreadcrumbList>
          {CRUMBS.map((c, i) => (
            <React.Fragment key={c}>
              <BreadcrumbItem>
                {i === index ? (
                  <BreadcrumbPage>{c}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setIndex(i)
                    }}
                  >
                    {c}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {i < CRUMBS.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <p aria-live="polite" className="text-xs text-muted-foreground">
        You are here: {CRUMBS[index]}
      </p>
    </div>
  )
}

/* ----------------------------- Navigation menu ---------------------------- */

const LEARN = [
  { title: 'Philosophy', desc: 'Why copy-paste beats dependencies.' },
  { title: 'Design tokens', desc: 'One palette, two modes, zero limits.' },
  { title: 'CLI reference', desc: 'init, add, diff — the whole flow.' },
]

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[300px] gap-1 p-2">
              {LEARN.map((item) => (
                <a
                  key={item.title}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="rounded-md p-2 transition-colors hover:bg-accent"
                >
                  <p className="text-sm font-medium leading-none">{item.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                </a>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            onClick={(e) => e.preventDefault()}
            className={navigationMenuTriggerStyle()}
          >
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            onClick={(e) => e.preventDefault()}
            className={navigationMenuTriggerStyle()}
          >
            Changelog
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/* ---------------------------------- Table --------------------------------- */

const INVOICES = [
  { id: 'INV-0041', client: 'Graytell Studio', status: 'Paid', amount: '$2,400' },
  { id: 'INV-0042', client: 'Aurora Labs', status: 'Pending', amount: '$890' },
  { id: 'INV-0043', client: 'Mono Coffee Co.', status: 'Failed', amount: '$120' },
  { id: 'INV-0044', client: 'Northwind', status: 'Paid', amount: '$1,650' },
]

const STATUS_STYLES: Record<string, string> = {
  Paid: 'bg-emerald-600/10 text-emerald-600 dark:text-emerald-400',
  Pending: 'bg-amber-600/10 text-amber-600 dark:text-amber-400',
  Failed: 'bg-destructive/10 text-destructive',
}

export function TableDemo() {
  return (
    <div className="w-full max-w-[320px] overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {INVOICES.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell className="font-medium">{inv.id}</TableCell>
              <TableCell className="text-muted-foreground">{inv.client}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-medium',
                    STATUS_STYLES[inv.status]
                  )}
                >
                  {inv.status}
                </span>
              </TableCell>
              <TableCell className="text-right tabular-nums">{inv.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/* ---------------------------------- Chart --------------------------------- */

const chartData = [
  { day: 'Mon', deploys: 8 },
  { day: 'Tue', deploys: 12 },
  { day: 'Wed', deploys: 5 },
  { day: 'Thu', deploys: 15 },
  { day: 'Fri', deploys: 9 },
  { day: 'Sat', deploys: 3 },
  { day: 'Sun', deploys: 6 },
]

const chartConfig = {
  deploys: { label: 'Deploys', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function ChartDemo() {
  return (
    <div className="w-full max-w-[300px] space-y-1.5">
      <ChartContainer config={chartConfig} className="h-36 w-full">
        <BarChart accessibilityLayer data={chartData}>
          <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={6} fontSize={11} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="deploys" fill="var(--color-deploys)" radius={4} />
        </BarChart>
      </ChartContainer>
      <p className="text-center text-xs text-muted-foreground">
        Deploys this week — hover the bars
      </p>
    </div>
  )
}

/* -------------------------------- Resizable ------------------------------- */

export function ResizableDemo() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-32 w-full max-w-[300px] rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          Inspector
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          Canvas
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

/* ------------------------------- Scroll area ------------------------------ */

const TAGS = [
  'v2.0', 'satoshi', 'cli', 'dark-mode', 'a11y', 'tailwind-v4', 'radix', 'copy-paste',
  'mit-license', 'open-source', 'nextjs16', 'zero-config',
]

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-32 w-full max-w-[260px] rounded-lg border p-3">
      <div className="flex flex-wrap gap-1.5">
        {TAGS.map((t) => (
          <span
            key={t}
            className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
          >
            #{t}
          </span>
        ))}
      </div>
    </ScrollArea>
  )
}

/* ---------------------------------- Toast --------------------------------- */

export function ToastDemo() {
  const { toast } = useToast()

  return (
    <div className="flex max-w-[280px] flex-wrap items-center justify-center gap-2">
      <Button size="sm" onClick={() => toast({ title: 'Deployed!', description: 'aurora-site is live.' })}>
        Success
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => toast({ title: 'Scheduled catch-up', description: 'Tomorrow at 9:00.', variant: 'default' })}
      >
        Outline
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() =>
          toast({ variant: 'destructive', title: 'Deploy failed', description: 'Rollback complete.' })
        }
      >
        Error
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Working…',
            description: 'Undo available for 5s.',
            action: (
              <ToastAction altText="Undo" onClick={() => toast({ title: 'Rolled back.' })}>
                Undo
              </ToastAction>
            ),
          })
        }
      >
        With action
      </Button>
    </div>
  )
}

'use client'

import * as React from 'react'
import { ChevronsUpDown, Rocket, Sparkles, TriangleAlert } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { GrayMark } from '@/components/site/logo'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

/* -------------------------------- Accordion ------------------------------- */

const FAQS = [
  {
    q: 'Is Gray UI really free?',
    a: 'Yes — MIT licensed. Use it in client work, side projects, anything you want.',
  },
  {
    q: 'Do I own the code?',
    a: 'Absolutely. Components are copied into your repo — there is no runtime package to update or pay for.',
  },
  {
    q: 'Can I use it with Vue or Svelte?',
    a: 'The patterns port easily, but the components are React + Tailwind first. Ports are on the roadmap.',
  },
]

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-[300px]">
      {FAQS.map((f, i) => (
        <AccordionItem key={f.q} value={`item-${i}`}>
          <AccordionTrigger className="text-left text-sm">{f.q}</AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

/* ------------------------------- Collapsible ------------------------------ */

export function CollapsibleDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-[280px] space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium">Recent activity</p>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <ChevronsUpDown className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Toggle activity</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-3 py-2 text-sm">Deployed to production</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-3 py-2 text-sm">Added dark mode tokens</div>
        <div className="rounded-md border px-3 py-2 text-sm">Fixed focus ring on Safari</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

/* ---------------------------------- Alert --------------------------------- */

export function AlertDemo() {
  return (
    <div className="w-full max-w-[300px] space-y-3">
      <Alert>
        <Rocket className="h-4 w-4" aria-hidden="true" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>Gray UI v2.0 is live — try every demo below.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <TriangleAlert className="h-4 w-4" aria-hidden="true" />
        <AlertTitle>Build quota at 90%</AlertTitle>
        <AlertDescription>Upgrade before Friday to keep auto-deploys.</AlertDescription>
      </Alert>
    </div>
  )
}

/* --------------------------------- Avatar --------------------------------- */

const PEOPLE = ['LV', 'GT', 'AK', 'MJ']

export function AvatarDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex -space-x-2.5">
        {PEOPLE.map((initials, i) => (
          <Avatar key={initials} className="h-9 w-9 ring-2 ring-background">
            <AvatarFallback
              className={cn(
                'text-xs font-semibold',
                i % 2 ? 'bg-foreground text-background' : 'bg-muted text-foreground'
              )}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
        ))}
        <Avatar className="h-9 w-9 ring-2 ring-background">
          <AvatarFallback className="bg-muted text-xs font-medium">+9</AvatarFallback>
        </Avatar>
      </div>
      <p className="text-xs text-muted-foreground">13 people are viewing this canvas</p>
    </div>
  )
}

/* ---------------------------------- Badge --------------------------------- */

export function BadgeDemo() {
  return (
    <div className="flex max-w-[280px] flex-wrap items-center justify-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">Live</Badge>
      <Badge className="gap-1">
        <Sparkles className="h-3 w-3" aria-hidden="true" />
        New
      </Badge>
    </div>
  )
}

/* ---------------------------------- Card ---------------------------------- */

export function CardDemo() {
  const { toast } = useToast()

  return (
    <Card className="w-full max-w-[300px]">
      <CardHeader>
        <CardTitle className="text-base">Team invite</CardTitle>
        <CardDescription>You have been invited to Graytell Studio.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {['LV', 'GT', 'AK'].map((initials) => (
            <Avatar key={initials} className="h-7 w-7 ring-2 ring-background">
              <AvatarFallback className="bg-muted text-[10px] font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">4 members already</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm" className="flex-1" onClick={() => toast({ title: 'Welcome aboard!' })}>
          Accept
        </Button>
        <Button size="sm" variant="ghost" className="flex-1">
          Later
        </Button>
      </CardFooter>
    </Card>
  )
}

/* -------------------------------- Separator ------------------------------- */

export function SeparatorDemo() {
  return (
    <div className="w-full max-w-[260px] rounded-lg border p-4">
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">Gray Studio</p>
        <p className="text-xs text-muted-foreground">team@graytell.com</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-xs text-muted-foreground">
        <div>Dashboard</div>
        <Separator orientation="vertical" />
        <div>Deployments</div>
        <Separator orientation="vertical" />
        <div>Settings</div>
      </div>
    </div>
  )
}

/* -------------------------------- Skeleton -------------------------------- */

export function SkeletonDemo() {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 1600)
    return () => window.clearTimeout(t)
  }, [])

  const reload = () => {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 1600)
  }

  return (
    <div className="w-full max-w-[280px] space-y-3">
      {loading ? (
        <div className="flex items-center gap-3 rounded-lg border p-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-lg border p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
            <GrayMark className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">Gray UI</p>
            <p className="text-xs text-muted-foreground">Loaded in 1.6s — that is the point.</p>
          </div>
        </div>
      )}
      <Button size="sm" variant="outline" onClick={reload} className="w-full">
        Simulate loading
      </Button>
    </div>
  )
}

/* --------------------------------- Tabs ----------------------------------- */

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-[300px]">
      <TabsList className="w-full">
        <TabsTrigger value="overview" className="flex-1">
          Overview
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex-1">
          Analytics
        </TabsTrigger>
        <TabsTrigger value="logs" className="flex-1">
          Logs
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="rounded-lg border p-3 text-sm text-muted-foreground">
          12 deploys this week. All green.
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="rounded-lg border p-3 text-sm text-muted-foreground">
          4,218 visitors · 62% returning.
        </div>
      </TabsContent>
      <TabsContent value="logs">
        <div className="rounded-lg border p-3 text-sm text-muted-foreground">
          09:41 — build finished in 38s.
        </div>
      </TabsContent>
    </Tabs>
  )
}

/* ------------------------------- Aspect ratio ----------------------------- */

export function AspectRatioDemo() {
  return (
    <div className="w-full max-w-[280px]">
      <AspectRatio
        ratio={16 / 9}
        className="overflow-hidden rounded-lg border bg-gradient-to-br from-muted via-background to-muted"
      >
        <div className="flex h-full flex-col items-center justify-center gap-1.5">
          <GrayMark className="h-7 w-7" />
          <span className="text-xs text-muted-foreground">16 : 9 — always fits</span>
        </div>
      </AspectRatio>
    </div>
  )
}

/* --------------------------------- Carousel ------------------------------- */

export function CarouselDemo() {
  return (
    <div className="w-full max-w-[260px] px-10">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {[
            { day: 'Mon', n: 4 },
            { day: 'Tue', n: 7 },
            { day: 'Wed', n: 2 },
            { day: 'Thu', n: 9 },
          ].map((d) => (
            <CarouselItem key={d.day}>
              <div className="flex h-28 flex-col items-center justify-center rounded-lg border bg-muted/40">
                <span className="text-2xl font-bold">{d.day}</span>
                <span className="text-xs text-muted-foreground">{d.n} deploys</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-1" />
        <CarouselNext className="-right-1" />
      </Carousel>
    </div>
  )
}

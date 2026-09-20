'use client'

import * as React from 'react'
import { Bell, Bold, Check, Italic, Loader2, Plane, Send, Underline } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

/* --------------------------------- Button --------------------------------- */

export function ButtonDemo() {
  const [pending, setPending] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [count, setCount] = React.useState(0)

  const deploy = () => {
    if (pending) return
    setPending(true)
    window.setTimeout(() => {
      setPending(false)
      setDone(true)
      window.setTimeout(() => setDone(false), 1600)
    }, 1400)
  }

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="secondary">
          Secondary
        </Button>
        <Button size="sm" variant="outline">
          Outline
        </Button>
        <Button size="sm" variant="ghost">
          Ghost
        </Button>
        <Button size="sm" variant="destructive">
          Destructive
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={deploy} disabled={pending} className="w-32">
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Deploying…
            </>
          ) : done ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" />
              Live!
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Deploy
            </>
          )}
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setCount((c) => c + 1)}>
          Clicked {count}×
        </Button>
      </div>
    </div>
  )
}

/* --------------------------------- Toggle --------------------------------- */

export function ToggleDemo() {
  const [pressed, setPressed] = React.useState(false)
  const [formats, setFormats] = React.useState<string[]>(['bold'])

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-4">
      <Toggle
        variant="outline"
        pressed={pressed}
        onPressedChange={setPressed}
        aria-label="Toggle notifications"
      >
        <Bell className="h-4 w-4" aria-hidden="true" />
        Notifications
      </Toggle>
      <ToggleGroup
        type="multiple"
        value={formats}
        onValueChange={setFormats}
        variant="outline"
        aria-label="Text formatting"
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" aria-hidden="true" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" aria-hidden="true" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" aria-hidden="true" />
        </ToggleGroupItem>
      </ToggleGroup>
      <p aria-live="polite" className="text-xs text-muted-foreground">
        Formatting: {formats.length ? formats.join(' · ') : 'none'}
      </p>
    </div>
  )
}

/* --------------------------------- Switch --------------------------------- */

export function SwitchDemo() {
  const [airplane, setAirplane] = React.useState(false)
  const [notifications, setNotifications] = React.useState(true)

  return (
    <div className="w-full max-w-[250px] space-y-3">
      <div className="flex items-center justify-between rounded-lg border p-3">
        <Label htmlFor="demo-airplane" className="gap-2">
          <Plane className="h-4 w-4" aria-hidden="true" />
          Airplane mode
        </Label>
        <Switch id="demo-airplane" checked={airplane} onCheckedChange={setAirplane} />
      </div>
      <div className="flex items-center justify-between rounded-lg border p-3">
        <Label htmlFor="demo-notifications">Notifications</Label>
        <Switch
          id="demo-notifications"
          checked={notifications}
          onCheckedChange={setNotifications}
        />
      </div>
      <p aria-live="polite" className="text-center text-xs text-muted-foreground">
        {airplane
          ? 'Airplane mode is on — radios off.'
          : notifications
            ? 'Online · notifications on.'
            : 'Online · notifications muted.'}
      </p>
    </div>
  )
}

/* -------------------------------- Checkbox -------------------------------- */

const TASKS = ['Wireframe the hero', 'Hook up the CLI', 'Ship the changelog']

export function CheckboxDemo() {
  const [done, setDone] = React.useState<Record<string, boolean>>({
    'Wireframe the hero': true,
  })
  const doneCount = TASKS.filter((t) => done[t]).length

  return (
    <div className="w-full max-w-[250px] space-y-3">
      {TASKS.map((task) => (
        <label key={task} className="flex cursor-pointer items-center gap-2.5 text-sm">
          <Checkbox
            checked={Boolean(done[task])}
            onCheckedChange={(v) => setDone((d) => ({ ...d, [task]: v === true }))}
            aria-label={task}
          />
          <span className={cn(done[task] && 'text-muted-foreground line-through')}>{task}</span>
        </label>
      ))}
      <p aria-live="polite" className="text-xs text-muted-foreground">
        {doneCount} of {TASKS.length} done
      </p>
    </div>
  )
}

/* ------------------------------- Radio group ------------------------------ */

const PLANS = [
  { id: 'starter', name: 'Starter', price: '$0', note: 'For side projects' },
  { id: 'pro', name: 'Pro', price: '$12', note: 'For serious builders' },
  { id: 'team', name: 'Team', price: '$49', note: 'For whole squads' },
]

export function RadioGroupDemo() {
  const [plan, setPlan] = React.useState('pro')
  const selected = PLANS.find((p) => p.id === plan)

  return (
    <div className="w-full max-w-[270px] space-y-3">
      <RadioGroup value={plan} onValueChange={setPlan} className="gap-2.5">
        {PLANS.map((p) => (
          <Label
            key={p.id}
            htmlFor={`plan-${p.id}`}
            className={cn(
              'flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3 font-normal transition-colors',
              plan === p.id && 'border-foreground bg-accent'
            )}
          >
            <span className="flex items-center gap-2.5">
              <RadioGroupItem id={`plan-${p.id}`} value={p.id} />
              <span>
                <span className="block text-sm font-medium">{p.name}</span>
                <span className="block text-xs text-muted-foreground">{p.note}</span>
              </span>
            </span>
            <span className="text-sm font-semibold tabular-nums">{p.price}</span>
          </Label>
        ))}
      </RadioGroup>
      <p aria-live="polite" className="text-center text-xs text-muted-foreground">
        Selected: {selected?.name} ({selected?.price}/mo)
      </p>
    </div>
  )
}

/* --------------------------------- Slider --------------------------------- */

export function SliderDemo() {
  const [amount, setAmount] = React.useState(80)

  return (
    <div className="w-full max-w-[260px] space-y-4 text-center">
      <div className="text-2xl font-bold tabular-nums">${amount}</div>
      <Slider
        value={[amount]}
        onValueChange={(v) => setAmount(v[0] ?? 80)}
        min={25}
        max={200}
        step={5}
        aria-label="Donation amount"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>$25</span>
        <span>$200</span>
      </div>
      <div className="flex justify-center gap-1.5">
        {[50, 80, 120].map((v) => (
          <Button
            key={v}
            size="sm"
            variant={amount === v ? 'default' : 'outline'}
            className="h-7 rounded-full px-3 text-xs"
            onClick={() => setAmount(v)}
          >
            ${v}
          </Button>
        ))}
      </div>
    </div>
  )
}

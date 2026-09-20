'use client'

import * as React from 'react'

import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)

/**
 * Gray Original — savings goals with draggable sliders and live progress
 * math. Percentages, remaining amounts and currency formatting update in
 * real time as you drag.
 */
export function SavingsTargets() {
  const goals = [
    { label: 'Retirement', target: 420_000, initial: 273_000 },
    { label: 'Real Estate', target: 85_000, initial: 27_200 },
  ]
  const [current, setCurrent] = React.useState<number[]>(goals.map((g) => g.initial))

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="text-base font-semibold tracking-tight">Savings Targets</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Drag the sliders — live progress, zero page loads.
      </p>
      <div className="mt-5 space-y-5">
        {goals.map((goal, i) => {
          const pct = Math.round((current[i] / goal.target) * 100)
          return (
            <div key={goal.label} className="rounded-lg border border-border/70 p-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {goal.label}
                </p>
                <Badge variant="secondary" className="rounded-md text-[10px]">
                  {pct}%
                </Badge>
              </div>
              <p className="mt-1 text-2xl font-bold tracking-tight tabular-nums">
                {fmt(current[i])}
              </p>
              <Slider
                value={[current[i]]}
                onValueChange={(v) =>
                  setCurrent((prev) => {
                    const next = [...prev]
                    next[i] = v[0] ?? prev[i]
                    return next
                  })
                }
                max={goal.target}
                step={100}
                className="mt-3"
                aria-label={`${goal.label} saved amount`}
              />
              <div className="mt-2.5 flex items-center justify-between text-xs">
                <span className="font-medium">{pct}% of {fmt(goal.target)}</span>
                <span className="tabular-nums text-muted-foreground">
                  {fmt(Math.max(goal.target - current[i], 0))} to go
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

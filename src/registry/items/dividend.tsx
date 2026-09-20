'use client'

import * as React from 'react'
import { Check } from 'lucide-react'

/**
 * Gray Original — dividend income estimator with multi-select holdings.
 * Toggle positions to watch the estimated quarterly payout update instantly.
 */
export function DividendCard() {
  const holdings = [
    { name: 'Vanguard', shares: '450 Shares', bars: [35, 45, 40, 70], payout: 312.5 },
    { name: 'S&P 500 VOO', shares: '112 Shares', bars: [40, 55, 35, 60], payout: 145.2 },
    { name: 'Apple AAPL', shares: '85 Shares', bars: [30, 40, 65, 45], payout: 98.75 },
    { name: 'Realty Income', shares: '320 Shares', bars: [45, 35, 55, 50], payout: 210.4 },
  ]
  const [selected, setSelected] = React.useState<Set<string>>(new Set())

  const toggle = (name: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })

  const total = holdings
    .filter((h) => selected.has(h.name))
    .reduce((sum, h) => sum + h.payout, 0)

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div>
        <h3 className="text-base font-semibold tracking-tight">Q2 Dividend Income</h3>
        <p className="mt-1 max-w-[240px] text-sm leading-relaxed text-muted-foreground">
          Select holdings to estimate your quarterly payout.
        </p>
      </div>
      <ul className="mt-5 space-y-2.5">
        {holdings.map((h) => {
          const active = selected.has(h.name)
          return (
            <li key={h.name}>
              <button
                type="button"
                onClick={() => toggle(h.name)}
                aria-pressed={active}
                className={
                  'flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-all ' +
                  (active
                    ? 'border-foreground bg-accent'
                    : 'border-border/70 hover:bg-accent/40')
                }
              >
                <span className="flex items-center gap-3">
                  <span
                    className={
                      'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border transition-colors ' +
                      (active
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border bg-background')
                    }
                    aria-hidden="true"
                  >
                    {active && <Check className="h-3 w-3" />}
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{h.name}</span>
                    <span className="block text-xs text-muted-foreground">{h.shares}</span>
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="text-right">
                    <span className="block text-sm font-semibold tabular-nums">
                      ${h.payout.toFixed(2)}
                    </span>
                    <span className="block text-[10px] text-muted-foreground">est. / quarter</span>
                  </span>
                  <span className="flex h-8 items-end gap-0.5" aria-hidden="true">
                    {h.bars.map((v, j) => (
                      <span
                        key={j}
                        className={
                          'w-1.5 rounded-sm ' +
                          (active ? 'bg-foreground' : 'bg-zinc-300 dark:bg-zinc-700')
                        }
                        style={{ height: `${v * 0.32}px` }}
                      />
                    ))}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <div className="mt-4 flex items-center justify-between rounded-lg bg-muted px-4 py-3">
        <span className="text-sm text-muted-foreground">
          {selected.size} selected
        </span>
        <span className="text-sm font-bold tabular-nums">
          ${total.toFixed(2)}{' '}
          <span className="font-normal text-muted-foreground">est. quarterly</span>
        </span>
      </div>
    </div>
  )
}

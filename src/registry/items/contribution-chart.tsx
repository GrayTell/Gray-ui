'use client'

import * as React from 'react'

/**
 * Gray Original — GitHub-style contribution bar chart with 6-month and
 * 1-year periods. Hover or focus any bar for a tooltip with the exact count.
 */
export function ContributionChart() {
  const DATASETS = {
    '6M': {
      months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      values: [38, 55, 30, 68, 45, 88],
    },
    '1Y': {
      months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      values: [42, 30, 58, 74, 25, 48, 60, 35, 70, 52, 45, 88],
    },
  } as const
  const [period, setPeriod] = React.useState<keyof typeof DATASETS>('6M')
  const [hovered, setHovered] = React.useState<number | null>(null)

  const { months, values } = DATASETS[period]

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold tracking-tight">Contribution History</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {period === '6M' ? 'Last 6 months of activity' : 'Last 12 months of activity'}
          </p>
        </div>
        <div
          role="tablist"
          aria-label="Chart period"
          className="flex rounded-lg bg-muted p-0.5 text-xs font-medium"
        >
          {(Object.keys(DATASETS) as (keyof typeof DATASETS)[]).map((p) => (
            <button
              key={p}
              role="tab"
              aria-selected={period === p}
              onClick={() => {
                setPeriod(p)
                setHovered(null)
              }}
              className={
                'rounded-md px-2.5 py-1 transition-colors ' +
                (period === p
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground')
              }
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-6 flex h-28 items-end justify-between gap-1.5">
        {/* Tooltip */}
        {hovered !== null && (
          <div
            className="pointer-events-none absolute -top-9 z-10 -translate-x-1/2 rounded-md border border-border bg-popover px-2 py-1 text-xs font-medium text-popover-foreground shadow-md"
            style={{
              left: `${((hovered + 0.5) / values.length) * 100}%`,
            }}
            role="status"
          >
            {months[hovered]} · {values[hovered]} commits
          </div>
        )}
        {values.map((v, i) => (
          <button
            key={`${period}-${i}`}
            type="button"
            className="group relative flex h-full flex-1 cursor-default flex-col items-center gap-2 focus-visible:outline-none"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            aria-label={`${months[i]}: ${v} commits`}
          >
            <span className="flex w-full flex-1 items-end">
              <span
                className={
                  'block w-full rounded-md transition-all duration-300 group-hover:opacity-80 ' +
                  (i === values.length - 1
                    ? 'bg-zinc-900 dark:bg-zinc-100'
                    : 'bg-zinc-400/70 dark:bg-zinc-600')
                }
                style={{ height: `${v}%` }}
              />
            </span>
            <span
              className={
                'text-[10px] font-medium tabular-nums ' +
                (months.length > 8 ? 'hidden sm:block' : '') +
                ' text-muted-foreground'
              }
            >
              {months[i]}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

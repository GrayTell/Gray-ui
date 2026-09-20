'use client'

import * as React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const REPORT_ROWS = [
  { label: 'Royalties — Aug 2024', value: '$412.90' },
  { label: 'Royalties — Jul 2024', value: '$386.25' },
  { label: 'Royalties — Jun 2024', value: '$449.60' },
  { label: 'Processing fees', value: '-$37.46' },
]

/**
 * Gray Original — a payout summary card with balance, fees and a
 * line-by-line breakdown behind one click (Dialog).
 */
export function ClaimableBalance() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <p className="text-sm text-muted-foreground">Claimable Balance</p>
      <p className="mt-1 text-4xl font-bold tracking-tighter tabular-nums">$1,211.29</p>
      <Badge variant="outline" className="mt-3 gap-1.5 rounded-md font-medium">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
        Pending Setup
      </Badge>
      <dl className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <dt className="text-muted-foreground">Net Royalties</dt>
          <dd className="font-medium tabular-nums">$1,248.75</dd>
        </div>
        <div className="flex items-center justify-between text-sm">
          <dt className="text-muted-foreground">Processing Fee</dt>
          <dd className="font-medium tabular-nums">-$37.46</dd>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2.5 text-sm">
          <dt className="font-medium">Total Ready to Claim</dt>
          <dd className="font-bold tabular-nums">$1,211.29 USD</dd>
        </div>
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Once your bank is connected, balances over $10.00 are automatically eligible for monthly
        distribution on the 15th of each month.
      </p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-4 w-full rounded-full" size="sm">
            View Full Report
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Claimable balance report</DialogTitle>
            <DialogDescription>
              Line-by-line breakdown of everything waiting to hit your account.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-border">
            {REPORT_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={
                  'flex items-center justify-between px-4 py-2.5 text-sm ' +
                  (i !== REPORT_ROWS.length - 1 ? 'border-b border-border' : '')
                }
              >
                <span className="text-muted-foreground">{row.label}</span>
                <span className="font-medium tabular-nums">{row.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between bg-muted px-4 py-3 text-sm">
              <span className="font-semibold">Total</span>
              <span className="font-bold tabular-nums">$1,211.29 USD</span>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setOpen(false)}>Claim now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

'use client'

import * as React from 'react'
import { Calendar, ChevronDown, PieChart, Settings } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Switch } from '@/components/ui/switch'

/**
 * Payment settings panel with collapsible action rows and
 * working switches, plus a breadcrumb header for nested-page contexts.
 */
export function PaymentsCard() {
  const [autoTransfer, setAutoTransfer] = React.useState(true)
  const [recurring, setRecurring] = React.useState(false)

  const actions = [
    {
      icon: Settings,
      title: 'Change transfer limit',
      desc: 'Adjust how much you can send from your balance.',
      body: (
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground">Auto-transfer over $500</span>
          <Switch checked={autoTransfer} onCheckedChange={setAutoTransfer} aria-label="Auto-transfer" />
        </div>
      ),
    },
    {
      icon: Calendar,
      title: 'Scheduled transfers',
      desc: 'Set up a transfer to send at a later date.',
      body: (
        <p className="pt-1 text-xs text-muted-foreground">
          Next scheduled transfer: <span className="font-medium text-foreground">Sep 15, 2024</span> · $1,200.00
        </p>
      ),
    },
    {
      icon: PieChart,
      title: 'Recurring card payments',
      desc: 'Manage your repeated card transactions.',
      body: (
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground">Enable recurring payments</span>
          <Switch checked={recurring} onCheckedChange={setRecurring} aria-label="Recurring payments" />
        </div>
      ),
    },
  ]

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
        <span className="text-muted-foreground">Home</span>
        <span className="text-muted-foreground" aria-hidden="true">
          ›
        </span>
        <span className="font-medium" aria-current="page">
          Payments
        </span>
      </nav>
      <div className="mt-4 space-y-2">
        {actions.map((a) => (
          <Collapsible key={a.title}>
            <CollapsibleTrigger className="group flex w-full items-start gap-3 rounded-lg border border-border/70 p-3.5 text-left transition-all hover:bg-accent/40">
              <a.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="flex-1">
                <span className="block text-sm font-medium">{a.title}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                  {a.desc}
                </span>
              </span>
              <ChevronDown
                className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="rounded-b-lg border border-t-0 border-border/70 px-3.5 pb-3.5">{a.body}</div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}

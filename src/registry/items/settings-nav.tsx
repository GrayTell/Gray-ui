'use client'

import * as React from 'react'
import {
  BarChart3,
  Bell,
  Calendar,
  CreditCard,
  Shield,
  Target,
  User,
  Wallet,
} from 'lucide-react'

function NavRow({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors ' +
        (active
          ? 'bg-accent font-medium text-foreground'
          : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground')
      }
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  )
}

/**
 * Two independent settings navigation lists (Overview /
 * Account) with selectable rows. A drop-in navigation pattern for settings
 * pages, fully keyboard accessible via `aria-pressed`.
 */
export function SettingsNav() {
  const [overviewActive, setOverviewActive] = React.useState('Reports')
  const [accountActive, setAccountActive] = React.useState('Billing')

  const overview = [
    { icon: Wallet, label: 'Budget' },
    { icon: BarChart3, label: 'Reports' },
    { icon: Target, label: 'Goals' },
    { icon: Calendar, label: 'Calendar' },
  ]
  const account = [
    { icon: User, label: 'Profile' },
    { icon: CreditCard, label: 'Billing' },
    { icon: Bell, label: 'Notifications' },
    { icon: Shield, label: 'Security' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
        <p className="px-2.5 pb-1.5 pt-1 text-xs font-medium text-muted-foreground">Overview</p>
        {overview.map((row) => (
          <NavRow
            key={row.label}
            icon={row.icon}
            label={row.label}
            active={overviewActive === row.label}
            onClick={() => setOverviewActive(row.label)}
          />
        ))}
      </div>
      <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
        <p className="px-2.5 pb-1.5 pt-1 text-xs font-medium text-muted-foreground">Account</p>
        {account.map((row) => (
          <NavRow
            key={row.label}
            icon={row.icon}
            label={row.label}
            active={accountActive === row.label}
            onClick={() => setAccountActive(row.label)}
          />
        ))}
      </div>
    </div>
  )
}

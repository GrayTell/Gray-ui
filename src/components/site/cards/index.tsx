import { AccountAccess } from './account-access'
import { AnalyticsCard } from './analytics-card'
import { ClaimableBalance } from './claimable-balance'
import { ContributionHistory } from './contribution-history'
import { DividendIncome } from './dividend-income'
import { EmptyDistributeTrack } from './empty-distribute-track'
import { NewMilestone } from './new-milestone'
import { NotificationSettings } from './notification-settings'
import { Payments } from './payments'
import { PayoutThreshold } from './payout-threshold'
import { PowerUsage } from './power-usage'
import { QrConnect } from './qr-connect'
import { SavingsTargets } from './savings-targets'
import { SidebarNav } from './sidebar-nav'
import { UIElements } from './ui-elements'

/**
 * Exact port of shadcn/ui v4 homepage cards/index.tsx (CardsDemo).
 * Differences from upstream: the decorative skeleton rails (>=2200px
 * background columns) and the MessageScrollerDemo example are omitted —
 * every visible card is rendered by Gray UI's own component library.
 */
export function CardsDemo() {
  return (
    <div
      data-slot="demo"
      className="relative flex w-full max-w-none flex-col gap-(--gap) overflow-hidden bg-muted p-12 pb-0! [--gap:--spacing(8)] 3xl:[--gap:--spacing(8)] min-[1900px]:p-12 min-[1900px]:[--gap:--spacing(10)]! lg:p-6 lg:[--gap:--spacing(6)] dark:bg-background"
    >
      <div className="relative z-10 mx-auto grid gap-(--gap) **:data-[slot=card]:w-full min-[1400px]:grid-cols-4! min-[1900px]:grid-cols-5! md:max-w-3xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3 xl:max-w-[1600px] 2xl:max-w-[1900px]">
        <div className="flex flex-col items-start gap-(--gap)">
          <UIElements />
          <SidebarNav />
          <SavingsTargets />
        </div>
        <div className="hidden flex-col gap-(--gap) lg:flex">
          <ContributionHistory />
          <ClaimableBalance />
          <DividendIncome />
        </div>
        <div className="hidden flex-col gap-(--gap) min-[1400px]:flex">
          <NewMilestone />
          <PayoutThreshold />
          <AccountAccess />
        </div>
        <div className="hidden flex-col gap-(--gap) md:flex">
          <QrConnect />
          <Payments />
        </div>
        <div className="hidden flex-col gap-(--gap) min-[1900px]:flex">
          <EmptyDistributeTrack />
          <AnalyticsCard />
          <NotificationSettings />
          <PowerUsage />
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 z-1 h-120 bg-linear-to-b from-background via-muted to-transparent dark:hidden" />
      <div className="absolute inset-x-0 bottom-0 z-20 h-48 bg-linear-to-t from-background via-muted/80 to-transparent lg:h-80 xl:h-64 dark:via-background/80" />
    </div>
  )
}

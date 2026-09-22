import * as React from 'react'
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  ChartColumnBig,
  CreditCard,
  File,
  Globe,
  Landmark,
  ArrowLeftRight,
  MessageSquare,
  Palette,
  PieChart,
  CircleHelp,
  Shield,
  Target,
  TrendingUp,
  User,
  Wallet,
} from 'lucide-react'
import { cn } from '@/lib/utils'

import { Card } from '@/components/ui/card'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'

/**
 * Exact port of shadcn/ui v4 homepage cards/sidebar-nav.tsx.
 */
function SidebarSection({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card className={cn('w-full overflow-hidden rounded-3xl py-0', className)}>
      <SidebarProvider className="min-h-0">
        <Sidebar collapsible="none" className="w-full bg-transparent">
          <SidebarContent className="gap-0 overflow-hidden">
            <SidebarGroup>
              <SidebarGroupLabel>{label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">{children}</SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </Card>
  )
}

export function SidebarNav() {
  return (
    <div className="grid w-full grid-cols-2 gap-4 xl:gap-6">
      <SidebarSection
        label="Overview"
        className="xl:col-start-1 xl:row-start-2"
      >
        <SidebarMenuItem>
          <SidebarMenuButton isActive>
            <BarChart3 aria-hidden="true" />
            Analytics
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ArrowLeftRight aria-hidden="true" />
            Transactions
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <TrendingUp aria-hidden="true" />
            Investments
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Landmark aria-hidden="true" />
            Accounts
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <PieChart aria-hidden="true" />
            Spending
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarSection>

      <SidebarSection
        label="Planning"
        className="xl:col-start-1 xl:row-start-1"
      >
        <SidebarMenuItem>
          <SidebarMenuButton>
            <File aria-hidden="true" />
            Documents
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Wallet aria-hidden="true" />
            Budget
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ChartColumnBig aria-hidden="true" />
            Reports
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Target aria-hidden="true" />
            Goals
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Calendar aria-hidden="true" />
            Calendar
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarSection>

      <SidebarSection
        label="Support"
        className="flex xl:col-start-2 xl:row-start-1"
      >
        <SidebarMenuItem>
          <SidebarMenuButton>
            <CircleHelp aria-hidden="true" />
            Help Center
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <BookOpen aria-hidden="true" />
            Docs
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <MessageSquare aria-hidden="true" />
            Contact Us
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Activity aria-hidden="true" />
            Status
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Globe aria-hidden="true" />
            Community
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarSection>

      <SidebarSection
        label="Account"
        className="flex xl:col-start-2 xl:row-start-2"
      >
        <SidebarMenuItem>
          <SidebarMenuButton>
            <User aria-hidden="true" />
            Profile
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton isActive>
            <CreditCard aria-hidden="true" />
            Billing
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Bell aria-hidden="true" />
            Notifications
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Shield aria-hidden="true" />
            Security
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Palette aria-hidden="true" />
            Appearance
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarSection>
    </div>
  )
}

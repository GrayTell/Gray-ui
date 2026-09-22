import {
  Calendar,
  ChevronRight,
  Ellipsis,
  RefreshCw,
  Settings,
} from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'

/**
 * Gray UI homepage card: payments.
 */
export function Payments() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    aria-label="Account options"
                  >
                    <Ellipsis aria-hidden="true" />
                    <span className="sr-only">Account options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Statements</DropdownMenuItem>
                    <DropdownMenuItem>Documents</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Payments</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <div role="listitem" className="w-full">
            <a href="#" className="block w-full" aria-label="Change transfer limit">
              <Item variant="muted">
                <ItemMedia variant="icon">
                  <Settings aria-hidden="true" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Change transfer limit</ItemTitle>
                  <ItemDescription>
                    Adjust how much you can send from your balance.
                  </ItemDescription>
                </ItemContent>
                <ChevronRight
                  className="text-muted-foreground size-4 shrink-0"
                  aria-hidden="true"
                />
              </Item>
            </a>
          </div>
          <div role="listitem" className="w-full">
            <a href="#" className="block w-full" aria-label="Scheduled transfers">
              <Item variant="muted">
                <ItemMedia variant="icon">
                  <Calendar aria-hidden="true" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Scheduled transfers</ItemTitle>
                  <ItemDescription>
                    Set up a transfer to send at a later date.
                  </ItemDescription>
                </ItemContent>
                <ChevronRight
                  className="text-muted-foreground size-4 shrink-0"
                  aria-hidden="true"
                />
              </Item>
            </a>
          </div>
          <div role="listitem" className="w-full">
            <a href="#" className="block w-full" aria-label="Recurring card payments">
              <Item variant="muted">
                <ItemMedia variant="icon">
                  <RefreshCw aria-hidden="true" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Recurring card payments</ItemTitle>
                  <ItemDescription>
                    Manage your repeated card transactions.
                  </ItemDescription>
                </ItemContent>
                <ChevronRight
                  className="text-muted-foreground size-4 shrink-0"
                  aria-hidden="true"
                />
              </Item>
            </a>
          </div>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}

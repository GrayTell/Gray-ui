import { CircleAlert, ChevronRight, LockKeyhole } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'

/**
 * Exact port of shadcn/ui v4 homepage cards/account-access.tsx.
 */
export function AccountAccess() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Access</CardTitle>
        <CardDescription>
          Update your credentials or re-authenticate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email-address">Email Address</FieldLabel>
            <Input
              id="email-address"
              type="email"
              placeholder="artist@studio.inc"
            />
          </Field>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="current-password">
                Current Password
              </FieldLabel>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-xs font-medium tracking-wider uppercase"
              >
                Forgot?
              </a>
            </div>
            <Input
              id="current-password"
              type="password"
              placeholder="••••••••••••••••••••••••"
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button className="w-full">
          <LockKeyhole aria-hidden="true" />
          Update Security
        </Button>
        <a href="#" className="block w-full" aria-label="Danger Zone">
          <Item variant="muted">
            <ItemMedia variant="icon">
              <CircleAlert
                className="text-destructive"
                aria-hidden="true"
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Danger Zone</ItemTitle>
              <ItemDescription className="line-clamp-1">
                Archive account and remove catalog
              </ItemDescription>
            </ItemContent>
            <ChevronRight className="size-4" aria-hidden="true" />
          </Item>
        </a>
      </CardFooter>
    </Card>
  )
}

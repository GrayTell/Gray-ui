'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CalendarDays as CalendarIcon, Check, ChevronsUpDown, X } from 'lucide-react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

/* --------------------------------- Input ---------------------------------- */

export function InputDemo() {
  const [email, setEmail] = React.useState('')
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const state = email.length === 0 ? 'idle' : valid ? 'valid' : 'invalid'

  return (
    <div className="w-full max-w-[270px] space-y-2">
      <Label htmlFor="demo-email">Work email</Label>
      <div className="relative">
        <Input
          id="demo-email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={state === 'invalid'}
          className={cn(
            'pr-9',
            state === 'valid' && 'border-emerald-500/60 focus-visible:ring-emerald-500/30',
            state === 'invalid' && 'border-destructive/60 focus-visible:ring-destructive/30'
          )}
        />
        <span className="absolute inset-y-0 right-3 flex items-center">
          {state === 'valid' && <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />}
          {state === 'invalid' && <X className="h-4 w-4 text-destructive" aria-hidden="true" />}
        </span>
      </div>
      <p
        aria-live="polite"
        className={cn('text-xs', state === 'invalid' ? 'text-destructive' : 'text-muted-foreground')}
      >
        {state === 'valid'
          ? 'Looks good — receipts only, promise.'
          : state === 'invalid'
            ? 'That does not look like an email.'
            : 'We will never share your email.'}
      </p>
    </div>
  )
}

/* -------------------------------- Textarea -------------------------------- */

export function TextareaDemo() {
  const MAX = 140
  const [bio, setBio] = React.useState('')
  const remaining = MAX - bio.length

  return (
    <div className="w-full max-w-[280px] space-y-2">
      <Label htmlFor="demo-bio">Shipping update</Label>
      <Textarea
        id="demo-bio"
        placeholder="What did you ship today?"
        value={bio}
        onChange={(e) => setBio(e.target.value.slice(0, MAX))}
        className="min-h-[84px] resize-none"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Markdown supported</span>
        <span
          className={cn(
            'tabular-nums',
            remaining <= 20 && remaining > 0 && 'text-amber-600 dark:text-amber-400',
            remaining <= 0 && 'text-destructive'
          )}
        >
          {bio.length}/{MAX}
        </span>
      </div>
    </div>
  )
}

/* -------------------------------- Input OTP ------------------------------- */

export function OTPDemo() {
  const [value, setValue] = React.useState('')
  const complete = value.length === 6
  const { toast } = useToast()

  return (
    <div className="flex flex-col items-center gap-3">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          disabled={!complete}
          onClick={() => {
            toast({ title: 'Code verified', description: 'Welcome back to Gray UI.' })
            setValue('')
          }}
        >
          Verify code
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setValue('')}>
          Reset
        </Button>
      </div>
      <p aria-live="polite" className="text-xs text-muted-foreground">
        {complete ? 'All set — hit verify.' : 'Type or paste any 6 digits.'}
      </p>
    </div>
  )
}

/* --------------------------------- Select --------------------------------- */

export function SelectDemo() {
  const [tz, setTz] = React.useState('')

  return (
    <div className="w-full max-w-[260px] space-y-2.5">
      <Select value={tz} onValueChange={setTz}>
        <SelectTrigger className="w-full" aria-label="Timezone">
          <SelectValue placeholder="Pick your timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Common</SelectLabel>
            <SelectItem value="gst">Dubai · GST (UTC+4)</SelectItem>
            <SelectItem value="gmt">London · GMT (UTC+0)</SelectItem>
            <SelectItem value="est">New York · EST (UTC−5)</SelectItem>
            <SelectItem value="jst">Tokyo · JST (UTC+9)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <p aria-live="polite" className="text-center text-xs text-muted-foreground">
        {tz ? `Meetings scheduled in ${tz.toUpperCase()}` : 'Nothing selected yet'}
      </p>
    </div>
  )
}

/* ------------------------------- Date picker ------------------------------ */

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col items-center gap-2.5">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[220px] justify-start font-normal">
            <CalendarIcon className="h-4 w-4" aria-hidden="true" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
      <p aria-live="polite" className="text-xs text-muted-foreground">
        {date ? 'Launch day locked in.' : 'When are you shipping?'}
      </p>
    </div>
  )
}

/* -------------------------------- Calendar -------------------------------- */

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col items-center gap-2">
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-lg border" />
      <p aria-live="polite" className="text-xs text-muted-foreground">
        {date ? format(date, 'PPP') : 'No date selected'}
      </p>
    </div>
  )
}

/* -------------------------------- Combobox -------------------------------- */

const STACKS = [
  { value: 'next', label: 'Next.js' },
  { value: 'astro', label: 'Astro' },
  { value: 'remix', label: 'Remix' },
  { value: 'sveltekit', label: 'SvelteKit' },
]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const selected = STACKS.find((s) => s.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between font-normal"
        >
          {selected ? selected.label : 'Pick your stack…'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Search stacks…" />
          <CommandList>
            <CommandEmpty>No stack found.</CommandEmpty>
            <CommandGroup>
              {STACKS.map((s) => (
                <CommandItem
                  key={s.value}
                  value={s.value}
                  onSelect={(current) => {
                    setValue(current === value ? '' : current)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', value === s.value ? 'opacity-100' : 'opacity-0')}
                    aria-hidden="true"
                  />
                  {s.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

/* ---------------------------------- Form ---------------------------------- */

const inviteSchema = z.object({ email: z.email() })

export function FormDemo() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof inviteSchema>>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = (values: z.infer<typeof inviteSchema>) => {
    toast({ title: 'Invite sent', description: `${values.email} gets access shortly.` })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[270px] space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invite a teammate</FormLabel>
              <FormControl>
                <Input placeholder="teammate@company.com" {...field} />
              </FormControl>
              <FormDescription>They will thank you. Eventually.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Send invite
        </Button>
      </form>
    </Form>
  )
}

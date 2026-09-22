'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

/**
 * A date picker composed from Popover + Calendar with an
 * outline trigger. The selected date renders as `MMM d, yyyy`; the popover
 * closes on selection.
 */
export function DatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            'data-[empty=true]:text-muted-foreground'
          )}
        >
          <CalendarIcon className="h-4 w-4" aria-hidden="true" />
          {date ? format(date, 'MMM d, yyyy') : <span>Pick a date</span>}
          <ChevronDown
            className="ml-auto h-4 w-4 shrink-0 opacity-50"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
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
  )
}

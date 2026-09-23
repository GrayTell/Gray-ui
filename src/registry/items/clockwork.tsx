'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Clockwork — a dial with a single hand sweeping the full face, ticking
 * away the wait like a second hand.
 */
function Clockwork({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('relative inline-block size-6', className)}
      style={{
        animation: 'gl-clockwork var(--duration, 1.5s) linear infinite',
        ...props.style,
      }}
      {...props}
    >
      <style>{`@keyframes gl-clockwork { to { transform: rotate(360deg); } }`}</style>
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border-2 border-current"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 left-1/2 h-1/2 w-[7%] -translate-x-1/2 rounded-full bg-current"
      />
    </span>
  )
}

export { Clockwork }

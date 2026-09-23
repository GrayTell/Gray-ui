'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Saturn — a soft inner disc ringed by a faster arc that circles just
 * outside it, the way rings circle a planet.
 */
function Saturn({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('relative inline-block size-6', className)}
      style={{
        animation: 'gl-saturn var(--duration, 1.1s) linear infinite',
        ...props.style,
      }}
      {...props}
    >
      <style>{`@keyframes gl-saturn { to { transform: rotate(360deg); } }`}</style>
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border-2 border-current/20"
      />
      <span
        aria-hidden="true"
        className="absolute -inset-[10%] rounded-full border-2 border-transparent border-b-current"
      />
    </span>
  )
}

export { Saturn }

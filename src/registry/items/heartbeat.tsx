'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Heartbeat — one dot, breathing. Scales up softly and settles, over and
 * over, a pulse for single-point status.
 */
function Heartbeat({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('inline-block size-2.5 rounded-full bg-current', className)}
      style={{
        animation: 'gl-heartbeat var(--duration, 1.2s) ease-in-out infinite',
        ...props.style,
      }}
      {...props}
    >
      <style>{`@keyframes gl-heartbeat { 0%, 100% { transform: scale(1); opacity: 0.85; } 50% { transform: scale(1.4); opacity: 1; } }`}</style>
    </span>
  )
}

export { Heartbeat }

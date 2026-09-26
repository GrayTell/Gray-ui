'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Lemniscate — a spark running laps around a figure-eight forever.
 * `pathLength` normalizes the math so the dash stays predictable.
 */
function Lemniscate({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      role="status"
      aria-label="Loading"
      className={cn('size-8', className)}
      {...props}
    >
      <style>{`@keyframes gl-lemniscate { to { stroke-dashoffset: -100; } }`}</style>
      <path
        d="M25 50c0-14 11-22 25-8 14 14 25 6 25-8s-11-22-25-8c-14 14-25 6-25 8Z"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="62 38"
        style={{
          animation: 'gl-lemniscate var(--duration, 1.8s) linear infinite',
        }}
      />
    </svg>
  )
}

export { Lemniscate }

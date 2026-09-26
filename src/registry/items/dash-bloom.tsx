'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * DashBloom — a stroke that never settles: it stretches around the circle
 * and shrinks again while the whole ring slowly turns.
 */
function DashBloom({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      role="status"
      aria-label="Loading"
      className={cn('size-7', className)}
      style={{
        animation: 'gl-dash-bloom-turn calc(var(--duration, 1.6s) * 1.4) linear infinite',
        ...props.style,
      }}
      {...props}
    >
      <style>{`
        @keyframes gl-dash-bloom-turn { to { transform: rotate(360deg); } }
        @keyframes gl-dash-bloom {
          0% { stroke-dasharray: 30 221; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 160 91; stroke-dashoffset: -60; }
          100% { stroke-dasharray: 30 221; stroke-dashoffset: -251; }
        }
      `}</style>
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
        style={{ animation: 'gl-dash-bloom var(--duration, 1.6s) ease-in-out infinite' }}
      />
    </svg>
  )
}

export { DashBloom }

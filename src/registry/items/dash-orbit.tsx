'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * DashOrbit — a dashed ring whose gap breathes while the whole circle
 * turns, material-style. Length and drift are plain CSS, no script.
 */
function DashOrbit({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="Loading"
      className={cn('size-6', className)}
      style={{
        animation: 'gl-dash-orbit-turn 2s linear infinite',
        ...props.style,
      }}
      {...props}
    >
      <style>{`
        @keyframes gl-dash-orbit-turn { to { transform: rotate(360deg); } }
        @keyframes gl-dash-orbit-dash { to { stroke-dashoffset: -32; } }
      `}</style>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.12" />
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="40 16.4"
        style={{ animation: 'gl-dash-orbit-dash 1.2s linear infinite' }}
      />
    </svg>
  )
}

export { DashOrbit }

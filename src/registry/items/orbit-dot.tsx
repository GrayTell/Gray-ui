'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * OrbitDot — a solid satellite riding the rim of a quiet ring. The ring
 * stays still in spirit while the dot laps it, second after second.
 */
function OrbitDot({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('relative inline-block size-6', className)}
      style={{
        animation: 'gl-orbit-dot var(--duration, 1.4s) linear infinite',
        ...props.style,
      }}
      {...props}
    >
      <style>{`@keyframes gl-orbit-dot { to { transform: rotate(360deg); } }`}</style>
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border-2 border-current/25"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 size-[30%] -translate-x-[28%] -translate-y-[28%] rounded-full bg-current"
      />
    </span>
  )
}

export { OrbitDot }

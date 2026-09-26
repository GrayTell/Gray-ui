'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * TrioOrbit — three dots locked on a spinning rod, sweeping around like a
 * propeller that never gains full speed.
 */
function TrioOrbit({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('relative inline-block size-6', className)}
      style={props.style}
      {...props}
    >
      <style>{`@keyframes gl-trio-orbit { to { transform: rotate(360deg); } }`}</style>
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          animation: 'gl-trio-orbit var(--duration, 1.8s) ease-in-out infinite',
        }}
      >
        {[0, 35, 70].map((left) => (
          <span
            key={left}
            className="absolute top-1/2 size-[30%] -translate-y-1/2 rounded-full bg-current"
            style={{ left: `${left}%` }}
          />
        ))}
      </span>
    </span>
  )
}

export { TrioOrbit }

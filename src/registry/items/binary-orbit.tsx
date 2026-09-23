'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * BinaryOrbit — a calm nucleus with two moons circling on opposite sides
 * of the same track, easing through each lap.
 */
function BinaryOrbit({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('relative inline-block size-6', className)}
      style={props.style}
      {...props}
    >
      <style>{`@keyframes gl-binary-orbit { to { transform: rotate(360deg); } }`}</style>
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current"
      />
      {[0, 1].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            animation: 'gl-binary-orbit var(--duration, 1.5s) ease-in-out infinite',
            animationDelay: `calc(var(--duration, 1.5s) / -2 * ${i})`,
          }}
        >
          <span className="absolute top-0 left-1/2 size-[30%] -translate-x-1/2 -translate-y-[60%] rounded-full bg-current" />
        </span>
      ))}
    </span>
  )
}

export { BinaryOrbit }

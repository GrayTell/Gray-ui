'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Sonar — rings radiating outward and dissolving, two beats out of phase.
 * Reads clearly at small sizes and over busy layouts.
 */
function Sonar({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('relative inline-block size-8', className)}
      style={props.style}
      {...props}
    >
      <style>{`@keyframes gl-sonar { 0% { transform: scale(0.25); opacity: 1; } 100% { transform: scale(1.1); opacity: 0; } }`}</style>
      {[0, 1].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute inset-0 rounded-full border-2 border-current"
          style={{
            animation: 'gl-sonar var(--duration, 1.7s) cubic-bezier(0.2, 0.6, 0.4, 1) infinite',
            animationDelay: `calc(var(--duration, 1.7s) / -2 * ${i})`,
          }}
        />
      ))}
    </span>
  )
}

export { Sonar }

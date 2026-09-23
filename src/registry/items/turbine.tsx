'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Turbine — eight blades around an empty hub, spinning like a fan.
 * Blade thickness follows the stroke width.
 */
function Turbine({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="Loading"
      className={cn('size-6', className)}
      style={{
        animation: 'gl-turbine var(--duration, 1.1s) linear infinite',
        ...props.style,
      }}
      {...props}
    >
      <style>{`@keyframes gl-turbine { to { transform: rotate(360deg); } }`}</style>
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4M5.3 5.3l2.8 2.8M15.9 15.9l2.8 2.8M18.7 5.3l-2.8 2.8M8.1 15.9l-2.8 2.8" />
      </g>
    </svg>
  )
}

export { Turbine }

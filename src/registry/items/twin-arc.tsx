'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * TwinArc — two opposite arcs sharing one orbit. Vertical borders carry the
 * color, everything else stays transparent, so the pair reads as a single
 * rotating gesture.
 */
function TwinArc({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'size-6 rounded-full border-4 border-transparent border-y-current',
        className,
      )}
      style={{
        animation: 'gl-twin-arc var(--duration, 1s) linear infinite',
        ...props.style,
      }}
      {...props}
    >
      <style>{`@keyframes gl-twin-arc { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export { TwinArc }

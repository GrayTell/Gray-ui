'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * ArcSweep — a bold single arc carved out of a faint full circle.
 * Thickness is controlled with `border-[Npx]`, pace with `--duration`.
 */
function ArcSweep({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'size-6 rounded-full border-4 border-current/15 border-t-current',
        className,
      )}
      style={{
        animation: 'gl-arc-sweep var(--duration, 0.8s) linear infinite',
        ...props.style,
      }}
      {...props}
    >
      <style>{`@keyframes gl-arc-sweep { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export { ArcSweep }

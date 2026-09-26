'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * FanBlade — one quarter of a ring sweeping in circles, like a blade
 * catching the light. Change the sweep by coloring more or fewer borders.
 */
function FanBlade({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'size-6 rounded-full border-[3px] border-transparent border-t-current border-r-current/40',
        className,
      )}
      style={{
        animation: 'gl-fan-blade var(--duration, 0.9s) linear infinite',
        ...props.style,
      }}
      {...props}
    >
      <style>{`@keyframes gl-fan-blade { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export { FanBlade }

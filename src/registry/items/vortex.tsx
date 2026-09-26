'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Vortex — dots swirling on an invisible ring, blooming in and out of
 * existence as they pass an unseen wind.
 */
function Vortex({
  className,
  count = 8,
  ...props
}: React.ComponentProps<'span'> & { count?: number }) {
  const dots = Math.max(4, Math.floor(count))
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('relative inline-block size-7', className)}
      style={props.style}
      {...props}
    >
      <style>{`@keyframes gl-vortex { 0%, 100% { transform: scale(0); opacity: 0; } 50% { transform: scale(1); opacity: 1; } }`}</style>
      {Array.from({ length: dots }, (_, i) => {
        const angle = (i / dots) * 360
        return (
          <span
            key={i}
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 block size-[22%] rounded-full bg-current"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-160%)`,
              animation: 'gl-vortex var(--duration, 1.6s) ease-in-out infinite',
              animationDelay: `calc(var(--duration, 1.6s) / ${dots} * ${i})`,
            }}
          />
        )
      })}
    </span>
  )
}

export { Vortex }

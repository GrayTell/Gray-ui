'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * ShootingStar — a bright head with a tail of fading sparks, lapping a
 * circular orbit. The trail is baked into the rotation.
 */
function ShootingStar({
  className,
  sparks = 5,
  ...props
}: React.ComponentProps<'span'> & { sparks?: number }) {
  const trail = Math.max(3, Math.min(8, Math.floor(sparks)))
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('relative inline-block size-7', className)}
      style={{
        animation: 'gl-shooting-star var(--duration, 1.3s) linear infinite',
        ...props.style,
      }}
      {...props}
    >
      <style>{`@keyframes gl-shooting-star { to { transform: rotate(360deg); } }`}</style>
      {Array.from({ length: trail }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute top-0 left-1/2 block size-[22%] -translate-x-1/2 rounded-full bg-current"
          style={{
            opacity: 1 - i * (0.85 / trail),
            transform: `translateX(-50%) rotate(${-i * (360 / trail / 2.6)}deg) translateY(-160%)`,
          }}
        />
      ))}
    </span>
  )
}

export { ShootingStar }

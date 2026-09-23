'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * DotHalo — a crown of dots around an empty centre, brightening one after
 * another so the light travels around the circle.
 */
function DotHalo({
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
      <style>{`@keyframes gl-dot-halo { 0%, 100% { opacity: 0.25; transform: rotate(var(--a)) scale(0.65); } 50% { opacity: 1; transform: rotate(var(--a)) scale(1); } }`}</style>
      {Array.from({ length: dots }, (_, i) => {
        const angle = `${(i / dots) * 360}deg`
        return (
          <span
            key={i}
            aria-hidden="true"
            className="absolute inset-0"
            style={{ transform: `rotate(${angle})` }}
          >
            <span
              className="absolute top-0 left-1/2 ml-[-12.5%] block h-[25%] w-[25%] rounded-full bg-current"
              style={{
                ['--a' as string]: angle,
                animation: 'gl-dot-halo var(--duration, 1.2s) linear infinite',
                animationDelay: `calc(var(--duration, 1.2s) / ${dots} * ${i - dots})`,
              }}
            />
          </span>
        )
      })}
    </span>
  )
}

export { DotHalo }

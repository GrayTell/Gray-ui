'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * SoftPulse — an outlined circle that inhales and exhales, dimming as it
 * swells. Suited to live indicators and quiet waiting states.
 */
function SoftPulse({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('relative inline-block size-7', className)}
      style={props.style}
      {...props}
    >
      <style>{`@keyframes gl-soft-pulse { 0%, 100% { transform: scale(0.9); opacity: 0.75; } 50% { transform: scale(1.08); opacity: 0.3; } }`}</style>
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border-2 border-current"
        style={{
          animation: 'gl-soft-pulse var(--duration, 1.6s) ease-in-out infinite',
        }}
      />
    </span>
  )
}

export { SoftPulse }

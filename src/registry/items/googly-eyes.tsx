'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * GooglyEyes — two eyes whose pupils wander around and occasionally blink.
 * Pure background-position and scaleY tricks, no timers attached.
 */
function GooglyEyes({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('inline-flex items-center gap-[0.35em] text-4xl', className)}
      {...props}
    >
      <style>{`
        @keyframes gl-eye-wander {
          0%, 12% { transform: translate(0, 0); }
          20%, 38% { transform: translate(-26%, 4%); }
          46%, 64% { transform: translate(26%, -4%); }
          72%, 88% { transform: translate(0, 22%); }
          96%, 100% { transform: translate(0, 0); }
        }
        @keyframes gl-eye-blink {
          0%, 90%, 100% { transform: scaleY(1); }
          93% { transform: scaleY(0.1); }
          96% { transform: scaleY(1); }
        }
      `}</style>
      {[0, 1].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className="relative inline-block size-[1em] rounded-full bg-current/10"
          style={{
            animation: 'gl-eye-blink var(--duration, 6s) ease-in-out infinite',
          }}
        >
          <span
            className="absolute top-1/2 left-1/2 size-[42%] rounded-full bg-current"
            style={{
              transform: 'translate(-50%, -50%)',
              animation: 'gl-eye-wander var(--duration, 6s) ease-in-out infinite',
            }}
          />
        </span>
      ))}
    </span>
  )
}

export { GooglyEyes }

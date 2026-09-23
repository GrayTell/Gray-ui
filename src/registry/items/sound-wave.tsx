'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * SoundWave — five rounded bars of varying height swaying in sequence,
 * the classic voice-active silhouette.
 */
function SoundWave({ className, ...props }: React.ComponentProps<'span'>) {
  const heights = ['40%', '65%', '100%', '65%', '40%']
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('inline-flex h-[1em] items-center gap-[0.14em] text-2xl', className)}
      {...props}
    >
      <style>{`@keyframes gl-sound-wave { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.55); } }`}</style>
      {heights.map((height, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block w-[0.13em] rounded-full bg-current"
          style={{
            height,
            animation: 'gl-sound-wave var(--duration, 1s) ease-in-out infinite',
            animationDelay: `calc(var(--delay, 0.1s) * ${i})`,
          }}
        />
      ))}
    </span>
  )
}

export { SoundWave }

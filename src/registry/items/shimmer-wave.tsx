'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * ShimmerWave — brightness ripples through the text character by
 * character, each one lifting slightly as the light passes.
 */
function ShimmerWave({
  className,
  children,
  ...props
}: React.ComponentProps<'span'> & { children: React.ReactNode }) {
  const text = typeof children === 'string' ? children : ''
  return (
    <span
      role="status"
      className={cn('inline-block', className)}
      {...props}
    >
      <style>{`@keyframes gl-shimmer-wave { 0%, 100% { opacity: 0.4; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-0.1em); } }`}</style>
      {text.split('').map((char, i) => (
        <span
          key={i}
          aria-hidden={char === ' ' ? undefined : true}
          className="inline-block whitespace-pre"
          style={{
            animation: 'gl-shimmer-wave var(--duration, 1.6s) ease-in-out infinite',
            animationDelay: `calc(var(--duration, 1.6s) / ${Math.max(1, text.length)} * ${i})`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

export { ShimmerWave }

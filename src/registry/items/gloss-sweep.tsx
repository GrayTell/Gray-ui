'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * GlossSweep — a band of full brightness sliding across otherwise muted
 * text. The highlight is a moving mask, so theming stays untouched.
 */
function GlossSweep({
  className,
  children,
  ...props
}: React.ComponentProps<'span'> & { children: React.ReactNode }) {
  const text = typeof children === 'string' ? children : ''
  return (
    <span
      role="status"
      className={cn('relative inline-block', className)}
      style={{ color: 'color-mix(in oklab, currentColor 32%, transparent)', ...props.style }}
      {...props}
    >
      <style>{`
        @keyframes gl-gloss-sweep {
          from { -webkit-mask-position: 200% 0; mask-position: 200% 0; }
          to { -webkit-mask-position: -200% 0; mask-position: -200% 0; }
        }
      `}</style>
      {text}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-current"
        style={{
          color: 'inherit',
          WebkitMaskImage:
            'linear-gradient(100deg, transparent 40%, black 50%, transparent 60%)',
          maskImage:
            'linear-gradient(100deg, transparent 40%, black 50%, transparent 60%)',
          WebkitMaskSize: '250% 100%',
          maskSize: '250% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          animation: 'gl-gloss-sweep var(--duration, 2.2s) linear infinite',
        }}
      >
        {text}
      </span>
    </span>
  )
}

export { GlossSweep }

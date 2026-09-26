'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * PromptCaret — a shell prompt with a hard-blinking block cursor.
 * Swap the prompt glyph to match your CLI voice.
 */
function PromptCaret({
  className,
  prompt = '$',
  ...props
}: React.ComponentProps<'span'> & { prompt?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('inline-flex items-center gap-[0.3em] font-mono text-xl', className)}
      {...props}
    >
      <style>{`@keyframes gl-prompt-caret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }`}</style>
      <span aria-hidden="true">{prompt}</span>
      <span
        aria-hidden="true"
        className="inline-block h-[1.05em] w-[0.55em] bg-current"
        style={{
          animation: 'gl-prompt-caret var(--duration, 1.1s) step-end infinite',
        }}
      />
    </span>
  )
}

export { PromptCaret }

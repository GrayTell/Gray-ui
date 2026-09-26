'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * ChatTyping — the familiar "someone is typing" bounce for message
 * threads and comment feeds. Dots hop in quick succession.
 */
function ChatTyping({
  className,
  count = 3,
  ...props
}: React.ComponentProps<'span'> & { count?: number }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('inline-flex items-end gap-[0.22em] text-xl', className)}
      {...props}
    >
      <style>{`@keyframes gl-chat-typing { 0%, 100% { transform: translateY(0); opacity: 0.55; } 50% { transform: translateY(-0.45em); opacity: 1; } }`}</style>
      {Array.from({ length: Math.max(1, count) }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="size-[0.3em] rounded-full bg-current"
          style={{
            animation: 'gl-chat-typing var(--duration, 0.9s) ease-in-out infinite',
            animationDelay: `calc(var(--delay, 0.15s) * ${i})`,
          }}
        />
      ))}
    </span>
  )
}

export { ChatTyping }

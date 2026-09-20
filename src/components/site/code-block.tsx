'use client'

import * as React from 'react'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  /** The code / command to display */
  code: string
  /** Optional filename label shown in the header */
  filename?: string
  /** Optional leading prompt character (e.g. "$") */
  prompt?: boolean
  className?: string
  'aria-label'?: string
}

export function CodeBlock({
  code,
  filename,
  prompt = false,
  className,
  'aria-label': ariaLabel,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable — no-op
    }
  }

  return (
    <div
      className={
        'group/code relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 dark:border-zinc-800 ' +
        (className ?? '')
      }
      aria-label={ariaLabel}
    >
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
        <span className="font-mono text-xs text-zinc-400 select-none">
          {filename ?? (prompt ? 'terminal' : 'bash')}
        </span>
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-[13px] leading-relaxed text-zinc-100">
          <code>
            {prompt && (
              <span className="mr-2 select-none text-zinc-500" aria-hidden="true">
                $
              </span>
            )}
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
}

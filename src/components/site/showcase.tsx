'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { PieChart, Send } from 'lucide-react'

import { ClaimableBalance } from '@/registry/items/claimable-balance'
import { ContributionChart } from '@/registry/items/contribution-chart'
import { DividendCard } from '@/registry/items/dividend'
import { PaymentsCard } from '@/registry/items/payments'
import { SavingsTargets } from '@/registry/items/savings-targets'
import { SettingsNav } from '@/registry/items/settings-nav'

/* --------------------------------- AI chat --------------------------------- */

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

function AiChatCard() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    const next: ChatMessage[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = (await res.json()) as { reply?: string; error?: string }
      if (!res.ok || !data.reply) throw new Error(data.error || 'Request failed')
      setMessages([...next, { role: 'assistant', content: data.reply }])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted">
          <PieChart className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight">Gray AI</p>
          <p className="text-xs text-muted-foreground">Powered by real inference — ask away</p>
        </div>
      </div>

      <div
        ref={listRef}
        className="flex min-h-[220px] max-h-64 flex-1 flex-col gap-3 overflow-y-auto pr-1 [scrollbar-width:thin]"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted">
              <PieChart className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            </div>
            <p className="mt-4 text-lg font-semibold tracking-tight">Morning, builder!</p>
            <p className="mt-1.5 max-w-[220px] text-sm leading-relaxed text-muted-foreground">
              What are we working on today? Send a message to start a conversation.
            </p>
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={
                'max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ' +
                (m.role === 'user'
                  ? 'self-end rounded-br-sm bg-primary text-primary-foreground'
                  : 'self-start rounded-bl-sm bg-muted text-foreground')
              }
            >
              {m.content}
            </div>
          ))
        )}
        {loading && (
          <div className="self-start rounded-xl rounded-bl-sm bg-muted px-3.5 py-2.5" aria-label="Gray AI is thinking">
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
            </span>
          </div>
        )}
        {error && (
          <p className="self-start max-w-[85%] rounded-xl bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </p>
        )}
      </div>

      <div className="mt-4 rounded-lg bg-muted p-3">
        <label htmlFor="chat-input" className="sr-only">
          Type your message
        </label>
        <textarea
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              void send()
            }
          }}
          rows={2}
          className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          placeholder="Ask Gray AI anything..."
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">Enter to send · Shift+Enter for newline</span>
          <button
            type="button"
            onClick={() => void send()}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------- Section --------------------------------- */

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
}

export function Showcase() {
  return (
    <section
      id="showcase"
      className="relative scroll-mt-14 px-4 pb-0"
      aria-labelledby="showcase-heading"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="mx-auto max-w-7xl"
      >
        <motion.div variants={item} className="mx-auto max-w-2xl pb-12 text-center">
          <p className="text-sm text-muted-foreground">In production, everywhere</p>
          <h2
            id="showcase-heading"
            className="mt-2 text-balance text-3xl font-bold tracking-tighter sm:text-4xl"
          >
            Components that actually work
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Every block below is live — click the nav, drag the sliders, expand the settings, chat
            with the AI. Copy the pattern, not the pixels.
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="columns-1 gap-4 pb-24 md:columns-2 lg:columns-3 [&>*]:mb-4"
        >
          <div className="break-inside-avoid">
            <SettingsNav />
          </div>
          <div className="break-inside-avoid">
            <ClaimableBalance />
          </div>
          <div id="chat-demo" className="break-inside-avoid scroll-mt-20">
            <AiChatCard />
          </div>
          <div className="break-inside-avoid">
            <ContributionChart />
          </div>
          <div className="break-inside-avoid">
            <SavingsTargets />
          </div>
          <div className="break-inside-avoid">
            <DividendCard />
          </div>
          <div className="break-inside-avoid">
            <PaymentsCard />
          </div>
        </motion.div>
      </motion.div>

      {/* Fade-out mask, like the real site */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-background/80 to-background"
      />
    </section>
  )
}

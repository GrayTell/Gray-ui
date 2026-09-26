"use client";

import * as React from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { AgentMessage } from "@/components/ai-elements/agent-message";

/**
 * AgentMessageScroller — an agent conversation that plays itself.
 *
 * Cycles a scripted exchange: user message → thinking dots → assistant reply,
 * scrolling as it goes, with edge fades and a jump-to-latest control. When the
 * script ends it holds, then restarts. Human scroll pauses the autoplay.
 */

export type AgentScriptTurn = {
  from: "user" | "assistant";
  text: string;
  /** Pause before this turn appears. */
  delayMs?: number;
};

export type AgentMessageScrollerProps = React.ComponentProps<"div"> & {
  turns: AgentScriptTurn[];
  /** Time a turn stays on stage before the next one lands. */
  turnMs?: number;
  /** Autoplay on mount (default true). */
  autoPlay?: boolean;
};

export function AgentMessageScroller({
  turns,
  turnMs = 2100,
  autoPlay = true,
  className,
  ...props
}: AgentMessageScrollerProps) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = React.useState(reduced ? turns.length : 0);
  const [paused, setPaused] = React.useState(false);
  const viewportRef = React.useRef<HTMLDivElement>(null);

  const finished = visible >= turns.length;

  React.useEffect(() => {
    if (reduced || paused || !autoPlay) return;
    if (finished) {
      const restart = setTimeout(() => setVisible(0), 4200);
      return () => clearTimeout(restart);
    }
    const timer = setTimeout(() => setVisible((v) => v + 1), turnMs);
    return () => clearTimeout(timer);
  }, [autoPlay, finished, paused, reduced, turnMs, visible]);

  // Keep the latest turn in view while playing.
  React.useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || reduced) return;
    viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
  }, [visible, reduced]);

  return (
    <div
      data-slot="agent-message-scroller"
      className={cn("relative overflow-hidden rounded-xl border bg-background shadow-xs", className)}
      {...props}
    >
      <div
        ref={viewportRef}
        onWheel={() => setPaused(true)}
        onTouchStart={() => setPaused(true)}
        className="flex h-72 flex-col gap-3 overflow-y-auto p-4 [scrollbar-width:thin]"
        aria-label="Agent conversation preview"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          {turns.slice(0, visible).map((turn, index) => (
            <AgentMessage key={`${turn.from}-${index}`} from={turn.from}>
              {turn.text}
            </AgentMessage>
          ))}
        </AnimatePresence>
        {!finished && !paused && !reduced && (
          <motion.div
            key="thinking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 px-1 py-1"
            aria-label="Agent is thinking"
          >
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
                style={{ animationDelay: `${dot * 150}ms` }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Edge fades + jump to latest */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background to-transparent" />
      {paused && !finished && (
        <button
          type="button"
          onClick={() => {
            setPaused(false);
            setVisible(turns.length);
          }}
          className="absolute bottom-4 right-4 flex size-8 items-center justify-center rounded-full border bg-background shadow-md transition-transform hover:scale-105"
          aria-label="Skip to latest message"
        >
          <ArrowDownIcon className="size-4" />
        </button>
      )}
    </div>
  );
}

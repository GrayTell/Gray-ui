"use client";

import * as React from "react";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * AgentMessage — one message landing in an agent conversation.
 *
 * Slides up + fades in with a spring; assistant messages carry a small glyph,
 * user messages align right with an inverted plate. Pure entrance animation —
 * compose a list of these yourself or use AgentMessageScroller for autoplay.
 */

export type AgentMessageProps = React.ComponentProps<"div"> & {
  from: "user" | "assistant";
  children: React.ReactNode;
  /** Delay before the entrance plays. */
  delay?: number;
};

export function AgentMessage({
  from,
  children,
  delay = 0,
  className,
  ...props
}: AgentMessageProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      data-slot="agent-message"
      data-from={from}
      initial={reduced ? false : { opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: reduced ? 0 : delay,
        type: "spring",
        stiffness: 320,
        damping: 26,
      }}
      className={cn(
        "flex w-full flex-col",
        from === "user" ? "items-end" : "items-start",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          from === "user"
            ? "bg-foreground text-background"
            : "border bg-background text-foreground"
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}

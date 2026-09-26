"use client";

import * as React from "react";

import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * AgentStreamingText — a reply arriving one word at a time.
 *
 * Splits `text` on whitespace and reveals a word every `wordMs` with a
 * blinking caret on the newest word. When nothing is left the caret parks
 * at the end for a beat, then reports `onDone`.
 */

export type AgentStreamingTextProps = React.ComponentProps<"p"> & {
  text: string;
  /** Delay between words in milliseconds. */
  wordMs?: number;
  /** Autoplay on mount (default true). */
  autoPlay?: boolean;
  /** Called once the last word has landed. */
  onDone?: () => void;
  /** Show the trailing caret while streaming (default true). */
  caret?: boolean;
};

export function AgentStreamingText({
  text,
  wordMs = 16,
  autoPlay = true,
  onDone,
  caret = true,
  className,
  ...props
}: AgentStreamingTextProps) {
  const reduced = useReducedMotion();
  const words = React.useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const [visible, setVisible] = React.useState(
    reduced ? words.length : autoPlay ? 0 : words.length
  );

  React.useEffect(() => {
    setVisible(reduced ? words.length : 0);
  }, [text, reduced, words.length]);

  React.useEffect(() => {
    if (reduced) {
      onDone?.();
      return;
    }
    if (!autoPlay) return;
    if (visible >= words.length) {
      onDone?.();
      return;
    }
    const timer = setTimeout(() => setVisible((v) => v + 1), wordMs);
    return () => clearTimeout(timer);
  }, [autoPlay, reduced, visible, words.length, wordMs, onDone]);

  const streaming = visible < words.length;

  return (
    <p
      data-slot="agent-streaming-text"
      className={cn("text-foreground leading-relaxed", className)}
      aria-label={text}
      {...props}
    >
      {words.slice(0, visible).map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          {word}
          {index < visible - 1 ? " " : ""}
        </React.Fragment>
      ))}
      {caret && (streaming || reduced === false) && (
        <span
          aria-hidden="true"
          className={cn(
            "ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-foreground align-middle",
            streaming ? "animate-pulse" : "opacity-0 transition-opacity delay-1000"
          )}
        />
      )}
      <span className="sr-only">{streaming ? "Streaming…" : ""}</span>
    </p>
  );
}

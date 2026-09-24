"use client";

import * as React from "react";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * AgentInlineCitations — a claim with its sources attached.
 *
 * The sentence streams in first, then citation pills pop in one by one,
 * each mapping to an entry in `sources`. Pills are buttons so the host can
 * wire them to previews or footnotes.
 */

export type AgentCitationSource = {
  id: string;
  title: string;
  url?: string;
};

export type AgentInlineCitationsProps = React.ComponentProps<"div"> & {
  text: string;
  sources: AgentCitationSource[];
  /** Words revealed per tick while streaming. */
  wordMs?: number;
  /** Autoplay on mount (default true). */
  autoPlay?: boolean;
};

export function AgentInlineCitations({
  text,
  sources,
  wordMs = 18,
  autoPlay = true,
  className,
  ...props
}: AgentInlineCitationsProps) {
  const reduced = useReducedMotion();
  const words = React.useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const [visibleWords, setVisibleWords] = React.useState(
    reduced ? words.length : 0
  );
  const [cited, setCited] = React.useState(reduced ? sources.length : 0);

  const streaming = visibleWords < words.length;

  React.useEffect(() => {
    if (reduced) {
      setVisibleWords(words.length);
      setCited(sources.length);
      return;
    }
    if (!autoPlay) return;
    if (streaming) {
      const timer = setTimeout(
        () => setVisibleWords((v) => v + 1),
        wordMs
      );
      return () => clearTimeout(timer);
    }
    if (cited < sources.length) {
      const timer = setTimeout(() => setCited((c) => c + 1), 420);
      return () => clearTimeout(timer);
    }
  }, [
    autoPlay, cited, reduced, sources.length, streaming, visibleWords, wordMs, words.length,
  ]);

  return (
    <div
      data-slot="agent-inline-citations"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    >
      <p className="text-foreground text-sm leading-relaxed">
        {words.slice(0, visibleWords).join(" ")}
        {streaming && (
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-foreground align-middle"
          />
        )}
      </p>
      <div className="flex flex-wrap gap-1.5" role="list" aria-label="Sources">
        {sources.slice(0, reduced ? sources.length : cited).map((source) => (
          <motion.a
            key={source.id}
            role="listitem"
            href={source.url ?? "#"}
            onClick={(event) => !source.url && event.preventDefault()}
            initial={reduced ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="inline-flex items-center gap-1 rounded-full border bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="font-mono text-[10px] text-foreground">
              {source.id}
            </span>
            {source.title}
          </motion.a>
        ))}
      </div>
    </div>
  );
}

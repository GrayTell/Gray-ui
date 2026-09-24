"use client";

import * as React from "react";

import { useReducedMotion } from "framer-motion";
import { TerminalIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * AgentCodeReveal — code an agent is writing, landing a line at a time.
 *
 * Each entry in `lines` appears after `lineMs`; the newest line carries the
 * blinking caret. A slim terminal-style header anchors the block.
 */

export type AgentCodeRevealProps = React.ComponentProps<"div"> & {
  filename?: string;
  lines: string[];
  /** Delay between revealed lines. */
  lineMs?: number;
  /** Autoplay on mount (default true). */
  autoPlay?: boolean;
};

export function AgentCodeReveal({
  filename = "agent.ts",
  lines,
  lineMs = 260,
  autoPlay = true,
  className,
  ...props
}: AgentCodeRevealProps) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = React.useState(reduced ? lines.length : 0);

  React.useEffect(() => {
    if (reduced) {
      setVisible(lines.length);
      return;
    }
    if (!autoPlay) return;
    if (visible >= lines.length) return;
    const timer = setTimeout(() => setVisible((v) => v + 1), lineMs);
    return () => clearTimeout(timer);
  }, [autoPlay, lineMs, lines.length, reduced, visible]);

  const streaming = visible < lines.length;

  return (
    <div
      data-slot="agent-code-reveal"
      className={cn("overflow-hidden rounded-xl border bg-background shadow-xs", className)}
      {...props}
    >
      <div className="flex items-center gap-2 border-b bg-secondary/50 px-4 py-2.5 font-mono text-xs text-muted-foreground">
        <TerminalIcon className="size-3.5" />
        {filename}
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-foreground/85">
        <code>
          {lines.slice(0, visible).map((line, index) => (
            <React.Fragment key={`${line}-${index}`}>
              <span className="mr-3 inline-block w-4 select-none text-right text-muted-foreground/50 tabular-nums">
                {index + 1}
              </span>
              <span className="whitespace-pre">{line}</span>
              {"\n"}
            </React.Fragment>
          ))}
          {streaming && (
            <span
              aria-hidden="true"
              className="ml-7 inline-block h-[1em] w-[2px] translate-y-[0.2em] animate-pulse bg-foreground"
            />
          )}
        </code>
      </pre>
    </div>
  );
}

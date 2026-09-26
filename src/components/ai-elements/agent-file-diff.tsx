"use client";

import * as React from "react";

import { useReducedMotion } from "framer-motion";
import { FileCodeIcon, MinusIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * AgentFileDiff — the changes an agent proposes to a file, revealed live.
 *
 * Lines appear one by one (`lineMs` apart): context lines first-class, removals
 * and additions get monochrome tints (inverted for deleted, subtle wash for
 * added) with old/new gutter numbering.
 */

export type AgentDiffLine = {
  kind: "context" | "add" | "del";
  text: string;
  /** Old-file line number (context/del). */
  oldNo?: number;
  /** New-file line number (context/add). */
  newNo?: number;
};

export type AgentFileDiffProps = React.ComponentProps<"div"> & {
  path: string;
  lines: AgentDiffLine[];
  /** Delay between revealed lines. */
  lineMs?: number;
  /** Autoplay on mount (default true). */
  autoPlay?: boolean;
};

export function AgentFileDiff({
  path,
  lines,
  lineMs = 220,
  autoPlay = true,
  className,
  ...props
}: AgentFileDiffProps) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = React.useState(reduced ? lines.length : 0);
  const additions = lines.filter((l) => l.kind === "add").length;
  const deletions = lines.filter((l) => l.kind === "del").length;

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

  return (
    <div
      data-slot="agent-file-diff"
      className={cn("overflow-hidden rounded-xl border bg-background shadow-xs", className)}
      {...props}
    >
      <div className="flex items-center justify-between border-b bg-secondary/50 px-4 py-2.5">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <FileCodeIcon className="size-3.5" />
          {path}
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-foreground">+{additions}</span>
          <span className="text-muted-foreground">−{deletions}</span>
        </div>
      </div>
      <div className="overflow-x-auto py-1 font-mono text-xs leading-6">
        {lines.slice(0, visible).map((line, index) => (
          <div
            key={`${line.text}-${index}`}
            className={cn(
              "flex min-w-max items-center gap-3 px-3",
              line.kind === "add" && "bg-foreground/[0.06]",
              line.kind === "del" && "bg-muted line-through decoration-border/70"
            )}
          >
            <span className="w-6 shrink-0 text-right text-muted-foreground/60 tabular-nums">
              {line.oldNo ?? ""}
            </span>
            <span className="w-6 shrink-0 text-right text-muted-foreground/60 tabular-nums">
              {line.newNo ?? ""}
            </span>
            <span className="w-3 shrink-0 text-muted-foreground" aria-hidden="true">
              {line.kind === "add" ? (
                <PlusIcon className="size-3" />
              ) : line.kind === "del" ? (
                <MinusIcon className="size-3" />
              ) : null}
            </span>
            <code
              className={cn(
                "whitespace-pre",
                line.kind === "del" && "text-muted-foreground",
                line.kind === "context" && "text-foreground/80"
              )}
            >
              {line.text}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}

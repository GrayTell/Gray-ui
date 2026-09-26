"use client";

import * as React from "react";

import { useReducedMotion } from "framer-motion";
import { BrainIcon, SparkleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * AgentReasoningSteps — a model working through a problem before it answers.
 *
 * Stages appear one at a time (each held for `stageMs`), then free-form
 * reasoning lines stream in under the active stage (one per `reasonMs`).
 * Completed stages dim; the active stage carries a pulsing glyph. Fires
 * `onDone` once every stage has settled.
 *
 * Monochrome by design: the only motion signals are opacity, scale and a
 * pulsing sparkle — no color states.
 */

export type AgentReasoningStage = {
  /** Short label for the step the model is taking. */
  title: string;
  /** Free-form reasoning lines revealed while this stage is active. */
  reasoning?: string[];
};

export type AgentReasoningStepsProps = React.ComponentProps<"div"> & {
  stages: AgentReasoningStage[];
  /** How long each stage stays active before advancing. */
  stageMs?: number;
  /** How long after a stage starts its first reasoning line appears. */
  reasonMs?: number;
  /** Autoplay on mount (default true). */
  autoPlay?: boolean;
  /** Called after the final stage settles. */
  onDone?: () => void;
};

export function AgentReasoningSteps({
  stages,
  stageMs = 1750,
  reasonMs = 650,
  autoPlay = true,
  onDone,
  className,
  ...props
}: AgentReasoningStepsProps) {
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = React.useState(0);

  // Global clock: one interval ticks reasonMs; stages advance whenever the
  // elapsed budget for the current stage is exhausted. Reduced motion jumps
  // straight to the finished state.
  React.useEffect(() => {
    if (!autoPlay) return;
    if (reduced) {
      setElapsed(Number.POSITIVE_INFINITY);
      onDone?.();
      return;
    }
    const timer = setInterval(() => setElapsed((t) => t + reasonMs), reasonMs);
    return () => clearInterval(timer);
  }, [autoPlay, reduced, reasonMs, onDone]);

  // How many reasoning lines are visible overall (staggered across stages).
  const linesBeforeStage = (index: number) =>
    stages.slice(0, index).reduce((sum, s) => sum + (s.reasoning?.length ?? 0), 0);
  const totalReasoningLines = linesBeforeStage(stages.length);
  const visibleLines = reduced
    ? totalReasoningLines
    : Math.min(Math.floor(elapsed / 1), totalReasoningLines);

  // Active stage = the one whose reasoning budget is still being consumed.
  let active = 0;
  let consumed = 0;
  for (let i = 0; i < stages.length; i++) {
    const stageHold = Math.max(1, Math.ceil(stageMs / reasonMs));
    const stageLines = stages[i].reasoning?.length ?? 0;
    consumed += Math.max(stageHold, stageLines);
    if (elapsed < consumed) {
      active = i;
      break;
    }
    active = i + 1;
  }
  const done = active >= stages.length;

  React.useEffect(() => {
    if (done) onDone?.();
  }, [done, onDone]);

  // Lines visible per stage: all lines of completed stages, partial for the
  // active one. Pure per-index math — each stage's budget starts where the
  // previous stages' spend ended.
  const stageSpends = stages.map((stage) => {
    const hold = Math.max(1, Math.ceil(stageMs / reasonMs));
    return Math.max(hold, stage.reasoning?.length ?? 0);
  });
  const visiblePerStage = stages.map((stage, index) => {
    const spentBefore = stageSpends
      .slice(0, index)
      .reduce((sum, spend) => sum + spend, 0);
    return Math.min(
      stage.reasoning?.length ?? 0,
      Math.max(0, elapsed - spentBefore)
    );
  });

  return (
    <div
      data-slot="agent-reasoning-steps"
      className={cn("flex flex-col gap-3 text-sm", className)}
      role="status"
      aria-label="Agent reasoning"
      {...props}
    >
      {stages.map((stage, index) => {
        const isActive = index === active && !done;
        const isDone = index < active || done;
        return (
          <div key={stage.title} className="flex flex-col gap-1.5">
            <div
              className={cn(
                "flex items-center gap-2 transition-opacity duration-500",
                isDone && "text-muted-foreground",
                isActive && "text-foreground",
                !isDone && !isActive && "text-muted-foreground/50"
              )}
            >
              {isActive ? (
                <SparkleIcon className="size-3.5 shrink-0 animate-pulse" />
              ) : (
                <BrainIcon
                  className={cn("size-3.5 shrink-0", isDone && "opacity-50")}
                />
              )}
              <span className="font-medium">{stage.title}</span>
            </div>
            {stage.reasoning?.slice(0, visiblePerStage[index]).map((line) => (
              <p
                key={line}
                className="text-muted-foreground pl-[22px] leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        );
      })}
      {/* Keep the component height stable-ish while lines stream in. */}
      <span className="sr-only">
        {visibleLines} of {totalReasoningLines} reasoning lines
      </span>
    </div>
  );
}

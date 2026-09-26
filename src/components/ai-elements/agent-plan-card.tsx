"use client";

import * as React from "react";

import { motion, useReducedMotion } from "framer-motion";
import { ClipboardListIcon, DownloadIcon, PlayIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * AgentPlanCard — the plan an agent proposes before running it.
 *
 * A titled card with a summary and an embedded to-do list; items stagger in,
 * then the footer actions settle. Fully static when reduced motion is on.
 */

export type AgentPlanItem = {
  title: string;
};

export type AgentPlanCardProps = React.ComponentProps<"div"> & {
  title: string;
  description?: string;
  items: AgentPlanItem[];
  /** Called when the Run action is pressed. */
  onRun?: () => void;
};

export function AgentPlanCard({
  title,
  description,
  items,
  onRun,
  className,
  ...props
}: AgentPlanCardProps) {
  const reduced = useReducedMotion();
  const [running, setRunning] = React.useState(false);

  return (
    <div
      data-slot="agent-plan-card"
      className={cn("rounded-xl border bg-background shadow-xs", className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border bg-secondary">
            <ClipboardListIcon className="size-4 text-muted-foreground" />
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold leading-none">{title}</h3>
            {description ? (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="Export plan">
            <DownloadIcon className="size-4" />
          </Button>
        </div>
      </div>

      <div className="mx-4 mb-3 rounded-lg border bg-secondary/50 p-3">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ClipboardListIcon className="size-3.5" />
            To-dos
          </span>
          <span className="font-mono">{items.length}</span>
        </div>
        <ul className="flex flex-col gap-1.5">
          {items.map((item, index) => (
            <motion.li
              key={item.title}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reduced ? 0 : 0.15 + index * 0.12,
                duration: 0.3,
                ease: "easeOut",
              }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span className="size-3.5 shrink-0 rounded-full border" aria-hidden="true" />
              {item.title}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
        <Button
          size="sm"
          variant={running ? "secondary" : "default"}
          onClick={() => {
            setRunning(true);
            onRun?.();
          }}
          disabled={running}
        >
          <PlayIcon className="size-3.5" />
          {running ? "Plan accepted" : "Run plan"}
        </Button>
      </div>
    </div>
  );
}

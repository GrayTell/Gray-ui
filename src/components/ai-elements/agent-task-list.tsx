"use client";

import * as React from "react";

import { useReducedMotion } from "framer-motion";
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  ListTodoIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * AgentTaskList — a checklist an agent works through on its own.
 *
 * Tasks advance automatically: pending → active (pulsing ring glyph) → done
 * (check, dim + strikethrough). A header shows the running count. The whole
 * list settles when the last task completes.
 */

export type AgentTask = {
  title: string;
};

export type AgentTaskListProps = React.ComponentProps<"div"> & {
  tasks: AgentTask[];
  /** Time spent on each task before checking it off. */
  taskMs?: number;
  /** Autoplay on mount (default true). */
  autoPlay?: boolean;
  /** Called after the final task completes. */
  onDone?: () => void;
};

export function AgentTaskList({
  tasks,
  taskMs = 1600,
  autoPlay = true,
  onDone,
  className,
  ...props
}: AgentTaskListProps) {
  const reduced = useReducedMotion();
  const [completed, setCompleted] = React.useState(
    reduced ? tasks.length : 0
  );

  React.useEffect(() => {
    if (reduced) {
      setCompleted(tasks.length);
      onDone?.();
      return;
    }
    if (!autoPlay) return;
    if (completed >= tasks.length) {
      onDone?.();
      return;
    }
    const timer = setTimeout(() => setCompleted((c) => c + 1), taskMs);
    return () => clearTimeout(timer);
  }, [autoPlay, completed, reduced, taskMs, tasks.length, onDone]);

  const done = completed >= tasks.length;

  return (
    <div
      data-slot="agent-task-list"
      className={cn(
        "rounded-xl border bg-background shadow-xs",
        className
      )}
      role="status"
      aria-label="Agent task list"
      {...props}
    >
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <ListTodoIcon className="size-4 text-muted-foreground" />
          Tasks
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {done ? tasks.length : completed + 1 > tasks.length ? tasks.length : completed + 1}
          /{tasks.length}
        </span>
      </div>
      <ul className="flex flex-col gap-0.5 p-2">
        {tasks.map((task, index) => {
          const isDone = reduced ? true : index < completed;
          const isActive = !reduced && index === completed && !done;
          return (
            <li
              key={task.title}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-all duration-500",
                isDone && "text-muted-foreground line-through decoration-border",
                isActive && "text-foreground",
                !isDone && !isActive && "text-muted-foreground/60"
              )}
            >
              {isDone ? (
                <CircleCheckIcon className="size-4 shrink-0" />
              ) : isActive ? (
                <CircleDotDashedIcon className="size-4 shrink-0 animate-pulse" />
              ) : (
                <CircleDashedIcon className="size-4 shrink-0" />
              )}
              <span>{task.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

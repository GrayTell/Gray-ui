"use client";

import * as React from "react";

import { motion, useReducedMotion } from "framer-motion";
import { HelpCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * AgentQuestionCard — the agent pausing to ask a human something.
 *
 * The question lands first, options stagger in after, and picking one
 * resolves the card. Works purely as a controlled demo or with an
 * `onAnswer` handler in a real conversation.
 */

export type AgentQuestionOption = {
  label: string;
};

export type AgentQuestionCardProps = React.ComponentProps<"div"> & {
  question: string;
  options: AgentQuestionOption[];
  /** Called with the chosen option label. */
  onAnswer?: (label: string) => void;
};

export function AgentQuestionCard({
  question,
  options,
  onAnswer,
  className,
  ...props
}: AgentQuestionCardProps) {
  const reduced = useReducedMotion();
  const [answered, setAnswered] = React.useState<string | null>(null);

  return (
    <div
      data-slot="agent-question-card"
      className={cn("flex flex-col gap-3 rounded-xl border bg-background p-4 shadow-xs", className)}
      {...props}
    >
      <div className="flex items-start gap-2.5">
        <HelpCircleIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        <p className="text-sm font-medium leading-relaxed">{question}</p>
      </div>
      <div className="flex flex-wrap gap-2 pl-6">
        {options.map((option, index) => {
          const chosen = answered === option.label;
          const dimmed = answered !== null && !chosen;
          return (
            <motion.div
              key={option.label}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: dimmed ? 0.45 : 1, y: 0 }}
              transition={{
                delay: reduced ? 0 : 0.25 + index * 0.14,
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <Button
                type="button"
                size="sm"
                variant={chosen ? "default" : "outline"}
                disabled={answered !== null}
                onClick={() => {
                  setAnswered(option.label);
                  onAnswer?.(option.label);
                }}
              >
                {option.label}
              </Button>
            </motion.div>
          );
        })}
      </div>
      {answered && (
        <p className="text-muted-foreground pl-6 text-xs">
          Noted — continuing with “{answered}”.
        </p>
      )}
    </div>
  );
}

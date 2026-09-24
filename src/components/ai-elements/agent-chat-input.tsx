"use client";

import * as React from "react";

import { useReducedMotion } from "framer-motion";
import { ArrowUpIcon, PaperclipIcon, SlidersHorizontalIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

/**
 * AgentChatInput — the composer an agent conversation deserves.
 *
 * Types a suggested prompt character by character (looping), pulses the send
 * button when the draft is ready, and is fully typable the moment a human
 * focuses it — the demo never fights the user.
 */

export type AgentChatInputProps = React.ComponentProps<"form"> & {
  /** Suggested prompt typed on loop when idle and unfocused. */
  suggestion?: string;
  /** Per-character delay for the typewriter loop. */
  typeMs?: number;
  /** Called with the composed message on submit. */
  onSubmit?: (message: string) => void;
};

export function AgentChatInput({
  suggestion = "Ask the agent anything…",
  typeMs = 45,
  onSubmit,
  className,
  ...props
}: AgentChatInputProps) {
  const reduced = useReducedMotion();
  const [value, setValue] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [typed, setTyped] = React.useState(0);

  const idle = !focused && value.length === 0;

  // Loop the suggestion only while the input is untouched by a human.
  React.useEffect(() => {
    if (reduced || !idle) return;
    if (typed >= suggestion.length) {
      const hold = setTimeout(() => setTyped(0), 2400);
      return () => clearTimeout(hold);
    }
    const timer = setTimeout(() => setTyped((t) => t + 1), typeMs);
    return () => clearTimeout(timer);
  }, [idle, reduced, suggestion, typed, typeMs]);

  const ready = value.trim().length > 0 || typed > 0;

  return (
    <form
      data-slot="agent-chat-input"
      className={cn(
        "flex items-end gap-2 rounded-xl border bg-background p-2 shadow-xs transition-shadow focus-within:ring-2 focus-within:ring-ring",
        className
      )}
      onSubmit={(event) => {
        event.preventDefault();
        const message = value.trim() || suggestion.slice(0, typed);
        if (!message) return;
        onSubmit?.(message);
        setValue("");
        setTyped(0);
      }}
      {...props}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Attach files"
        className="shrink-0 text-muted-foreground"
      >
        <PaperclipIcon className="size-4" />
      </Button>
      <Textarea
        value={idle ? suggestion.slice(0, typed) : value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Ask anything…"
        aria-label="Message the agent"
        rows={1}
        className="max-h-32 min-h-9 resize-none border-0 bg-transparent px-1 py-2 shadow-none focus-visible:ring-0"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Tune agent settings"
        className="shrink-0 text-muted-foreground"
      >
        <SlidersHorizontalIcon className="size-4" />
      </Button>
      <Button
        type="submit"
        size="icon"
        aria-label="Send message"
        disabled={!ready}
        className={cn(
          "shrink-0 transition-transform",
          ready && !reduced && "animate-pulse"
        )}
      >
        <ArrowUpIcon className="size-4" />
      </Button>
    </form>
  );
}

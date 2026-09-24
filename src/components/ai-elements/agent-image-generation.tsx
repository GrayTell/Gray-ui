"use client";

import * as React from "react";

import { motion, useReducedMotion } from "framer-motion";
import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * AgentImageGeneration — an image request running its phases.
 *
 * Progress moves through labelled phases (`phases`), the plate shimmers while
 * busy, then the final artwork fades in. The default artwork is a pure-CSS
 * monochrome halftone gradient so the component ships with zero assets.
 */

export type AgentImageGenerationProps = React.ComponentProps<"div"> & {
  prompt?: string;
  phases?: string[];
  /** Time per phase in milliseconds. */
  phaseMs?: number;
  /** Autoplay on mount (default true). */
  autoPlay?: boolean;
  /** Rendered artwork once generation completes; defaults to a CSS plate. */
  children?: React.ReactNode;
};

export function AgentImageGeneration({
  prompt = "A monochrome halftone landscape",
  phases = ["Queued", "Rendering", "Upscaling", "Done"],
  phaseMs = 1100,
  autoPlay = true,
  children,
  className,
  ...props
}: AgentImageGenerationProps) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = React.useState(reduced ? phases.length - 1 : 0);
  const done = phase >= phases.length - 1;

  React.useEffect(() => {
    if (reduced) return;
    if (!autoPlay) return;
    if (done) return;
    const timer = setTimeout(() => setPhase((p) => p + 1), phaseMs);
    return () => clearTimeout(timer);
  }, [autoPlay, done, phase, phaseMs, phases.length, reduced]);

  const progress = done ? 100 : Math.round((phase / (phases.length - 1)) * 90);

  return (
    <div
      data-slot="agent-image-generation"
      className={cn("overflow-hidden rounded-xl border bg-background shadow-xs", className)}
      {...props}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary/40">
        {/* Halftone CSS plate — original artwork, zero external assets. */}
        <motion.div
          initial={false}
          animate={{ opacity: done ? 1 : 0.25, scale: done ? 1 : 1.02 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 35%, rgba(0,0,0,0.85) 0 2px, transparent 2.5px), radial-gradient(circle at 70% 65%, rgba(0,0,0,0.55) 0 1.5px, transparent 2px)",
            backgroundSize: "14px 14px, 22px 22px",
          }}
        />
        {!done && (
          <div
            aria-hidden="true"
            className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-background/60 to-transparent"
          />
        )}
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md border bg-background/90 px-2 py-1 text-xs text-muted-foreground backdrop-blur">
          <ImageIcon className="size-3.5" />
          {done ? "Generated" : phases[phase]}
        </span>
      </div>
      <div className="flex flex-col gap-2 border-t p-3">
        {prompt ? (
          <p className="truncate text-xs text-muted-foreground" title={prompt}>
            {prompt}
          </p>
        ) : null}
        <div
          className="h-1 w-full overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Image generation progress"
        >
          <motion.div
            className="h-full bg-foreground"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: reduced ? 0 : 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}

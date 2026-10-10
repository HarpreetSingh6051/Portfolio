"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Pause, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface PlayerStage {
  id: string;
  label: string;
  description: string;
}

interface PipelinePlayerProps {
  stages: PlayerStage[];
  /** Small glyph that travels down the pipeline. */
  token?: ReactNode;
  /** Rendered to the right of each stage label. */
  renderAside?: (stage: PlayerStage, index: number) => ReactNode;
  /** Rendered once the run reaches the final stage. */
  renderResult?: () => ReactNode;
  idleHint: string;
  doneHint: string;
  accent?: "cyan" | "violet";
  /** Milliseconds spent on each stage while playing. */
  speed?: number;
}

export function PipelinePlayer({
  stages,
  token,
  renderAside,
  renderResult,
  idleHint,
  doneHint,
  accent = "cyan",
  speed = 700,
}: PipelinePlayerProps) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);

  const lastIndex = stages.length - 1;
  const finished = step >= lastIndex;
  const isRunning = playing && !finished;
  const activeId =
    hovered ?? pinned ?? (step >= 0 ? stages[Math.min(step, lastIndex)].id : null);
  const activeStage = stages.find((stage) => stage.id === activeId) ?? null;

  // Advance the run. The terminal state is derived, so nothing is set here.
  useEffect(() => {
    if (!playing || step >= lastIndex) return;
    const timer = setTimeout(
      () => setStep((value) => Math.min(value + 1, lastIndex)),
      speed
    );
    return () => clearTimeout(timer);
  }, [playing, step, lastIndex, speed]);

  function handlePlay() {
    if (reduceMotion) {
      setPlaying(false);
      setStep(lastIndex);
      return;
    }
    if (playing) {
      setPlaying(false);
      return;
    }
    if (finished || step < 0) setStep(0);
    setPlaying(true);
  }

  function handleReset() {
    setPlaying(false);
    setStep(-1);
    setPinned(null);
    setHovered(null);
  }

  const accentDot = accent === "violet" ? "bg-violet-400" : "bg-cyan-400";
  const accentBorder = accent === "violet" ? "border-violet-400" : "border-cyan-400";
  const accentRing = accent === "violet" ? "border-violet-500/50 bg-violet-500/[0.07]" : "border-cyan-500/50 bg-cyan-500/[0.07]";
  const tokenBg =
    accent === "violet"
      ? "border-violet-400/70 bg-violet-500/20 text-violet-100"
      : "border-cyan-400/70 bg-cyan-500/20 text-cyan-100";

  return (
    <div>
      {/* Controls */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
          Illustrative visualization
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePlay}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors",
              accent === "violet"
                ? "border-violet-500/40 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20"
                : "border-cyan-500/40 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20"
            )}
          >
            {isRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {isRunning ? "Pause" : finished ? "Play again" : "Play"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 text-zinc-400 transition-colors hover:text-zinc-100"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Pipeline */}
      <ol className="space-y-1.5">
        {stages.map((stage, index) => {
          const isActive = stage.id === activeId;
          const isDone = index < step;
          const isTokenRow = index === step;
          return (
            <li key={stage.id} className="flex items-stretch gap-3">
              <div className="relative flex w-6 shrink-0 flex-col items-center">
                {index < lastIndex && (
                  <span
                    className="absolute top-6 bottom-0 w-px bg-zinc-800"
                    aria-hidden="true"
                  />
                )}
                {isTokenRow ? (
                  <motion.span
                    layoutId={`pipeline-token-${accent}`}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    className={cn(
                      "relative z-10 flex h-6 w-6 items-center justify-center rounded-full border",
                      tokenBg
                    )}
                  >
                    {token}
                  </motion.span>
                ) : (
                  <span
                    className={cn(
                      "relative z-10 flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[10px]",
                      isDone
                        ? cn("text-zinc-950", accentDot, accentBorder)
                        : "border-zinc-700 bg-zinc-950 text-zinc-400"
                    )}
                  >
                    {isDone ? <Check className="h-3 w-3" /> : index + 1}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setPinned(pinned === stage.id ? null : stage.id)}
                onMouseEnter={() => setHovered(stage.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(stage.id)}
                onBlur={() => setHovered(null)}
                aria-pressed={pinned === stage.id}
                className={cn(
                  "flex flex-1 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                  isActive
                    ? accentRing
                    : "border-zinc-800 bg-zinc-950/40 hover:border-zinc-700"
                )}
              >
                <span
                  className={cn(
                    "flex-1 text-sm transition-colors",
                    isActive ? "text-zinc-50" : "text-zinc-300"
                  )}
                >
                  {stage.label}
                </span>
                {renderAside?.(stage, index)}
              </button>
            </li>
          );
        })}
      </ol>

      {/* Caption */}
      <div className="mt-5 min-h-[4.5rem] rounded-xl border border-zinc-800/70 bg-zinc-950/50 px-4 py-3">
        <div className="flex items-start gap-3">
          <span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", accentDot)} aria-hidden="true" />
          <p aria-live="polite" className="text-sm leading-snug text-zinc-400">
            {activeStage ? activeStage.description : finished ? doneHint : idleHint}
          </p>
        </div>
        {finished && renderResult && <div className="mt-3">{renderResult()}</div>}
      </div>
    </div>
  );
}

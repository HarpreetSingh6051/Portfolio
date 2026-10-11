"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { PipelineStage } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

interface PipelineDetailProps {
  stages: PipelineStage[];
}

export function PipelineDetail({ stages }: PipelineDetailProps) {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {stages.map((stage, index) => (
        <div key={stage.id} className="relative">
          {/* Connector line */}
          {index < stages.length - 1 && (
            <div className="absolute top-full left-6 h-3 w-px bg-line" />
          )}

          <button
            onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
            className={cn(
              "w-full rounded-lg border p-4 text-left transition-all",
              expandedStage === stage.id
                ? "border-accent/40 bg-accent-soft/50"
                : "border-line bg-paper hover:border-line-strong"
            )}
            aria-expanded={expandedStage === stage.id}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink">{stage.label}</p>
                {expandedStage === stage.id && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 text-sm leading-relaxed text-body"
                  >
                    {stage.description}
                  </motion.p>
                )}
              </div>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}
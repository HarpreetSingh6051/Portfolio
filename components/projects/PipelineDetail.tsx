"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { PipelineStage } from "@/lib/types";

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
            <div className="absolute top-full left-6 h-3 w-px bg-zinc-700" />
          )}

          <button
            onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
            className={`w-full rounded-lg border p-4 text-left transition-all ${
              expandedStage === stage.id
                ? "border-cyan-500/50 bg-cyan-500/5"
                : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600"
            }`}
            aria-expanded={expandedStage === stage.id}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-sm font-bold text-cyan-400">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-200">{stage.label}</p>
                {expandedStage === stage.id && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 text-sm leading-relaxed text-zinc-400"
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

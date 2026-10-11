"use client";

import { Scan } from "lucide-react";
import { PipelinePlayer } from "@/components/projects/PipelinePlayer";
import type { PlayerStage } from "@/components/projects/PipelinePlayer";

const stages: PlayerStage[] = [
  {
    id: "streams",
    label: "Camera streams",
    description:
      "Frames arrive from many cameras at once — the production system processes 20 concurrent streams.",
  },
  {
    id: "detection",
    label: "YOLOv8 detection",
    description: "YOLOv8 locates objects of interest inside each incoming frame.",
  },
  {
    id: "embeddings",
    label: "InsightFace embeddings",
    description: "Detected faces are turned into embeddings that can be compared.",
  },
  {
    id: "matching",
    label: "Matching / output",
    description: "Embeddings are matched against known identities and results are surfaced.",
  },
];

const cameras = ["CAM 01", "CAM 02", "CAM 03"];

export function VisionExperience() {
  return (
    <div className="rounded-2xl p-5 sm:p-6">
      {/* Abstract camera streams */}
      <div className="mb-5 grid grid-cols-3 gap-2">
        {cameras.map((camera) => (
          <div
            key={camera}
            className="relative aspect-video overflow-hidden rounded-lg border border-zinc-800 bg-gradient-to-br from-zinc-800/70 to-zinc-950"
          >
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
              aria-hidden="true"
            />
            <div
              className="animate-scan absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-violet-400/30 to-transparent"
              aria-hidden="true"
            />
            <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-zinc-400">
              {camera}
            </span>
          </div>
        ))}
      </div>
      <p className="mb-5 text-[11px] leading-relaxed text-zinc-400">
        Abstract, synthetic frames — no live feeds and no real faces. The production system runs
        20 concurrent camera streams.
      </p>

      <PipelinePlayer
        accent="violet"
        stages={stages}
        speed={780}
        idleHint="Press Play to watch a frame move from a camera through detection and matching."
        doneHint="Frame processed. Detections and matches are surfaced downstream."
        token={<Scan className="h-3.5 w-3.5" aria-hidden="true" />}
        renderAside={(stage, index) => {
          if (index === 1) {
            return (
              <span
                className="h-4 w-4 rounded-[3px] border border-violet-400/70"
                aria-hidden="true"
              />
            );
          }
          if (index === 2) {
            return (
              <span className="flex items-center gap-0.5" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400/50" />
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400/30" />
              </span>
            );
          }
          return null;
        }}
      />
    </div>
  );
}

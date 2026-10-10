"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { cn } from "@/lib/utils/cn";

interface Capability {
  id: string;
  title: string;
  blurb: string;
  items: string[];
  related?: { href: string; label: string };
}

const capabilities: Capability[] = [
  {
    id: "ai",
    title: "Applied AI",
    blurb:
      "Making models useful inside real products: retrieval that finds the right context, and reranking that puts it in the right order.",
    items: ["RAG", "Embeddings", "Retrieval", "Reranking", "LLM integration"],
    related: { href: "/projects/wizdom-ai", label: "Wizdom AI — enterprise retrieval" },
  },
  {
    id: "backend",
    title: "Backend",
    blurb:
      "Services and APIs built to stay reliable: typed Python, clear contracts, and storage that scales with the data.",
    items: ["Python", "FastAPI", "PostgreSQL", "pgVector", "REST APIs"],
    related: { href: "/projects/wizdom-ai", label: "Wizdom AI — retrieval platform" },
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb:
      "Interfaces that hold their own, built with Angular and Vue.js — and delivered with frontend teams I have led.",
    items: ["Angular", "Vue.js", "TypeScript", "REST integration", "Team leadership"],
  },
  {
    id: "vision",
    title: "Computer Vision",
    blurb:
      "Detection and recognition pipelines that run on live streams, from YOLOv8 detection to InsightFace embeddings.",
    items: ["YOLOv8", "InsightFace", "Detection", "Embeddings", "Streaming"],
    related: { href: "/projects/vision-ai", label: "Vision AI — intelligent surveillance" },
  },
];

export function Capabilities() {
  const [activeId, setActiveId] = useState(capabilities[0].id);
  const active = capabilities.find((capability) => capability.id === activeId)!;

  return (
    <Section id="skills" background="muted">
      <SectionHeader
        label="Capabilities"
        title="A toolkit, not a logo wall"
        description="Four disciplines I work across. Select one to see where it shows up in the work."
      />

      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
        <ul className="flex flex-col gap-2">
          {capabilities.map((capability, index) => {
            const isActive = capability.id === activeId;
            return (
              <li key={capability.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(capability.id)}
                  onMouseEnter={() => setActiveId(capability.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-colors",
                    isActive
                      ? "border-cyan-500/50 bg-cyan-500/[0.07]"
                      : "border-zinc-800 bg-zinc-950/40 hover:border-zinc-700"
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-xs",
                      isActive ? "text-cyan-400" : "text-zinc-400"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "font-display text-xl transition-colors",
                      isActive ? "text-zinc-50" : "text-zinc-300"
                    )}
                  >
                    {capability.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="relative min-h-[15rem] rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <p className="font-mono text-[11px] tracking-[0.2em] text-cyan-400 uppercase">
                {active.title}
              </p>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-zinc-300">
                {active.blurb}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {active.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-zinc-700/80 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {active.related ? (
                <Link
                  href={active.related.href}
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
                >
                  {active.related.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ) : (
                <p className="mt-8 text-sm text-zinc-400">
                  Shown across the delivery milestones in the journey above.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

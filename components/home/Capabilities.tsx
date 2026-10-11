"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";

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
  return (
    <Section id="skills">
      <SectionHeader
        label="Capabilities"
        title="A toolkit, not a logo wall"
        description="Four disciplines I work across — each one grounded in delivery, not decoration."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {capabilities.map((capability, index) => (
          <Reveal key={capability.id} delay={index * 0.05}>
            <article className="group h-full rounded-2xl border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_14px_34px_-18px_rgba(28,24,19,0.25)]">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
                {capability.related ? (
                  <Link
                    href={capability.related.href}
                    className="text-line-strong transition-colors group-hover:text-accent"
                    aria-label={`${capability.title} — see related work`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="h-4 w-4" aria-hidden="true" />
                )}
              </div>

              <h3 className="font-display mt-5 text-2xl text-ink transition-colors group-hover:text-accent">
                {capability.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-body">{capability.blurb}</p>

              <ul className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-xs text-muted">
                {capability.items.map((item, i) => (
                  <li key={item} className="flex items-center gap-2">
                    {i > 0 && <span className="text-line-strong">/</span>}
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
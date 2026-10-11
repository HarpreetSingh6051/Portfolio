"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/Section";

const milestones = [
  {
    phase: "Foundations",
    title: "Software Engineering",
    description:
      "Building applications end to end, and sharpening the fundamentals that everything later rests on.",
    items: ["Python", "TypeScript", "SQL", "Testing", "Deployment"],
  },
  {
    phase: "Delivery",
    title: "Full-Stack Delivery",
    description:
      "Connecting interfaces, APIs, databases, and real user needs — and leading teams that do the same.",
    items: ["Angular", "Vue.js", "REST APIs", "FastAPI", "PostgreSQL", "Team leadership"],
  },
  {
    phase: "Applied AI",
    title: "Applied AI",
    description:
      "Building RAG systems and computer vision applications that run in production, not just in notebooks.",
    items: ["RAG", "Embeddings", "pgVector", "LLM integration", "YOLOv8", "InsightFace"],
  },
];

export function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.4 });
  const scaleY = useTransform(progress, [0, 1], [0.02, 1]);
  const scaleX = useTransform(progress, [0, 1], [0.02, 1]);

  return (
    <Section id="experience" background="muted">
      <SectionHeader
        label="The path"
        title="An engineer's journey"
        description="Three movements: strong engineering fundamentals, full-stack delivery, and applied AI on top."
      />

      <div ref={trackRef} className="relative">
        {/* Connector tracks — vertical on mobile, horizontal on desktop */}
        <div className="absolute top-1 bottom-1 left-6 w-px bg-line lg:hidden" aria-hidden="true" />
        <motion.div
          style={{ scaleY }}
          className="absolute top-1 bottom-1 left-6 w-px origin-top bg-gradient-to-b from-accent via-accent/60 to-violet lg:hidden"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 top-6 hidden h-px bg-line lg:block" aria-hidden="true" />
        <motion.div
          style={{ scaleX }}
          className="absolute inset-x-0 top-6 hidden h-px origin-left bg-gradient-to-r from-accent via-accent/60 to-violet lg:block"
          aria-hidden="true"
        />

        <ol className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          {milestones.map((milestone, index) => (
            <li key={milestone.title} className="relative pl-20 lg:pl-0">
              <div className="absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-paper font-mono text-sm font-semibold text-accent shadow-[0_1px_2px_rgba(28,24,19,0.05)] lg:static">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="lg:mt-8">
                <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
                  {milestone.phase}
                </p>
                <h3 className="font-display mt-2 text-2xl text-ink">{milestone.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  {milestone.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {milestone.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-paper px-2.5 py-1 text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-14 border-l-2 border-accent/50 pl-4 font-mono text-sm text-muted">
        Continuously exploring DSA, advanced retrieval, and agentic AI.
      </p>
    </Section>
  );
}
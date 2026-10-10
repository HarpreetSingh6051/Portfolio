"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText, ArrowRight, Code2, Globe } from "lucide-react";
import { profile, socialLinks } from "@/lib/config/profile";
import { Button } from "@/components/ui/Button";

const pipelineSteps = [
  { label: "User query", sub: "Natural language" },
  { label: "Embedding", sub: "Vector representation" },
  { label: "Vector search", sub: "PostgreSQL + pgVector" },
  { label: "Reranking", sub: "Relevance ordering" },
  { label: "Grounded answer", sub: "LLM integration" },
];

function HeroVisualization() {
  return (
    <div className="relative hidden lg:block" aria-hidden="true">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 backdrop-blur-sm">
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">
            Retrieval pipeline
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-cyan-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            live
          </span>
        </div>

        <ol className="space-y-2">
          {pipelineSteps.map((step, index) => (
            <motion.li
              key={step.label}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18 * index + 0.2, duration: 0.45, ease: "easeOut" }}
              className="group flex items-center gap-3 rounded-xl border border-zinc-800/70 bg-zinc-950/60 px-4 py-3 transition-colors duration-300 hover:border-cyan-500/40 hover:bg-zinc-900/60"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 font-mono text-xs font-medium text-cyan-400 transition-colors group-hover:bg-cyan-500/20">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-200">{step.label}</p>
                <p className="truncate text-xs text-zinc-500">{step.sub}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-cyan-500/[0.06] blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-medium tracking-wide text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                Full-Stack Engineer · Applied AI · RAG &amp; Computer Vision
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-6 text-4xl font-semibold tracking-tight text-zinc-50 text-balance sm:text-5xl lg:text-6xl"
            >
              I build production software, and make AI work inside it.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400"
            >
              {profile.yearsExperience} years building production systems, the
              last {profile.aiFocusYears} focused on applied AI — RAG pipelines,
              retrieval and reranking, computer vision, and LLM integrations
              designed to hold up in the real world.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button href="#projects" variant="primary">
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={profile.resumePath} variant="secondary" external>
                <FileText className="h-4 w-4" />
                Download Resume
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mt-8 flex items-center gap-4"
            >
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100"
                aria-label="GitHub profile"
              >
                <Code2 className="h-5 w-5" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100"
                aria-label="LinkedIn profile"
              >
                <Globe className="h-5 w-5" />
              </a>
              <span className="text-sm text-zinc-600">
                {profile.location}
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HeroVisualization />
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-zinc-600 transition-colors hover:text-zinc-400 sm:block"
        aria-label="Scroll to projects"
      >
        <motion.span
          className="block"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}

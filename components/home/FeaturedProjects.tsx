"use client";

import { Fragment } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/lib/data/projects";
import type { Project } from "@/lib/types";

function PipelineChips({ stages }: { stages: NonNullable<Project["pipelineStages"]> }) {
  return (
    <div className="mt-5">
      <p className="mb-2 font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
        Pipeline
      </p>
      <div className="flex flex-wrap items-center gap-1.5">
        {stages.map((stage, index) => (
          <Fragment key={stage.id}>
            <span
              title={stage.description}
              className="rounded-md border border-zinc-800 bg-zinc-950/60 px-2 py-1 text-xs text-zinc-400"
            >
              {stage.label}
            </span>
            {index < stages.length - 1 && (
              <ArrowRight className="h-3 w-3 shrink-0 text-zinc-700" aria-hidden="true" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function Stack({ tech }: { tech: string[] }) {
  const shown = tech.slice(0, 6);
  const extra = tech.length - shown.length;

  return (
    <div className="mt-5 flex flex-wrap gap-1.5">
      {shown.map((item) => (
        <span
          key={item}
          className="rounded-full border border-zinc-800/80 bg-zinc-950/40 px-2.5 py-0.5 text-xs text-zinc-500"
        >
          {item}
        </span>
      ))}
      {extra > 0 && (
        <span className="rounded-full border border-zinc-800/80 bg-zinc-950/40 px-2.5 py-0.5 text-xs text-zinc-600">
          +{extra}
        </span>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/70 sm:p-7">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="mb-4 flex items-center justify-between">
          <Badge variant="cyan">{project.category}</Badge>
          <span className="font-mono text-xs text-zinc-600">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
          {project.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {project.summary}
        </p>

        {project.pipelineStages && <PipelineChips stages={project.pipelineStages} />}

        <Stack tech={project.stack} />

        <div className="mt-auto pt-6">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
          >
            Read case study
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

function LatestProjectCard({ project }: { project: Project }) {
  return (
    <Reveal delay={0.16}>
      <article className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 p-6 transition-colors duration-300 hover:border-zinc-700 hover:bg-zinc-900/40 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <Badge variant="outline">Personal</Badge>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-50">
              {project.name}
            </h3>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-zinc-400">
              {project.summary}
            </p>
          </div>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
        >
          Read case study
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </article>
    </Reveal>
  );
}

export function FeaturedProjects() {
  const professional = projects.filter((p) => p.featured);
  const personal = projects.find((p) => !p.featured);

  return (
    <Section id="projects">
      <SectionHeader
        label="Selected Work"
        title="Featured projects"
        description="Production systems I have designed and built, plus a slot for my latest independent work."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {professional.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      {personal && (
        <div className="mt-6">
          <LatestProjectCard project={personal} />
        </div>
      )}
    </Section>
  );
}

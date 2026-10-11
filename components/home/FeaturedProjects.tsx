import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { projects } from "@/lib/data/projects";
import type { Project } from "@/lib/types";
import { WizdomExperience } from "@/components/projects/WizdomExperience";
import { VisionExperience } from "@/components/projects/VisionExperience";

interface ProjectFeatureProps {
  project: Project;
  visual: ReactNode;
  index: string;
  reverse?: boolean;
}

function ProjectFeature({ project, visual, index, reverse = false }: ProjectFeatureProps) {
  return (
    <Reveal>
      <article className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className={reverse ? "lg:order-2" : undefined}>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-semibold text-accent">{index}</span>
            <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
              {project.category}
            </span>
          </div>
          <h3 className="font-display mt-5 text-3xl leading-[1.1] text-ink sm:text-4xl">
            {project.name}
          </h3>
          <p className="mt-4 max-w-xl leading-relaxed text-body">{project.summary}</p>

          <ul className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-xs text-muted">
            {project.stack.slice(0, 6).map((tech, i) => (
              <li key={tech} className="flex items-center gap-2">
                {i > 0 && <span className="text-line-strong">/</span>}
                {tech}
              </li>
            ))}
          </ul>

          <Link
            href={`/projects/${project.slug}`}
            className="group mt-8 inline-flex items-center gap-2 border-b border-line-strong pb-0.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Read the case study
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className={reverse ? "lg:order-1" : undefined}>{visual}</div>
      </article>
    </Reveal>
  );
}

/** A framed, dark "product preview" shell around each interactive experience. */
function PreviewFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-dark-line bg-dark shadow-[0_22px_50px_-24px_rgba(28,24,19,0.45)]">
        <div className="flex items-center gap-2 border-b border-dark-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-cream-muted/35" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream-muted/25" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream-muted/20" aria-hidden="true" />
          <span className="ml-2 font-mono text-[10px] tracking-[0.18em] text-cream-muted uppercase">
            {label}
          </span>
        </div>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </figure>
  );
}

export function FeaturedProjects() {
  const wizdom = projects.find((project) => project.slug === "wizdom-ai");
  const vision = projects.find((project) => project.slug === "vision-ai");
  const personal =
    projects.find((project) => project.category === "Personal") ??
    projects.find((project) => !project.featured);

  return (
    <Section id="projects">
      <SectionHeader
        label="Selected work"
        title="Software that ships, and AI that earns its place"
        description="Two production systems where the engineering and the intelligence are one and the same — plus the independent work alongside them."
      />

      <div className="space-y-24 lg:space-y-32">
        {wizdom && (
          <ProjectFeature
            index="01"
            project={wizdom}
            visual={
              <PreviewFrame label="Wizdom AI — retrieval pipeline">
                <WizdomExperience />
              </PreviewFrame>
            }
          />
        )}
        {vision && (
          <ProjectFeature
            index="02"
            project={vision}
            reverse
            visual={
              <PreviewFrame label="Vision AI — camera pipeline">
                <VisionExperience />
              </PreviewFrame>
            }
          />
        )}
      </div>

      {personal && (
        <Reveal className="mt-24 lg:mt-32">
          <article className="panel overflow-hidden rounded-2xl">
            <div className="grid gap-8 p-7 sm:p-10 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-10">
              <div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-semibold text-accent">03</span>
                  <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
                    {personal.category}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-2xl leading-[1.1] text-ink sm:text-3xl">
                  {personal.name}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-body">
                  {personal.summary}
                </p>
              </div>

              <div className="md:border-l md:border-line md:pl-10">
                <ul className="flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-xs text-muted">
                  {personal.stack.map((tech, i) => (
                    <li key={tech} className="flex items-center gap-2">
                      {i > 0 && <span className="text-line-strong">/</span>}
                      {tech}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/projects/${personal.slug}`}
                  className="group mt-7 inline-flex items-center gap-2 border-b border-line-strong pb-0.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Read the case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      )}

      <Reveal className="mt-10">
        <Link
          href="/notes"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          More depth lives in the engineering notes
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </Reveal>
    </Section>
  );
}
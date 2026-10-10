import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { projects } from "@/lib/data/projects";
import type { Project } from "@/lib/types";
import { WizdomExperience } from "@/components/projects/WizdomExperience";
import { VisionExperience } from "@/components/projects/VisionExperience";

function TechTags({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {stack.slice(0, 6).map((tech) => (
        <li
          key={tech}
          className="rounded-md border border-zinc-800 bg-zinc-900/50 px-2 py-1 text-xs text-zinc-400"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

interface ProjectFeatureProps {
  project: Project;
  visual: ReactNode;
  index: string;
  reverse?: boolean;
}

function ProjectFeature({ project, visual, index, reverse = false }: ProjectFeatureProps) {
  return (
    <Reveal>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className={reverse ? "lg:order-2" : undefined}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-cyan-400">{index}</span>
            <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-400 uppercase">
              {project.category}
            </span>
          </div>
          <h3 className="font-display mt-4 text-3xl text-zinc-50 sm:text-4xl">
            {project.name}
          </h3>
          <p className="mt-4 max-w-xl leading-relaxed text-zinc-400">{project.summary}</p>

          <div className="mt-6">
            <TechTags stack={project.stack} />
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
          >
            Read the case study
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className={reverse ? "lg:order-1" : undefined}>{visual}</div>
      </div>
    </Reveal>
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
        description="Two production systems where the engineering and the intelligence are one and the same."
      />

      <div className="space-y-20 lg:space-y-28">
        {wizdom && (
          <ProjectFeature
            index="01"
            project={wizdom}
            visual={<WizdomExperience />}
          />
        )}
        {vision && (
          <ProjectFeature
            index="02"
            project={vision}
            visual={<VisionExperience />}
            reverse
          />
        )}
      </div>

      {personal && (
        <Reveal className="mt-20 lg:mt-28">
          <div className="panel overflow-hidden rounded-2xl">
            <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-cyan-400">03</span>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-400 uppercase">
                    {personal.category}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-2xl text-zinc-50 sm:text-3xl">
                  {personal.name}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
                  {personal.summary}
                </p>
              </div>

              <div className="md:border-l md:border-zinc-800 md:pl-6">
                <TechTags stack={personal.stack} />
                <Link
                  href={`/projects/${personal.slug}`}
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
                >
                  Read the case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      <Reveal className="mt-10">
        <Link
          href="/notes"
          className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-cyan-300"
        >
          More depth lives in the engineering notes
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </Reveal>
    </Section>
  );
}

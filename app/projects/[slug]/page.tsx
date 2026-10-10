import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Code2, ExternalLink, CheckCircle2, AlertCircle, Lightbulb, Wrench } from "lucide-react";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/lib/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PipelineDetail } from "@/components/projects/PipelineDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="border-b border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-zinc-950 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#projects"
            className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div>
            <Badge variant={project.category === "Professional" ? "cyan" : "outline"}>
              {project.category} Project
            </Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
              {project.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
              {project.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {/* Problem */}
            <div>
              <Card>
                <div className="mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <h2 className="text-lg font-semibold text-zinc-50">Problem</h2>
                </div>
                <p className="text-sm leading-relaxed text-zinc-400">{project.problem}</p>
              </Card>
            </div>

            {/* Role */}
            <div>
              <Card>
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <h2 className="text-lg font-semibold text-zinc-50">My Role & Contributions</h2>
                </div>
                <p className="text-sm leading-relaxed text-zinc-400">{project.role}</p>
              </Card>
            </div>

            {/* Pipeline Visualization */}
            {project.pipelineStages && (
              <div>
                <Card>
                  <div className="mb-4 flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-cyan-400" />
                    <h2 className="text-lg font-semibold text-zinc-50">Architecture & Pipeline</h2>
                  </div>
                  <p className="mb-4 text-sm text-zinc-500">
                    Click each stage to learn more about its role in the pipeline.
                  </p>
                  <PipelineDetail stages={project.pipelineStages} />
                </Card>
              </div>
            )}

            {/* Key Decisions */}
            <div>
              <Card>
                <div className="mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-violet-400" />
                  <h2 className="text-lg font-semibold text-zinc-50">Key Engineering Decisions</h2>
                </div>
                <ul className="space-y-3">
                  {project.decisions.map((decision, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                      {decision}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Challenges */}
            <div>
              <Card>
                <div className="mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-400" />
                  <h2 className="text-lg font-semibold text-zinc-50">Challenges & Trade-offs</h2>
                </div>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Results */}
            {project.results && (
              <div>
                <Card>
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <h2 className="text-lg font-semibold text-zinc-50">Results</h2>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-400">{project.results}</p>
                </Card>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <Button href={project.githubUrl} variant="primary" external>
                  <Code2 className="h-4 w-4" />
                  View on GitHub
                </Button>
              )}
              {project.demoUrl && (
                <Button href={project.demoUrl} variant="secondary" external>
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              )}
              <Button href="/#contact" variant="ghost">
                Discuss This Project
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Briefcase, ChevronRight } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { experiences } from "@/lib/data/experience";

const capabilities = [
  "Backend & REST APIs",
  "RAG pipelines",
  "Retrieval & reranking",
  "Vector search (pgVector)",
  "Computer vision",
  "Frontend (Angular, Vue)",
  "Data ingestion",
  "Team leadership",
];

const stats = [
  { value: "8+", label: "Years in software engineering" },
  { value: "~3", label: "Years focused on applied AI" },
  { value: "15", label: "Frontend engineers led" },
];

export function Experience() {
  return (
    <Section id="experience" background="muted">
      <SectionHeader
        label="Experience"
        title="Career & capabilities"
        description="A career built on shipping production software, with a focus on applied AI. Details available on request."
      />

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Reveal key={exp.id} delay={index * 0.08}>
              <article className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-7">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <Briefcase className="h-4 w-4 text-cyan-400" />
                  <span className="font-mono text-xs tracking-wide text-cyan-400">
                    {exp.period}
                  </span>
                  {exp.current && (
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400">
                      Present
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-zinc-50">
                  {exp.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-500">{exp.company}</p>

                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {exp.description}
                </p>

                <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {exp.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm text-zinc-400"
                    >
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6">
              <h3 className="text-sm font-semibold tracking-wide text-zinc-200">
                Focus areas
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {capabilities.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-zinc-800 bg-zinc-950/50 px-3 py-1 text-xs text-zinc-400"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <dl className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 text-center"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-2xl font-semibold tracking-tight text-zinc-50">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-[11px] leading-tight text-zinc-500">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.2}>
        <p className="mt-10 text-sm text-zinc-500">
          Continuously exploring DSA, advanced retrieval, and agentic AI.
        </p>
      </Reveal>
    </Section>
  );
}

"use client";

import { useState } from "react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { skills, skillCategories } from "@/lib/data/skills";
import { cn } from "@/lib/utils/cn";

const grouped = skillCategories
  .filter((category) => category !== "All")
  .reduce<Record<string, typeof skills>>((acc, category) => {
    const items = skills.filter((skill) => skill.category === category);
    if (items.length > 0) acc[category] = items;
    return acc;
  }, {});

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = Object.keys(grouped).filter(
    (category) => activeCategory === "All" || category === activeCategory
  );

  return (
    <Section id="skills">
      <SectionHeader
        label="Capabilities"
        title="Technical toolkit"
        description="The technologies I use in production, grouped by discipline."
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {skillCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              activeCategory === category
                ? "bg-cyan-500/15 text-cyan-300"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="mb-3 font-mono text-[11px] tracking-widest text-cyan-400 uppercase">
              {category}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {grouped[category].map((skill) => (
                <li
                  key={skill.name}
                  className={cn(
                    "rounded-lg border px-2.5 py-1 text-sm transition-colors",
                    skill.level === "professional"
                      ? "border-zinc-800 bg-zinc-900/60 text-zinc-300"
                      : "border-dashed border-zinc-700 text-zinc-400"
                  )}
                >
                  {skill.name}
                  {skill.level === "learning" && (
                    <span className="ml-1 text-violet-400" aria-hidden="true">
                      •
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-8 flex items-center gap-2 text-xs text-zinc-600">
        <span className="text-violet-400" aria-hidden="true">
          •
        </span>
        Currently learning
      </p>
    </Section>
  );
}

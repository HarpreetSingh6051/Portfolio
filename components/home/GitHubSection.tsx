"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink, ArrowRight, Loader2 } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { githubConfig } from "@/lib/data/github";
import { formatRelativeDate } from "@/lib/utils/date";
import type { GitHubRepo } from "@/lib/types";

type FetchState = "loading" | "ready";

export function GitHubSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [state, setState] = useState<FetchState>("loading");
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("GitHub API request failed");
        const data = await res.json();
        if (!active) return;
        setRepos(data.repos?.length ? data.repos : githubConfig.fallbackRepos);
        setIsFallback(data.source !== "api");
      } catch {
        if (!active) return;
        setRepos(githubConfig.fallbackRepos);
        setIsFallback(true);
      } finally {
        if (active) setState("ready");
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const visible = repos.slice(0, 6);

  return (
    <Section id="github" background="muted">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          label="Open Source"
          title="GitHub activity"
          description="Public repositories from my GitHub profile, most recently updated first."
        />
        <a
          href={githubConfig.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-6 inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300 sm:mb-16"
        >
          View profile on GitHub
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </div>

      {state === "loading" ? (
        <div className="flex items-center gap-2 py-10 text-sm text-zinc-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading repositories…
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/70"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="truncate text-sm font-semibold text-zinc-100 transition-colors group-hover:text-cyan-400">
                    {repo.name}
                  </h3>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-600 transition-colors group-hover:text-cyan-400" />
                </div>

                <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-zinc-400">
                  {repo.description ?? "No description provided."}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-3">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-cyan-400" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      {repo.forks_count}
                    </span>
                  </span>
                  <span className="shrink-0">{formatRelativeDate(repo.updated_at)}</span>
                </div>
              </a>
            ))}
          </div>

          {isFallback && (
            <p className="mt-6 text-xs text-zinc-600">
              Live repository data is temporarily unavailable — showing a link to the
              full GitHub profile instead.
            </p>
          )}
        </>
      )}
    </Section>
  );
}

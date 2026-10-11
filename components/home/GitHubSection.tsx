"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, ArrowRight, Loader2, ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/Section";
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
      <div className="mb-12 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            <span className="font-mono text-xs tracking-[0.22em] text-accent uppercase">
              Open Source
            </span>
          </div>
          <h2 className="font-display mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl">
            GitHub activity
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">
            Public repositories, most recently updated first.
          </p>
        </div>
        <a
          href={githubConfig.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
        >
          View profile on GitHub
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </div>

      {state === "loading" ? (
        <div className="flex items-center gap-2 py-8 text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading repositories…
        </div>
      ) : (
        <>
          <ul className="divide-y divide-line border-y border-line">
            {visible.map((repo) => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 py-4 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <span className="text-sm font-medium text-ink transition-colors group-hover:text-accent">
                        {repo.name}
                      </span>
                      <p className="truncate text-sm text-muted">
                        {repo.description ?? "No description provided."}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-4 text-xs text-muted sm:pl-6">
                    {repo.language && <span>{repo.language}</span>}
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      {repo.forks_count}
                    </span>
                    <span className="shrink-0">{formatRelativeDate(repo.updated_at)}</span>
                    <ExternalLink
                      className="h-3.5 w-3.5 text-line-strong transition-colors group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>

          {isFallback && (
            <p className="mt-6 text-xs text-muted">
              Live repository data is temporarily unavailable — showing a link to the full
              GitHub profile instead.
            </p>
          )}
        </>
      )}
    </Section>
  );
}
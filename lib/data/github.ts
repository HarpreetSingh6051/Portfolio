import type { GitHubRepo } from "@/lib/types";

/**
 * GITHUB CONFIGURATION & FALLBACK DATA
 *
 * The username below drives the live GitHub API integration (see
 * app/api/github/route.ts). Public repositories are fetched at request time
 * and cached for one hour.
 *
 * Curation (all optional):
 *   pinned    — show ONLY these repo names, in this order (e.g. ["my-rag-app"])
 *   exclude   — hide these repo names (e.g. ["old-class-project"])
 *   maxRepos  — maximum number of repositories to display
 *
 * Forks and archived repositories are always excluded automatically.
 *
 * If the GitHub API is unavailable (rate limit or network error), the site
 * degrades gracefully and shows the fallback entries below. The fallback is
 * intentionally generic — it links to the profile rather than inventing
 * repositories that do not exist.
 */
export const githubConfig = {
  username: "HarpreetSingh6051",
  profileUrl: "https://github.com/HarpreetSingh6051",
  pinned: [] as string[],
  exclude: [] as string[],
  maxRepos: 6,
  fallbackRepos: [
    {
      id: 1,
      name: "Public repositories",
      full_name: "HarpreetSingh6051",
      description:
        "Open-source projects, experiments, and applied AI work. Live repository data is temporarily unavailable — browse the full profile on GitHub.",
      html_url: "https://github.com/HarpreetSingh6051",
      homepage: null,
      language: null,
      stargazers_count: 0,
      forks_count: 0,
      topics: ["applied-ai", "rag", "computer-vision"],
      updated_at: "2026-01-01T00:00:00Z",
      created_at: "2026-01-01T00:00:00Z",
      fork: false,
      archived: false,
    },
  ] as GitHubRepo[],
};

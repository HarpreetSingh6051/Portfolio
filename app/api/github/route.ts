import { NextResponse } from "next/server";
import { githubConfig } from "@/lib/data/github";

// Note: With cacheComponents enabled, use fetch's next.revalidate instead

/**
 * GitHub API Proxy Route
 * 
 * Fetches public repositories for the configured username.
 * Uses no authentication — relies on public rate limits (60 req/hour).
 * Falls back to local data if the API fails.
 */
export async function GET() {
  const username = githubConfig.username;

  // If username is still the placeholder, return fallback data
  if (username === "yourusername") {
    return NextResponse.json({
      repos: githubConfig.fallbackRepos,
      source: "fallback",
      message: "Using fallback data. Set your GitHub username in lib/data/github.ts",
    });
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "portfolio-site",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      // Rate limit or other API error — return fallback
      return NextResponse.json({
        repos: githubConfig.fallbackRepos,
        source: "fallback",
        message: `GitHub API returned ${response.status}. Using fallback data.`,
      });
    }

    const data = await response.json();

    const { pinned, exclude, maxRepos } = githubConfig;

    // Filter out forks and archived repos, then map to our type
    let repos = data
      .filter(
        (repo: { fork: boolean; archived: boolean; name: string }) =>
          !repo.fork && !repo.archived && !exclude.includes(repo.name)
      )
      .map(
        (repo: {
          id: number;
          name: string;
          full_name: string;
          description: string | null;
          html_url: string;
          homepage: string | null;
          language: string | null;
          stargazers_count: number;
          forks_count: number;
          topics: string[];
          updated_at: string;
          created_at: string;
          fork: boolean;
          archived: boolean;
        }) => ({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          html_url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          topics: repo.topics || [],
          updated_at: repo.updated_at,
          created_at: repo.created_at,
          fork: repo.fork,
          archived: repo.archived,
        })
      );

    // Optional curation: pin a specific set of repositories, in order.
    if (pinned.length > 0) {
      const order = new Map(
        pinned.map((name, index) => [name, index] as const)
      );
      repos = repos
        .filter((repo: { name: string }) => order.has(repo.name))
        .sort(
          (a: { name: string }, b: { name: string }) =>
            (order.get(a.name) ?? 0) - (order.get(b.name) ?? 0)
        );
    }

    repos = repos.slice(0, maxRepos);

    return NextResponse.json({
      repos,
      source: "api",
      message: "Live data from GitHub API",
    });
  } catch {
    // Network error — return fallback
    return NextResponse.json({
      repos: githubConfig.fallbackRepos,
      source: "fallback",
      message: "Network error. Using fallback data.",
    });
  }
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Code2, Globe, Mail, ArrowUp, FileText } from "lucide-react";
import { profile, socialLinks } from "@/lib/config/profile";

const exploreLinks: { href: string; label: string; external?: boolean }[] = [
  { href: "/#projects", label: "Projects" },
  { href: "/notes", label: "Engineering notes" },
  { href: "/playground", label: "RAG playground" },
  { href: profile.resumePath, label: "Resume", external: true },
];

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setYear(new Date().getFullYear()), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="text-lg font-semibold text-zinc-100">{profile.name}</p>
            <p className="mt-1 max-w-xs text-sm text-zinc-400">{profile.title}</p>
            <p className="mt-4 max-w-xs text-sm text-zinc-400">
              {profile.location}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-3 font-mono text-[11px] tracking-widest text-zinc-400 uppercase">
              Explore
            </h2>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-3 font-mono text-[11px] tracking-widest text-zinc-400 uppercase">
              Connect
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                >
                  <Code2 className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                >
                  <Globe className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.email}
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </li>
              <li>
                <a
                  href={profile.resumePath}
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                >
                  <FileText className="h-4 w-4" />
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800/80 pt-6 sm:flex-row">
          <p className="text-xs text-zinc-400">
            &copy; {year ?? "…"} {profile.name}. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}

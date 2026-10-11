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
    <footer className="border-t border-line bg-canvas-soft">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl text-ink">{profile.name}</p>
            <p className="mt-2 max-w-xs text-sm text-muted">{profile.title}</p>
            <p className="mt-4 max-w-xs text-sm text-muted">{profile.location}</p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-3 font-mono text-[11px] tracking-widest text-muted uppercase">
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
                      className="text-sm text-body transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-body transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-3 font-mono text-[11px] tracking-widest text-muted uppercase">
              Connect
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-body transition-colors hover:text-ink"
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
                  className="inline-flex items-center gap-2 text-sm text-body transition-colors hover:text-ink"
                >
                  <Globe className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.email}
                  className="inline-flex items-center gap-2 text-sm text-body transition-colors hover:text-ink"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </li>
              <li>
                <a
                  href={profile.resumePath}
                  className="inline-flex items-center gap-2 text-sm text-body transition-colors hover:text-ink"
                >
                  <FileText className="h-4 w-4" />
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {year ?? "…"} {profile.name}. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-3 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
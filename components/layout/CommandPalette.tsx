"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Code2,
  CornerDownLeft,
  FileText,
  FlaskConical,
  Folder,
  Globe,
  Home,
  Layers,
  Mail,
  Route,
  Search,
} from "lucide-react";
import { profile, socialLinks } from "@/lib/config/profile";
import { cn } from "@/lib/utils/cn";

/** Open the palette from anywhere (used by the navbar trigger). */
export function openCommandPalette() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-command-palette"));
  }
}

interface Command {
  id: string;
  label: string;
  group: "Navigate" | "Explore" | "Connect";
  icon: typeof Home;
  href: string;
  keywords?: string;
  external?: boolean;
}

const commands: Command[] = [
  { id: "home", label: "Home", group: "Navigate", icon: Home, href: "/#home", keywords: "start top hero" },
  { id: "work", label: "Featured work", group: "Navigate", icon: Folder, href: "/#projects", keywords: "projects case study wizdom vision" },
  { id: "journey", label: "Career journey", group: "Navigate", icon: Route, href: "/#experience", keywords: "experience timeline milestones" },
  { id: "capabilities", label: "Capabilities", group: "Navigate", icon: Layers, href: "/#skills", keywords: "skills stack tools" },
  { id: "github-activity", label: "GitHub activity", group: "Navigate", icon: Code2, href: "/#github", keywords: "repos repositories open source" },
  { id: "contact", label: "Contact", group: "Navigate", icon: Mail, href: "/#contact", keywords: "hire email reach out" },
  { id: "notes", label: "Engineering notes", group: "Explore", icon: BookOpen, href: "/notes", keywords: "writing articles blog" },
  { id: "playground", label: "RAG playground", group: "Explore", icon: FlaskConical, href: "/playground", keywords: "retrieval demo interactive" },
  { id: "resume", label: "Download resume", group: "Explore", icon: FileText, href: profile.resumePath, external: true, keywords: "cv pdf" },
  { id: "github", label: "GitHub profile", group: "Connect", icon: Code2, href: socialLinks.github, external: true, keywords: "code repositories" },
  { id: "linkedin", label: "LinkedIn", group: "Connect", icon: Globe, href: socialLinks.linkedin, external: true, keywords: "network professional" },
  { id: "email", label: "Email me", group: "Connect", icon: Mail, href: socialLinks.email, keywords: "mail contact" },
];

const groups: Command["group"][] = ["Navigate", "Explore", "Connect"];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.keywords ?? ""}`.toLowerCase().includes(q)
    );
  }, [query]);

  // Global shortcuts + programmatic open
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setQuery("");
        setActiveIndex(0);
        setOpen((prev) => !prev);
      }
    }
    function onOpenRequest() {
      setQuery("");
      setActiveIndex(0);
      setOpen(true);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpenRequest);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpenRequest);
    };
  }, []);

  // Focus + scroll lock while open (DOM side-effects only).
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(raf);
    };
  }, [open]);

  const runCommand = useCallback(
    (command: Command) => {
      close();
      if (command.href.startsWith("mailto:")) {
        window.location.href = command.href;
        return;
      }
      if (command.external) {
        window.open(command.href, "_blank", "noopener,noreferrer");
        return;
      }
      if (command.href.includes("#")) {
        window.location.assign(command.href);
        return;
      }
      router.push(command.href);
    },
    [close, router]
  );

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = filtered[activeIndex];
      if (command) runCommand(command);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="command-palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
          onMouseDown={close}
        >
          <div className="absolute inset-0 bg-ink/35 backdrop-blur-sm" aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-paper shadow-2xl shadow-ink/15"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Jump to a section, page, or link…"
                aria-label="Search commands"
                autoComplete="off"
                spellCheck={false}
                className="h-14 flex-1 bg-transparent text-sm text-ink placeholder-muted focus:outline-none"
              />
              <kbd className="hidden shrink-0 rounded border border-line bg-canvas-soft px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">
                Esc
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2" role="listbox" aria-label="Commands">
              {filtered.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-muted">
                  No matches. Try “projects”, “resume”, or “contact”.
                </p>
              ) : (
                groups.map((group) => {
                  const groupCommands = filtered.filter((command) => command.group === group);
                  if (groupCommands.length === 0) return null;
                  return (
                    <div key={group} className="mb-1">
                      <p className="px-3 py-1.5 font-mono text-[10px] tracking-widest text-muted uppercase">
                        {group}
                      </p>
                      {groupCommands.map((command) => {
                        const index = filtered.indexOf(command);
                        const isActive = index === activeIndex;
                        const Icon = command.icon;
                        return (
                          <button
                            key={command.id}
                            type="button"
                            role="option"
                            aria-selected={isActive}
                            onMouseMove={() => setActiveIndex(index)}
                            onClick={() => runCommand(command)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                              isActive ? "bg-accent-soft text-ink" : "text-body hover:bg-canvas-soft"
                            )}
                          >
                            <Icon
                              className={cn(
                                "h-4 w-4 shrink-0",
                                isActive ? "text-accent" : "text-muted"
                              )}
                              aria-hidden="true"
                            />
                            <span className="flex-1">{command.label}</span>
                            {isActive ? (
                              <CornerDownLeft className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                            ) : (
                              <ArrowRight className="h-3.5 w-3.5 text-line-strong" aria-hidden="true" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-[11px] text-muted">
              <span>Tip: there is a spare node hiding in the hero network.</span>
              <span className="hidden items-center gap-1 sm:flex">
                <kbd className="rounded border border-line bg-canvas-soft px-1.5 py-0.5 font-mono text-[10px]">
                  ↑↓
                </kbd>
                navigate
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { profile, navLinks } from "@/lib/config/profile";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy — highlights the section currently in view on the home page.
  useEffect(() => {
    if (!onHome) return;

    const ids = navLinks.map((link) => link.href.split("#")[1]);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onHome]);

  const isActive = (href: string) =>
    onHome && href.split("#")[1] === activeSection;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => setIsMobileOpen(false)}
          className="flex items-center gap-2.5 text-sm font-semibold text-zinc-50 transition-colors hover:text-cyan-400"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 font-mono text-xs font-bold text-zinc-950">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-zinc-50"
                  : "text-zinc-400 hover:text-zinc-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-3.5 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:text-cyan-400"
          >
            <FileText className="h-4 w-4" />
            Resume
          </a>
        </div>

        <button
          onClick={() => setIsMobileOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-300 transition-colors hover:text-zinc-50 md:hidden"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-zinc-900 text-zinc-50"
                      : "text-zinc-400 hover:text-zinc-100"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={profile.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileOpen(false)}
                className="mt-2 flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2.5 text-sm font-medium text-zinc-200"
              >
                <FileText className="h-4 w-4" />
                Resume
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

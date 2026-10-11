"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, FileText, Code2, Globe, Mail } from "lucide-react";
import { profile, socialLinks } from "@/lib/config/profile";
import { Button } from "@/components/ui/Button";
import { HeroNetwork } from "@/components/home/HeroNetwork";
import { Portrait } from "@/components/home/Portrait";

const socials = [
  { href: socialLinks.github, label: "GitHub", icon: Code2 },
  { href: socialLinks.linkedin, label: "LinkedIn", icon: Globe },
  { href: socialLinks.email, label: "Email", icon: Mail },
];

const stats = [
  { value: profile.yearsExperience, label: "years in software engineering" },
  { value: profile.aiFocusYears, label: "years in applied AI" },
  { value: "15", label: "frontend engineers led" },
];

const ease = [0.16, 0.9, 0.28, 1] as const;

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:pt-44 lg:pb-24">
      {/* Living background field — reacts to the pointer, pauses off screen */}
      <HeroNetwork />

      {/* readability scrim over the copy column */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-full lg:w-[62%]"
        style={{
          background:
            "linear-gradient(100deg, var(--c-canvas) 0%, color-mix(in srgb, var(--c-canvas) 88%, transparent) 46%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          {/* Copy */}
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] tracking-[0.2em] text-accent uppercase"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Full-Stack Engineer
              <span className="text-line-strong">/</span>
              Applied AI
              <span className="text-line-strong">/</span>
              RAG &amp; Computer Vision
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="font-display mt-6 text-[2.7rem] leading-[1.02] text-ink sm:text-6xl lg:text-[4.4rem]"
            >
              I build software that{" "}
              <span className="font-display-italic text-accent">thinks, sees,</span> and scales.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-body"
            >
              Full-stack engineer turned Applied AI engineer. I turn complex AI capabilities
              into useful, production-ready products — retrieval that stays grounded, vision
              pipelines that run on real streams, and interfaces that hold up.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.16 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button href="/#projects" magnetic>
                Explore my work
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/#contact" variant="secondary">
                Let&rsquo;s work together
              </Button>
              <Button href={profile.resumePath} variant="ghost" external>
                <FileText className="h-4 w-4" />
                Résumé
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.22 }}
              className="mt-8 flex flex-wrap items-center gap-2"
            >
              <span className="mr-1 hidden font-mono text-[11px] tracking-[0.18em] text-muted uppercase sm:inline">
                Find me on
              </span>
              {socials.map((social) => {
                const Icon = social.icon;
                const isMail = social.href.startsWith("mailto:");
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noopener noreferrer"}
                    aria-label={social.label}
                    className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-line-strong hover:text-ink"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {social.label}
                  </a>
                );
              })}
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-7"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-3xl text-ink">{stat.value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted">{stat.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.12 }}
            className="relative"
          >
            <Portrait />
          </motion.div>
        </div>

        <motion.a
          href="#story"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-16 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted uppercase transition-colors hover:text-accent lg:mt-20"
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </motion.span>
          Scroll — build the pipeline
        </motion.a>
      </div>
    </section>
  );
}

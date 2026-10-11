"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, FileText, Code2, Globe, Mail } from "lucide-react";
import { profile, socialLinks } from "@/lib/config/profile";
import { Button } from "@/components/ui/Button";
import { NodeNetwork } from "@/components/home/NodeNetwork";

const stats = [
  { value: profile.yearsExperience, label: "years in software engineering" },
  { value: "~3", label: "years in applied AI" },
  { value: "15", label: "frontend engineers led" },
];

const socials = [
  { href: socialLinks.github, label: "GitHub", icon: Code2 },
  { href: socialLinks.linkedin, label: "LinkedIn", icon: Globe },
  { href: socialLinks.email, label: "Email", icon: Mail },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:pt-44 lg:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] tracking-[0.18em] text-accent uppercase"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Full-Stack Engineer
              <span className="text-line-strong">/</span>
              Applied AI
              <span className="text-line-strong">/</span>
              RAG &amp; Computer Vision
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              className="font-display mt-6 text-[2.6rem] leading-[1.04] text-ink sm:text-6xl lg:text-[4.1rem]"
            >
              I build production software,
              <br className="hidden sm:block" /> and{" "}
              <span className="font-display-italic text-accent">
                make AI work inside it.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-body"
            >
              Full-stack engineering meets applied AI. From scalable applications to
              intelligent systems that solve real problems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button href="/#projects" magnetic>
                View projects
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={profile.resumePath} variant="secondary" external>
                <FileText className="h-4 w-4" />
                Download resume
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.24 }}
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
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
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

          {/* Signature visual: identity card + interactive system map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <figure className="panel mx-auto w-full max-w-[19rem] overflow-hidden rounded-2xl sm:max-w-xs">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/images/profile.jpg"
                  alt={`${profile.name} — ${profile.title}`}
                  width={400}
                  height={400}
                  priority
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 ring-1 ring-ink/5 ring-inset"
                  aria-hidden="true"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
                <span className="text-sm font-semibold text-ink">{profile.name}</span>
                <span className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                  AI Engineer
                </span>
              </figcaption>
            </figure>

            <NodeNetwork />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
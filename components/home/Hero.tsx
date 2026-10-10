"use client";

import { motion } from "framer-motion";
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
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] tracking-[0.2em] text-cyan-400 uppercase"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Full-Stack Engineer
              <span className="text-zinc-600">/</span>
              Applied AI
              <span className="text-zinc-600">/</span>
              RAG &amp; Computer Vision
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              className="font-display mt-6 text-4xl leading-[1.05] text-zinc-50 sm:text-5xl lg:text-6xl"
            >
              I build production software, and{" "}
              <span className="font-display-italic text-cyan-300">
                make AI work inside it.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400"
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

              <span className="mx-1 hidden h-6 w-px bg-zinc-800 sm:block" />

              <div className="flex items-center gap-1">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition-colors hover:border-cyan-500/50 hover:text-cyan-300"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.28 }}
              className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-zinc-800/70 pt-6"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-3xl text-zinc-50">{stat.value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-zinc-400">{stat.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Signature visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <NodeNetwork />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

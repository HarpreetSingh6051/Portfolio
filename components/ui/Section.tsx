"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  background?: "default" | "muted";
}

export function Section({ id, children, className, background = "default" }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-24 lg:py-32",
        background === "muted" && "bg-zinc-900/50",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="mb-12 sm:mb-16"
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-cyan-400/70" aria-hidden="true" />
        <span className="font-mono text-xs tracking-[0.25em] text-cyan-400 uppercase">
          {label}
        </span>
      </div>
      <h2 className="font-display mt-5 max-w-3xl text-4xl leading-[1.1] text-zinc-50 sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
          {description}
        </p>
      )}
    </motion.div>
  );
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

interface ArticleContentProps {
  content?: string;
  excerpt: string;
}

export function ArticleContent({ content, excerpt }: ArticleContentProps) {
  if (!content) {
    return <p className="text-body">{excerpt}</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-4"
    >
      {content.split("\n\n").map((paragraph, i) => {
        if (paragraph.startsWith("## ")) {
          return (
            <h2 key={i} className="mt-8 mb-4 font-display text-2xl text-ink">
              {paragraph.replace("## ", "")}
            </h2>
          );
        }
        if (paragraph.startsWith("### ")) {
          return (
            <h3 key={i} className="mt-6 mb-3 text-lg font-semibold text-ink">
              {paragraph.replace("### ", "")}
            </h3>
          );
        }
        if (paragraph.startsWith("- ")) {
          return (
            <ul key={i} className="list-inside list-disc space-y-1 text-body">
              {paragraph.split("\n").map((item, j) => (
                <li key={j}>{item.replace("- ", "")}</li>
              ))}
            </ul>
          );
        }
        if (paragraph.startsWith("```")) {
          const code = paragraph.replace(/```\w*\n?/g, "").replace(/```$/g, "");
          return (
            <pre key={i} className="overflow-x-auto rounded-lg border border-line bg-canvas-soft p-4">
              <code className="text-sm text-ink">{code}</code>
            </pre>
          );
        }
        return (
          <p key={i} className="leading-relaxed text-body">
            {paragraph}
          </p>
        );
      })}
    </motion.div>
  );
}
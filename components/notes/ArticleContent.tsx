"use client";

import { motion } from "framer-motion";

interface ArticleContentProps {
  content?: string;
  excerpt: string;
}

export function ArticleContent({ content, excerpt }: ArticleContentProps) {
  if (!content) {
    return <p className="text-zinc-400">{excerpt}</p>;
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
            <h2 key={i} className="mt-8 mb-4 text-xl font-bold text-zinc-50">
              {paragraph.replace("## ", "")}
            </h2>
          );
        }
        if (paragraph.startsWith("### ")) {
          return (
            <h3 key={i} className="mt-6 mb-3 text-lg font-semibold text-zinc-100">
              {paragraph.replace("### ", "")}
            </h3>
          );
        }
        if (paragraph.startsWith("- ")) {
          return (
            <ul key={i} className="list-inside list-disc space-y-1 text-zinc-400">
              {paragraph.split("\n").map((item, j) => (
                <li key={j}>{item.replace("- ", "")}</li>
              ))}
            </ul>
          );
        }
        if (paragraph.startsWith("```")) {
          const code = paragraph.replace(/```\w*\n?/g, "").replace(/```$/g, "");
          return (
            <pre key={i} className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4">
              <code className="text-sm text-zinc-300">{code}</code>
            </pre>
          );
        }
        return (
          <p key={i} className="leading-relaxed text-zinc-400">
            {paragraph}
          </p>
        );
      })}
    </motion.div>
  );
}

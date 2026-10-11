import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Tag, ArrowRight } from "lucide-react";
import { articles } from "@/lib/data/articles";
import { formatDate } from "@/lib/utils/date";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Engineering Notes",
  description: "Technical notes and learning journal covering RAG, embeddings, Python patterns, DSA, and more.",
};

export default function NotesPage() {
  return (
    <div className="pt-16">
      <section className="border-b border-line bg-gradient-to-b from-canvas-soft/70 to-canvas py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div>
            <Badge variant="accent">Learning Journal</Badge>
            <h1 className="font-display mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl">
              Engineering Notes
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">
              Short technical notes and experiments from my ongoing learning in AI,
              software engineering, and computer vision.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {articles.map((article) => (
              <div key={article.slug}>
                <Link href={`/notes/${article.slug}`}>
                  <Card hover className="group">
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 rounded border border-line bg-canvas/50 px-2 py-0.5 text-xs text-muted"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="mb-2 text-xl font-semibold text-ink transition-colors group-hover:text-accent">
                      {article.title}
                    </h2>

                    <p className="mb-4 text-sm leading-relaxed text-body">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>{formatDate(article.date)}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readingTime} min read
                        </span>
                        <span className="flex items-center gap-1 text-accent">
                          Read more
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";
import { articles } from "@/lib/data/articles";
import { formatDate } from "@/lib/utils/date";
import { ArticleContent } from "@/components/notes/ArticleContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="pt-16">
      <section className="border-b border-line bg-gradient-to-b from-canvas-soft/70 to-canvas py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/notes"
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Notes
          </Link>

          <div>
            <div className="mb-4 flex flex-wrap gap-1.5">
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

            <h1 className="font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
              {article.title}
            </h1>

            <div className="mt-5 flex items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(article.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article>
            <ArticleContent content={article.content} excerpt={article.excerpt} />
          </article>
        </div>
      </section>
    </div>
  );
}
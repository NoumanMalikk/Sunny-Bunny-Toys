import type { Metadata } from "next";
import Link from "next/link";
import { journalArticles } from "@/data/journal";
import { brand } from "@/data/store-config";

export const metadata: Metadata = {
  title: "Sunny Bunny Journal",
  description:
    "Playful guides from Sunny Bunny Toy Co. — choosing age-appropriate toys, planning family game nights and organizing creative supplies at home.",
};

export default function JournalPage() {
  return (
    <div className="container-store py-12 md:py-16">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-3 text-mint">Sunny Bunny Journal</p>
        <h1 className="font-display text-3xl text-navy md:text-4xl">Ideas for playful days</h1>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          Thoughtful guides for adult purchasers — no medical, therapeutic or guaranteed developmental claims,
          just practical inspiration from {brand.publicName}.
        </p>
      </header>

      <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
        {journalArticles.map((article) => (
          <li key={article.slug} className="h-full">
            <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-cloud p-6 shadow-soft transition-transform duration-[var(--motion-ui)] hover:-translate-y-1 hover:shadow-lift">
              <time dateTime={article.publishedAt} className="font-ui text-xs font-semibold text-text-secondary">
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                {" · "}
                {article.readTime} read
              </time>
              <h2 className="mt-3 font-display text-xl leading-snug text-navy">
                <Link
                  href={`/journal/${article.slug}`}
                  className="hover:text-deep-mint focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{article.excerpt}</p>
              <Link
                href={`/journal/${article.slug}`}
                className="mt-4 font-ui text-sm font-semibold text-navy underline-offset-2 hover:underline"
              >
                Read article →
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

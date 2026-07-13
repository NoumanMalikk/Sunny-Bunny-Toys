import Link from "next/link";
import { journalArticles } from "@/data/journal";
import { SectionHeader } from "@/components/home/decor/SectionHeader";
import { Button } from "@/components/ui/Button";

export function JournalTeaser() {
  const articles = journalArticles.slice(0, 3);

  return (
    <section aria-labelledby="journal-heading" className="container-store py-16 md:py-20">
      <SectionHeader
        eyebrow="Sunny Bunny Journal"
        title="Ideas for playful days"
        description="Guides for choosing age-appropriate toys, planning family game nights and organizing creative supplies."
        href="/journal"
        linkLabel="Read the journal"
      />

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3" role="list">
        {articles.map((article) => (
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
              <h3 className="mt-3 font-display text-xl leading-snug text-navy">
                <Link href={`/journal/${article.slug}`} className="hover:text-deep-mint">
                  {article.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{article.excerpt}</p>
              <Button href={`/journal/${article.slug}`} variant="ghost" className="mt-4 w-fit px-0">
                Read article →
              </Button>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

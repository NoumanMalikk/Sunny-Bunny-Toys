import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, journalArticles } from "@/data/journal";
import { brand, storeMode } from "@/data/store-config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function JournalArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const siteUrl = storeMode.siteUrl.replace(/\/$/, "");
  const articleUrl = `${siteUrl}/journal/${article.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: brand.legalName,
    },
    publisher: {
      "@type": "Organization",
      name: brand.legalName,
      alternateName: brand.publicName,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  return (
    <article className="container-store py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <header className="mx-auto max-w-3xl">
        <p className="eyebrow mb-3 text-mint">
          <Link href="/journal" className="hover:text-navy">
            Sunny Bunny Journal
          </Link>
        </p>
        <h1 className="font-display text-3xl leading-tight text-navy md:text-4xl">{article.title}</h1>
        <p className="mt-4 font-ui text-sm text-text-secondary">
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          {" · "}
          {article.readTime} read
        </p>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">{article.excerpt}</p>
      </header>

      <div className="policy-prose mx-auto mt-10 max-w-3xl">
        {article.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <footer className="mx-auto mt-12 max-w-3xl border-t border-border pt-8">
        <Link
          href="/journal"
          className="font-ui text-sm font-semibold text-navy underline-offset-2 hover:underline"
        >
          ← Back to the journal
        </Link>
      </footer>
    </article>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { brand } from "@/data/store-config";
import { SearchResults } from "@/components/commerce/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  description: `Search ${brand.publicName} for dolls, toys, creative activities and family games.`,
};

function SearchFallback() {
  return <div className="h-48 animate-pulse rounded-[var(--radius-card)] bg-soft-gray" />;
}

export default function SearchPage() {
  return (
    <div className="container-store py-10 md:py-14">
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">Search</p>
        <h1 className="mt-2 font-display text-4xl text-navy md:text-5xl">Search products</h1>
        <p className="mt-3 text-lg text-text-secondary">
          Find toys by name, category, age range, play style, piece count or description.
        </p>
      </header>
      <Suspense fallback={<SearchFallback />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}

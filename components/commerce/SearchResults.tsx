"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getActiveProducts } from "@/data/products";
import { searchProducts } from "@/lib/utilities/search";
import { ProductGrid } from "@/components/product/ProductGrid";

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  const results = useMemo(() => {
    if (!query) return [];
    return searchProducts(getActiveProducts(), query, 48).map((result) => result.product);
  }, [query]);

  if (!query) {
    return (
      <p className="rounded-[var(--radius-card)] border border-border bg-cloud px-6 py-12 text-center text-text-secondary">
        Enter a search term to find products by name, category, age, play style or description.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-text-secondary">
        {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
      </p>
      <ProductGrid
        products={results}
        emptyMessage={`No products found for "${query}". Try a different term or browse the shop.`}
      />
    </div>
  );
}

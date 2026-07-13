"use client";

import { getProductById } from "@/data/products";
import { useCompareStore } from "@/lib/cart/compare-store";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { CompareTable } from "@/components/comparison/CompareTable";

export function ComparePageContent() {
  const hydrated = useHydrated();
  const productIds = useCompareStore((state) => state.productIds);

  const products = productIds
    .map((id) => getProductById(id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product?.active));

  if (!hydrated) {
    return <div className="h-64 animate-pulse rounded-[var(--radius-card)] bg-soft-gray" />;
  }

  return <CompareTable products={products} />;
}

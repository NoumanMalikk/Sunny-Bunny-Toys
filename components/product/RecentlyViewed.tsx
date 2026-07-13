"use client";

import { useEffect } from "react";
import { getProductById } from "@/data/products";
import { useRecentlyViewedStore } from "@/lib/cart/recently-viewed-store";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { ProductGrid } from "@/components/product/ProductGrid";

export type RecentlyViewedProps = {
  currentProductId: string;
  className?: string;
};

export function RecentlyViewed({ currentProductId, className }: RecentlyViewedProps) {
  const hydrated = useHydrated();
  const record = useRecentlyViewedStore((state) => state.record);
  const productIds = useRecentlyViewedStore((state) => state.productIds);

  useEffect(() => {
    record(currentProductId);
  }, [currentProductId, record]);

  const products = productIds
    .filter((id) => id !== currentProductId)
    .map((id) => getProductById(id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product?.active))
    .slice(0, 4);

  if (!hydrated || products.length === 0) return null;

  return (
    <section aria-labelledby="recently-viewed-heading" className={className}>
      <h2 id="recently-viewed-heading" className="mb-5 font-display text-2xl text-navy">
        Recently viewed
      </h2>
      <ProductGrid products={products} />
    </section>
  );
}

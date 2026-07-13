"use client";

import { getProductById } from "@/data/products";
import { useWishlistStore } from "@/lib/cart/wishlist-store";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/product/ProductGrid";

export function WishlistPageContent() {
  const hydrated = useHydrated();
  const productIds = useWishlistStore((state) => state.productIds);
  const clear = useWishlistStore((state) => state.clear);

  const products = productIds
    .map((id) => getProductById(id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product?.active));

  if (!hydrated) {
    return <div className="h-64 animate-pulse rounded-[var(--radius-card)] bg-soft-gray" />;
  }

  if (products.length === 0) {
    return (
      <div className="rounded-[var(--radius-card)] border border-border bg-cloud px-6 py-12 text-center text-text-secondary">
        <p>Your wishlist is empty.</p>
        <Button href="/shop" className="mt-4">
          Browse shop
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={clear}>
          Clear wishlist
        </Button>
      </div>
      <ProductGrid products={products} emptyMessage="Your wishlist is empty." />
    </div>
  );
}

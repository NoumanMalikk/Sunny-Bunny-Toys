import type { Product } from "@/lib/types/product";
import { cn } from "@/lib/utilities/cn";
import { ProductCard } from "@/components/product/ProductCard";

export type ProductGridProps = {
  products: Product[];
  className?: string;
  emptyMessage?: string;
};

export function ProductGrid({
  products,
  className,
  emptyMessage = "No products match your filters.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-[var(--radius-card)] border border-border bg-cloud px-6 py-12 text-center text-text-secondary">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
      role="list"
    >
      {products.map((product, index) => (
        <li key={product.id} className="h-full">
          <ProductCard product={product} priority={index < 4} />
        </li>
      ))}
    </ul>
  );
}

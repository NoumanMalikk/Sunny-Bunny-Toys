import { Suspense } from "react";
import { ShopListing, type ShopListingProps } from "@/components/commerce/ShopListing";

function ShopListingFallback() {
  return (
    <div className="space-y-6">
      <div className="h-14 animate-pulse rounded-[var(--radius-card)] bg-soft-gray" />
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="hidden h-[480px] animate-pulse rounded-[var(--radius-card)] bg-soft-gray lg:block" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-[420px] animate-pulse rounded-[var(--radius-card)] bg-soft-gray" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ShopListingBoundary(props: ShopListingProps) {
  return (
    <Suspense fallback={<ShopListingFallback />}>
      <ShopListing {...props} />
    </Suspense>
  );
}

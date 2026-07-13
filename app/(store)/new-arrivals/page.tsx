import type { Metadata } from "next";
import { getActiveProducts } from "@/data/products";
import { brand } from "@/data/store-config";
import { ShopListingBoundary } from "@/components/commerce/ShopListingBoundary";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: `Discover the latest additions to ${brand.publicName} — new dolls, play sets, creative kits and family games.`,
};

export default function NewArrivalsPage() {
  return (
    <div className="container-store py-10 md:py-14">
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">New</p>
        <h1 className="mt-2 font-display text-4xl text-navy md:text-5xl">New arrivals</h1>
        <p className="mt-3 text-lg text-text-secondary">
          Fresh picks across imaginative play, building, creative activities and family games — always with age
          guidance and applicable warnings on each product page.
        </p>
      </header>
      <ShopListingBoundary
        products={getActiveProducts()}
        baseFilters={{ newArrival: true }}
        emptyMessage="No new arrivals match your filters right now."
      />
    </div>
  );
}

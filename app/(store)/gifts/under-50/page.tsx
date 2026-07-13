import type { Metadata } from "next";
import { getActiveProducts } from "@/data/products";
import { brand, giftConfig } from "@/data/store-config";
import { ShopListingBoundary } from "@/components/commerce/ShopListingBoundary";

export const metadata: Metadata = {
  title: "Gifts Under $50",
  description: `Gift-worthy toys under $50 from ${brand.publicName} — building sets, art kits and family games.`,
};

export default function GiftsUnder50Page() {
  return (
    <div className="container-store py-10 md:py-14">
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">Gifts</p>
        <h1 className="mt-2 font-display text-4xl text-navy md:text-5xl">Gifts under $50</h1>
        <p className="mt-3 text-lg text-text-secondary">
          Building sets, art kits, playsets and family games in a mid-range budget.
          {giftConfig.giftNotesEnabled ? " Add a gift note at checkout." : " Verify age guidance on each product page."}
        </p>
      </header>
      <ShopListingBoundary
        products={getActiveProducts().filter((product) => product.giftEligible)}
        baseFilters={{ under50: true }}
        emptyMessage="No gift-eligible products under $50 match your filters."
      />
    </div>
  );
}

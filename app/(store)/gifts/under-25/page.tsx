import type { Metadata } from "next";
import { getActiveProducts } from "@/data/products";
import { brand, giftConfig } from "@/data/store-config";
import { ShopListingBoundary } from "@/components/commerce/ShopListingBoundary";

export const metadata: Metadata = {
  title: "Gifts Under $25",
  description: `Thoughtful toy gifts under $25 from ${brand.publicName}. plush friends, games and creative starters.`,
};

export default function GiftsUnder25Page() {
  return (
    <div className="container-store py-10 md:py-14">
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">Gifts</p>
        <h1 className="mt-2 font-display text-4xl text-navy md:text-5xl">Gifts under $25</h1>
        <p className="mt-3 text-lg text-text-secondary">
          Small but meaningful gifts. plush friends, beginner games and creative starters.
          {giftConfig.giftNotesEnabled ? " Add a gift note at checkout." : " Verify age guidance on each product page."}
        </p>
      </header>
      <ShopListingBoundary
        products={getActiveProducts().filter((product) => product.giftEligible)}
        baseFilters={{ under25: true }}
        emptyMessage="No gift-eligible products under $25 match your filters."
      />
    </div>
  );
}

import type { Metadata } from "next";
import { brand } from "@/data/store-config";
import { WishlistPageContent } from "@/components/commerce/WishlistPageContent";

export const metadata: Metadata = {
  title: "Wishlist",
  description: `Your saved ${brand.publicName} products. review age guidance and details before adding to cart.`,
};

export default function WishlistPage() {
  return (
    <div className="container-store py-10 md:py-14">
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">Saved</p>
        <h1 className="mt-2 font-display text-4xl text-navy md:text-5xl">Wishlist</h1>
        <p className="mt-3 text-lg text-text-secondary">
          Products you have saved for later. Confirm age grades and warnings on each product page before purchase.
        </p>
      </header>
      <WishlistPageContent />
    </div>
  );
}

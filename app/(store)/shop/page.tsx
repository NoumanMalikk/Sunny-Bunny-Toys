import type { Metadata } from "next";
import { getActiveProducts } from "@/data/products";
import { brand } from "@/data/store-config";
import { ShopListingBoundary } from "@/components/commerce/ShopListingBoundary";

export const metadata: Metadata = {
  title: "Shop All Toys",
  description: `Browse the full ${brand.publicName} catalogue. dolls, plush, pretend play, building sets, creative activities, puzzles and outdoor games.`,
};

export default function ShopPage() {
  return (
    <div className="container-store py-10 md:py-14">
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">Shop</p>
        <h1 className="mt-2 font-display text-4xl text-navy md:text-5xl">All products</h1>
        <p className="mt-3 text-lg text-text-secondary">
          Explore our full catalogue of dolls, toys, creative activities and family games. Filter by age, play
          style, price and more.
        </p>
      </header>
      <ShopListingBoundary products={getActiveProducts()} />
    </div>
  );
}

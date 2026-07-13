import type { Metadata } from "next";
import { brand, checkoutConfig } from "@/data/store-config";
import { ComparePageContent } from "@/components/comparison/ComparePageContent";

export const metadata: Metadata = {
  title: "Compare Products",
  description: `Compare up to ${checkoutConfig.maxCompareItems} ${brand.publicName} products side by side by price, age, materials and features.`,
};

export default function ComparePage() {
  return (
    <div className="container-store py-10 md:py-14">
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">Compare</p>
        <h1 className="mt-2 font-display text-4xl text-navy md:text-5xl">Compare products</h1>
        <p className="mt-3 text-lg text-text-secondary">
          Review up to {checkoutConfig.maxCompareItems} products side by side — price, age grade, materials,
          piece count and category-specific details.
        </p>
      </header>
      <ComparePageContent />
    </div>
  );
}

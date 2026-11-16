import type { Metadata } from "next";
import Link from "next/link";
import { GiftFinder } from "@/components/home/GiftFinder";
import { brand, giftConfig } from "@/data/store-config";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Gifts",
  description: `Find thoughtful toy gifts at ${brand.publicName}. browse by age, interest and budget, or shop gifts under $25 and $50.`,
};

export default function GiftsPage() {
  return (
    <>
      <div className="container-store py-10 md:py-14">
        <header className="mb-8 max-w-3xl">
          <p className="eyebrow">Gifts</p>
          <h1 className="mt-2 font-display text-4xl text-navy md:text-5xl">Gift finder & ideas</h1>
          <p className="mt-3 text-lg text-text-secondary">
            For adults choosing a gift. Use the finder below, or browse by price. Every product includes age
            guidance and applicable warnings.
            {giftConfig.giftNotesEnabled ? " Gift notes can be added at checkout." : null}
          </p>
        </header>

        <div className="mb-10 flex flex-wrap gap-3">
          <Button href="/gifts/under-25" variant="outline">
            Gifts under $25
          </Button>
          <Button href="/gifts/under-50" variant="outline">
            Gifts under $50
          </Button>
          <Button href="/shop" variant="ghost">
            Browse all products
          </Button>
        </div>

        <p className="text-sm text-text-secondary">
          Looking for a specific play style?{" "}
          <Link href="/collections/imaginative-play" className="font-semibold text-deep-mint underline-offset-2 hover:underline">
            Imaginative play
          </Link>
          ,{" "}
          <Link href="/collections/family-game-night" className="font-semibold text-deep-mint underline-offset-2 hover:underline">
            family game night
          </Link>
          , or{" "}
          <Link href="/collections/outdoor-fun" className="font-semibold text-deep-mint underline-offset-2 hover:underline">
            outdoor fun
          </Link>
          .
        </p>
      </div>

      <GiftFinder />
    </>
  );
}

import type { Metadata } from "next";
import { brand } from "@/data/store-config";

export const metadata: Metadata = {
  title: "About Sunny Bunny Toy Co.",
  description:
    "Learn about Sunny Bunny Toys LLC, a Moultrie, Georgia-based online toy retailer offering dolls, plush toys, creative activities, puzzles and family games.",
};

export default function AboutPage() {
  return (
    <article className="container-store py-12 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-4 text-mint">About us</p>
        <h1 className="font-display text-3xl leading-tight text-navy md:text-5xl">
          {brand.positioning}
        </h1>
      </div>

      <div className="policy-prose mx-auto mt-10 max-w-3xl">
        <p>
          {brand.legalName} is a Moultrie, Georgia-based online toy retailer offering dolls, plush toys,
          pretend-play sets, building activities, creative products, puzzles and family games.
        </p>
        <p>
          The {brand.publicName} store is designed to help adult buyers explore products by category, play
          style, verified age guidance and budget.
        </p>
        <p>
          Each active product is intended to include exact photography, verified piece counts, product details
          and applicable warnings before purchase.
        </p>
        <p>
          Sunny Bunny&apos;s goal is to make finding a thoughtful toy feel bright, simple and enjoyable.
        </p>
      </div>

      <p className="mx-auto mt-12 max-w-3xl text-center font-editorial text-2xl text-deep-mint md:text-3xl">
        {brand.tagline}
      </p>
    </article>
  );
}

import type { Metadata } from "next";
import { brand } from "@/data/store-config";

export const metadata: Metadata = {
  title: "About Sunny Bunny Toy Co.",
  description:
    "Learn about Sunny Bunny Toys LLC, an online toy retailer in Hamilton Township, New Jersey offering dolls, plush toys, creative activities, puzzles and family games.",
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
          {brand.legalName} is an online toy retailer at {brand.address.line1}, {brand.address.city},{" "}
          New Jersey {brand.address.postalCode}. The shop offers dolls, plush toys, pretend-play sets, building
          activities, creative products, puzzles and family games.
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
          The shop is built for adult buyers who want clear product details, age guidance, and a direct way to order.
        </p>
      </div>

      <p className="mx-auto mt-12 max-w-3xl text-center font-editorial text-2xl text-deep-mint md:text-3xl">
        {brand.tagline}
      </p>
    </article>
  );
}

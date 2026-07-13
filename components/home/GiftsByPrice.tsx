import Link from "next/link";
import { products } from "@/data/products";
import { giftConfig } from "@/data/store-config";
import { formatPrice } from "@/lib/pricing/format";
import { SectionHeader } from "@/components/home/decor/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";

const tiers = [
  {
    id: "under-25",
    label: "Under $25",
    description: "Thoughtful small gifts — plush friends, games and creative starters.",
    filter: (price: number) => price < 25,
    href: "/gifts?budget=under-25",
  },
  {
    id: "under-50",
    label: "Under $50",
    description: "Building sets, art kits and family games in a mid-range budget.",
    filter: (price: number) => price >= 25 && price < 50,
    href: "/gifts?budget=under-50",
  },
  {
    id: "extra-special",
    label: "Extra-Special",
    description: "Playsets, large building collections and standout gift-worthy items.",
    filter: (price: number) => price >= 50,
    href: "/gifts?budget=special",
  },
] as const;

export function GiftsByPrice() {
  return (
    <section aria-labelledby="gifts-by-price-heading" className="bg-soft-gray py-16 md:py-20">
      <div className="container-store">
        <SectionHeader
          eyebrow="Gifts"
          title="Gifts by price"
          description={
            giftConfig.giftNotesEnabled
              ? "Add a gift note at checkout to include a personal message with your order."
              : "Browse gift ideas by budget — verify age guidance on each product page."
          }
          href="/gifts"
          linkLabel="Shop all gifts"
        />

        {giftConfig.giftWrapEnabled ? (
          <p className="-mt-4 mb-8 text-sm text-text-secondary">
            Optional gift wrap available at checkout for {formatPrice(giftConfig.giftWrapPrice)}.
          </p>
        ) : null}

        <div className="space-y-12">
          {tiers.map((tier) => {
            const tierProducts = products.filter((p) => p.active && p.giftEligible && tier.filter(p.price)).slice(0, 3);

            return (
              <div key={tier.id}>
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-navy">{tier.label}</h3>
                    <p className="mt-1 text-sm text-text-secondary">{tier.description}</p>
                  </div>
                  <Button href={tier.href} variant="outline" size="sm">
                    View all {tier.label.toLowerCase()}
                  </Button>
                </div>
                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
                  {tierProducts.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {giftConfig.giftNotesEnabled ? (
          <p className="mt-10 text-center text-sm text-text-secondary">
            Gift notes can be added during checkout.{" "}
            <Link href="/gifts" className="font-semibold text-deep-mint underline-offset-2 hover:underline">
              See gift policies
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}

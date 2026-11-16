import Image from "next/image";
import { getProductBySlug } from "@/data/products";
import { SectionHeader } from "@/components/home/decor/SectionHeader";
import { AgeBadge } from "@/components/product/AgeBadge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utilities/cn";

const bentoItems = [
  {
    slug: "colorway-magnetic-building-tiles-64-piece",
    size: "large" as const,
    accent: "#79C9F4",
  },
  {
    slug: "busy-gears-construction-set-82-piece",
    size: "medium" as const,
    accent: "#F5B83D",
  },
  {
    slug: "junior-space-discovery-kit",
    size: "medium" as const,
    accent: "#55CFA8",
  },
  {
    slug: "dinosaur-discovery-dig-kit",
    size: "small" as const,
    accent: "#FF7968",
  },
];

const sizeClasses = {
  large: "md:col-span-2 md:row-span-2 min-h-[320px]",
  medium: "md:col-span-1 md:row-span-1 min-h-[240px]",
  small: "md:col-span-1 md:row-span-1 min-h-[200px]",
};

export function BuildDiscoverBento() {
  return (
    <section aria-labelledby="build-discover-heading" className="container-store py-16 md:py-20">
      <SectionHeader
        eyebrow="Build & discover"
        title="Stack, connect and explore"
        description="Building tiles, gear sets, discovery kits, and dig projects, with piece counts and age grades on each product page."
        href="/build-learn"
        linkLabel="Shop Build & Learn"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5">
        {bentoItems.map((item) => {
          const product = getProductBySlug(item.slug);
          if (!product) return null;
          const image = product.images[0];

          return (
            <article
              key={item.slug}
              className={cn(
                "group relative overflow-hidden rounded-[var(--radius-editorial)] border border-border bg-cloud shadow-soft",
                sizeClasses[item.size],
              )}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{ background: `linear-gradient(135deg, ${item.accent}33, transparent 60%)` }}
                aria-hidden="true"
              />
              <div className="relative flex h-full flex-col p-6 md:p-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  <AgeBadge ageMinimum={product.ageMinimum} ageMaximum={product.ageMaximum} />
                  {product.pieceCount ? (
                    <span className="rounded-full bg-sky/15 px-3 py-1 font-ui text-xs font-semibold text-navy">
                      {product.pieceCount} pieces
                    </span>
                  ) : null}
                </div>
                <h3 className="font-display text-xl text-navy md:text-2xl">{product.title}</h3>
                <p className="mt-2 max-w-sm text-sm text-text-secondary">{product.shortDescription}</p>

                <div
                  className={cn(
                    "relative mx-auto mt-auto w-full",
                    item.size === "large" ? "max-w-[280px] aspect-square" : "max-w-[180px] aspect-square",
                  )}
                >
                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain transition-transform duration-[var(--motion-ui)] group-hover:scale-105"
                      sizes="(max-width: 768px) 80vw, 30vw"
                    />
                  ) : null}
                </div>

                <Button
                  href={`/product/${item.slug}`}
                  variant="outline"
                  className="relative z-10 mt-4 w-fit"
                >
                  View product
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

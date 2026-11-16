import { Image } from "@/components/ui/StaticImage";
import Link from "next/link";
import { ageGroups } from "@/data/categories";
import { getActiveProducts } from "@/data/products";
import { SectionHeader } from "@/components/home/decor/SectionHeader";
import { cn } from "@/lib/utilities/cn";

const ageAccents = ["#17324D", "#E2A20A", "#C5362B", "#C48A08"];

const ageProductSlugs = [
  "honeyhop-plush-bunny-12-inch",
  "meadow-memory-match-game-36-pairs",
  "busy-gears-construction-set-82-piece",
  "happy-trails-family-charades-120-cards",
] as const;

function ageOverlaps(
  productMin: number,
  productMax: number | null,
  groupMin: number,
  groupMax: number | null,
) {
  const pMax = productMax ?? 99;
  const gMax = groupMax ?? 99;
  return productMin <= gMax && pMax >= groupMin;
}

export function ShopByAgeSection() {
  const products = getActiveProducts();

  return (
    <section aria-labelledby="shop-by-age-heading" className="home-section relative overflow-hidden">
      <div className="container-store relative">
        <SectionHeader
          eyebrow="Shop by age"
          title="Find a great match for their stage"
          description="Browse by age range to narrow the options. Confirm the age grade and warnings on each product page before purchase."
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5" role="list">
          {ageGroups.map((group, index) => {
            const sample =
              products.find((p) => p.slug === ageProductSlugs[index]) ??
              products.find((p) =>
                ageOverlaps(p.ageMinimum, p.ageMaximum, group.min, group.max ?? null),
              );
            const image = sample?.images[0];

            return (
              <li key={group.id} className="h-full">
                <Link
                  href={group.href}
                  className={cn(
                    "group flex h-full min-h-[280px] flex-col overflow-hidden rounded-[var(--radius-editorial)]",
                    "border border-white/80 bg-cloud shadow-[0_14px_34px_rgba(32,50,71,0.08)]",
                    "transition-all duration-[var(--motion-ui)] hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(32,50,71,0.14)]",
                  )}
                >
                  <div
                    className="relative aspect-[5/4] bg-white"
                    style={{
                      background: `linear-gradient(165deg, ${ageAccents[index]}22, #ffffff 60%)`,
                    }}
                  >
                    {image ? (
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        className="object-contain p-5 transition-transform duration-[var(--motion-ui)] group-hover:scale-105"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                    <div>
                      <span
                        className="mb-3 inline-block rounded-full px-3 py-1 font-ui text-xs font-bold uppercase tracking-wider text-navy"
                        style={{ background: `${ageAccents[index]}33` }}
                      >
                        {group.label}
                      </span>
                      <p className="text-sm leading-relaxed text-text-secondary">{group.description}</p>
                    </div>
                    <span className="font-display text-lg text-navy transition-colors group-hover:text-deep-mint">
                      Shop collection →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-center text-sm text-text-secondary">
          Every product includes age guidance and applicable warnings.{" "}
          <Link href="/product-safety" className="font-semibold text-deep-mint underline-offset-2 hover:underline">
            Learn about product safety
          </Link>
        </p>
      </div>
    </section>
  );
}

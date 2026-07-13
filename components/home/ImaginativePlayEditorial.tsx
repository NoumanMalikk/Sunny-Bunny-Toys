import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/brand/BrandMark";
import { CloudDecor } from "@/components/home/decor/CloudDecor";
import { PaperCutHillsMint } from "@/components/home/decor/PaperCutHills";
import { cn } from "@/lib/utilities/cn";

const floatingProducts = [
  "honeyhop-plush-bunny-12-inch",
  "daisy-mae-soft-doll-14-inch",
  "sunny-cottage-dollhouse-playset-20-piece",
] as const;

const floatPositions = [
  "left-[4%] top-[18%] -rotate-6 md:left-[8%] md:top-[22%]",
  "right-[6%] top-[8%] rotate-3 md:right-[12%] md:top-[12%]",
  "bottom-[22%] left-[18%] rotate-6 md:bottom-[26%] md:left-[24%]",
];

export function ImaginativePlayEditorial() {
  return (
    <section
      aria-labelledby="imaginative-editorial-heading"
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div className="paper-cut absolute inset-0" aria-hidden="true" />
      <CloudDecor size="lg" className="absolute right-[10%] top-[10%] text-lavender/40" />

      <div className="container-wide relative grid items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <div className="relative z-10 max-w-xl">
          <p className="eyebrow mb-3 text-lavender">Imaginative Play</p>
          <h2 id="imaginative-editorial-heading" className="font-display text-3xl leading-tight text-navy md:text-5xl">
            Stories Start Here
          </h2>
          <p className="mt-5 font-editorial text-lg leading-relaxed text-text-secondary md:text-xl">
            Turn an ordinary afternoon into a tea party, a market run or a cozy cottage adventure. Soft dolls,
            plush friends and pretend-play sets invite open-ended stories. with age guidance and warnings
            clearly listed on every product page.
          </p>
          <Button href="/collections/imaginative-play" size="lg" className="mt-8">
            Shop Imaginative Play
          </Button>
        </div>

        <div className="relative min-h-[380px] md:min-h-[460px]">
          <div
            className="absolute inset-0 rounded-[var(--radius-editorial)] border border-border bg-gradient-to-br from-lavender/15 via-cream to-peach/20 shadow-soft"
            aria-hidden="true"
          >
            <BrandMark className="absolute right-6 top-6 h-12 w-12 opacity-30 md:h-16 md:w-16" />
            <PaperCutHillsMint className="absolute bottom-0 left-0 right-0 h-20" />
          </div>

          {floatingProducts.map((slug, index) => {
            const product = getProductBySlug(slug);
            if (!product) return null;
            const image = product.images[0];

            return (
              <Link
                key={slug}
                href={`/product/${slug}`}
                className={cn(
                  "absolute z-10 w-36 overflow-hidden rounded-[var(--radius-card)] border border-border bg-cloud p-3 shadow-lift",
                  "transition-transform duration-[var(--motion-ui)] hover:-translate-y-2 md:w-44",
                  floatPositions[index],
                )}
              >
                {image ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={160}
                    height={160}
                    className="mx-auto object-contain"
                  />
                ) : null}
                <p className="mt-2 line-clamp-2 text-center font-ui text-xs font-semibold text-navy">
                  {product.title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

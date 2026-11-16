import { Image } from "@/components/ui/StaticImage";
import Link from "next/link";
import { getProductBySlug } from "@/data/products";
import { cn } from "@/lib/utilities/cn";

const mosaicItems = [
  { slug: "honeyhop-plush-bunny-12-inch", span: "md:col-span-2 md:row-span-2" },
  { slug: "colorway-magnetic-building-tiles-64-piece", span: "md:col-span-1 md:row-span-1" },
  { slug: "washable-art-studio-set-48-piece", span: "md:col-span-1 md:row-span-1" },
  { slug: "meadow-memory-match-game-36-pairs", span: "md:col-span-1 md:row-span-2" },
  { slug: "sunshine-ring-toss-game", span: "md:col-span-1 md:row-span-1" },
  { slug: "sunny-cottage-dollhouse-playset-20-piece", span: "md:col-span-2 md:row-span-1" },
] as const;

const accentBg = ["from-sunshine/20", "from-navy/10", "from-coral/15", "from-sunshine/15", "from-navy/10", "from-coral/10"];

export function EditorialMosaic() {
  return (
    <section aria-labelledby="editorial-mosaic-heading" className="container-wide py-16 md:py-20">
      <div className="mb-8 text-center">
        <p className="eyebrow mb-2">From the playroom</p>
        <h2 id="editorial-mosaic-heading" className="font-display text-3xl text-navy md:text-4xl">
          A sunlit collection
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-text-secondary md:text-base">
          Studio photography for the current catalogue, each item on a clean white background.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-3 md:gap-4">
        {mosaicItems.map((item, index) => {
          const product = getProductBySlug(item.slug);
          if (!product) return null;
          const image = product.images[0];

          return (
            <Link
              key={item.slug}
              href={`/product/${item.slug}`}
              className={cn(
                "group relative min-h-[160px] overflow-hidden rounded-[var(--radius-card)] border border-border bg-cloud shadow-soft",
                "transition-transform duration-[var(--motion-ui)] hover:-translate-y-1 hover:shadow-lift",
                item.span,
                index === 0 && "min-h-[220px]",
              )}
            >
              <div
                className={cn("absolute inset-0 bg-gradient-to-br to-soft-gray", accentBg[index % accentBg.length])}
                aria-hidden="true"
              />
              {image ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain p-4 transition-transform duration-[var(--motion-ui)] group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : null}
              <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/70 to-transparent p-3 pt-8 font-ui text-xs font-semibold text-cloud opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {product.title}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

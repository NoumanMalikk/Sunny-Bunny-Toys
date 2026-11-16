import { Image } from "@/components/ui/StaticImage";
import Link from "next/link";
import { getProductBySlug } from "@/data/products";
import { Button } from "@/components/ui/Button";

const outdoorSlugs = [
  "sunshine-ring-toss-game",
  "jumbo-bubble-wand-set-12-piece",
  "sunny-day-scavenger-hunt-50-cards",
] as const;

export function OutdoorPanorama() {
  const products = outdoorSlugs.map((slug) => getProductBySlug(slug)).filter(Boolean);

  return (
    <section aria-labelledby="outdoor-heading" className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-sunshine/15" aria-hidden="true" />

      <div className="container-wide relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3 text-coral">Outdoor play</p>
          <h2 id="outdoor-heading" className="font-display text-3xl leading-tight text-navy md:text-5xl">
            Take play into the sunshine.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
            Ring toss, bubble wands, and scavenger-hunt cards for open spaces. Use them in safe areas away from roads
            and glass, with adult supervision where the product page says so.
          </p>
        </div>

        <div className="relative mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {products.map((product, index) => {
            if (!product) return null;
            const image = product.images[0];

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group relative overflow-hidden rounded-[var(--radius-editorial)] border border-border bg-cloud shadow-soft transition-transform duration-[var(--motion-ui)] hover:-translate-y-2 hover:shadow-lift"
                style={{ marginTop: index === 1 ? "-1rem" : undefined }}
              >
                <div className="relative aspect-[4/3] bg-soft-gray p-6">
                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain p-4 transition-transform duration-[var(--motion-ui)] group-hover:scale-105"
                      sizes="33vw"
                    />
                  ) : null}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-navy">{product.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{product.keyDetail}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button href="/outdoor-play" size="lg">
            Shop outdoor play
          </Button>
        </div>
      </div>
    </section>
  );
}

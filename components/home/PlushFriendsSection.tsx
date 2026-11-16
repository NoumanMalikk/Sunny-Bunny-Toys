"use client";

import { Image } from "@/components/ui/StaticImage";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { getProductBySlug } from "@/data/products";
import { formatPrice } from "@/lib/pricing/format";
import { cn } from "@/lib/utilities/cn";
import { SectionHeader } from "@/components/home/decor/SectionHeader";
import { Button } from "@/components/ui/Button";
import { useWishlistStore } from "@/lib/cart/wishlist-store";

const plushSlugs = [
  "honeyhop-plush-bunny-12-inch",
  "clover-plush-bear-14-inch",
  "peachy-paws-plush-puppy-13-inch",
  "lavender-lark-plush-unicorn-15-inch",
] as const;

export function PlushFriendsSection() {
  const products = plushSlugs.map((slug) => getProductBySlug(slug)).filter(Boolean);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const hasWishlist = useWishlistStore((s) => s.has);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const frame = requestAnimationFrame(() => onSelect());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section aria-labelledby="plush-friends-heading" className="bg-soft-gray py-16 md:py-20">
      <div className="container-store">
        <SectionHeader
          eyebrow="Plush friends"
          title="Soft companions for every story"
          description="Honeyhop, Clover, Peachy Paws, and Lavender Lark, with height, price, and wishlist on each card."
          href="/dolls-plush"
          linkLabel="Shop all plush"
        />

        <div className="mb-4 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label="Previous plush friends"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label="Next plush friends"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </div>

        <div ref={emblaRef} className="overflow-hidden" role="region" aria-label="Plush friends carousel">
          <ul className="flex gap-5" role="list">
            {products.map((product) => {
              if (!product) return null;
              const image = product.images[0];
              const wishlisted = hasWishlist(product.id);

              return (
                <li
                  key={product.id}
                  className="min-w-0 shrink-0 grow-0 basis-[75%] sm:basis-[45%] lg:basis-[24%]"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-cloud shadow-soft">
                    <Link href={`/product/${product.slug}`} className="relative block aspect-square bg-soft-gray p-6">
                      {image ? (
                        <Image src={image.src} alt={image.alt} fill className="object-contain p-4" sizes="25vw" />
                      ) : null}
                    </Link>
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <h3 className="font-display text-lg leading-snug text-navy">{product.title.split(",")[0]}</h3>
                      <div className="flex items-center justify-between gap-2">
                        {product.heightDisplay ? (
                          <span className="rounded-full bg-lavender/15 px-3 py-1 font-ui text-xs font-semibold text-navy">
                            {product.heightDisplay}
                          </span>
                        ) : null}
                        <span className="font-ui text-lg font-bold tabular text-navy">{formatPrice(product.price)}</span>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-auto w-full"
                        aria-pressed={wishlisted}
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart className={cn("size-4", wishlisted && "fill-coral text-coral")} aria-hidden="true" />
                        {wishlisted ? "Saved" : "Add to wishlist"}
                      </Button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

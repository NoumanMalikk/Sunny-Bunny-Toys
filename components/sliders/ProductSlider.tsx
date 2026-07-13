"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/types/product";
import { cn } from "@/lib/utilities/cn";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";

export type ProductSliderProps = {
  products: Product[];
  title?: string;
  className?: string;
  ariaLabel?: string;
};

export function ProductSlider({
  products,
  title,
  className,
  ariaLabel = "Product carousel",
}: ProductSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollPrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollNext();
    }
  };

  if (products.length === 0) return null;

  return (
    <section className={cn("w-full", className)} aria-label={ariaLabel}>
      {title ? (
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl text-navy">{title}</h2>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-label="Previous products"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-label="Next products"
              onClick={scrollNext}
              disabled={!canScrollNext}
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      ) : null}

      <div
        ref={emblaRef}
        className="overflow-hidden"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
      >
        <ul className="flex touch-pan-y gap-4" role="list">
          {products.map((product, index) => (
            <li
              key={product.id}
              className="min-w-0 shrink-0 grow-0 basis-[80%] sm:basis-[45%] lg:basis-[23%]"
              aria-hidden={index !== selectedIndex ? undefined : undefined}
            >
              <ProductCard product={product} priority={index < 4} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import type { ProductImage } from "@/lib/types/product";
import { cn } from "@/lib/utilities/cn";
import { Modal } from "@/components/ui/Modal";

export type ProductGalleryProps = {
  images: ProductImage[];
  title: string;
  className?: string;
};

export function ProductGallery({ images, title, className }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const activeImage = images[activeIndex] ?? images[0];

  const openZoom = useCallback(() => {
    if (activeImage) setZoomOpen(true);
  }, [activeImage]);

  if (!activeImage) {
    return (
      <div
        className={cn(
          "flex aspect-square items-center justify-center rounded-[var(--radius-card)] border border-border bg-soft-gray text-sm text-text-secondary",
          className,
        )}
      >
        Product image unavailable
      </div>
    );
  }

  return (
    <>
      <div className={cn("space-y-4", className)}>
        <button
          type="button"
          onClick={openZoom}
          className="group relative block w-full overflow-hidden rounded-[var(--radius-card)] border border-border bg-soft-gray p-6 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine"
          aria-label={`Zoom ${activeImage.alt}`}
        >
          <div className="relative aspect-square w-full">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              priority
            />
          </div>
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-cloud/90 px-3 py-1.5 font-ui text-xs font-semibold text-navy shadow-soft">
            <ZoomIn className="size-3.5" aria-hidden="true" />
            Zoom
          </span>
        </button>

        {images.length > 1 ? (
          <ul className="flex flex-wrap gap-2" role="list" aria-label="Product image thumbnails">
            {images.map((image, index) => (
              <li key={`${image.src}-${index}`}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative size-16 overflow-hidden rounded-[var(--radius-btn)] border-2 bg-soft-gray p-1 transition-colors",
                    index === activeIndex ? "border-navy" : "border-border hover:border-navy/40",
                  )}
                  aria-label={`Show image ${index + 1}: ${image.alt}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                >
                  <Image src={image.src} alt="" fill sizes="64px" className="object-contain" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <Modal open={zoomOpen} onClose={() => setZoomOpen(false)} title={title} size="lg">
        <div className="relative mx-auto aspect-square max-h-[70vh] w-full bg-soft-gray p-8">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-contain"
          />
        </div>
        <p className="mt-4 text-center text-sm text-text-secondary">{activeImage.alt}</p>
      </Modal>
    </>
  );
}

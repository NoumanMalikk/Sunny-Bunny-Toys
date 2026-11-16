import { Image } from "@/components/ui/StaticImage";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { playPathCards } from "@/data/categories";
import { getProductBySlug } from "@/data/products";
import { cn } from "@/lib/utilities/cn";

export function PlayPathNav() {
  return (
    <nav
      aria-label="Explore by play path"
      className="relative z-20 -mt-10 px-4 md:-mt-14 md:px-6"
    >
      <ul className="container-wide grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {playPathCards.map((card) => {
          const product = getProductBySlug(card.productSlug);
          const imageSrc = product?.images[0]?.src ?? `/products/${card.productSlug}/main.webp`;

          return (
            <li key={card.id} className="h-full">
              <Link
                href={card.href}
                aria-label={`Shop ${card.label}`}
                className={cn(
                  "group flex h-full min-h-[178px] flex-col overflow-hidden rounded-[var(--radius-category)]",
                  "border border-white/80 bg-cloud/95 shadow-[0_14px_34px_rgba(32,50,71,0.1)] backdrop-blur-sm",
                  "transition-all duration-[var(--motion-ui)] hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(32,50,71,0.14)]",
                )}
              >
                <div
                  className="relative aspect-square overflow-hidden bg-white"
                  style={{
                    background: `linear-gradient(165deg, ${card.accent}18, #ffffff 55%)`,
                  }}
                >
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    className="object-contain p-4 transition-transform duration-[var(--motion-ui)] group-hover:scale-105"
                    sizes="(max-width: 768px) 45vw, 16vw"
                  />
                </div>
                <div className="flex flex-1 items-center justify-between gap-2 px-3 py-3.5">
                  <span className="font-display text-lg text-navy md:text-xl">{card.label}</span>
                  <span
                    className="inline-flex size-8 items-center justify-center rounded-full text-navy"
                    style={{ background: `${card.accent}33` }}
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

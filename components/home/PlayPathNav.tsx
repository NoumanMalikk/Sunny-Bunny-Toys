import Image from "next/image";
import Link from "next/link";
import { playPathCards } from "@/data/categories";
import { getProductBySlug } from "@/data/products";
import { cn } from "@/lib/utilities/cn";

export function PlayPathNav() {
  return (
    <nav
      aria-label="Explore by play path"
      className="relative z-20 -mt-14 px-4 md:-mt-20 md:px-6"
    >
      <ul className="container-wide grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {playPathCards.map((card) => {
          const product = getProductBySlug(card.productSlug);
          const imageSrc = product?.images[0]?.src ?? `/products/${card.productSlug}/main.svg`;

          return (
            <li key={card.id}>
              <Link
                href={card.href}
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-[var(--radius-category)] border border-border bg-cloud shadow-soft",
                  "transition-transform duration-[var(--motion-ui)] hover:-translate-y-1 hover:shadow-lift",
                )}
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden"
                  style={{ background: `linear-gradient(160deg, ${card.accent}22, var(--soft-gray))` }}
                >
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    className="object-contain p-4 transition-transform duration-[var(--motion-ui)] group-hover:scale-105"
                    sizes="(max-width: 768px) 45vw, 16vw"
                  />
                </div>
                <div className="flex flex-1 items-center justify-center px-3 py-4">
                  <span
                    className="font-display text-lg text-navy md:text-xl"
                    style={{ color: card.accent }}
                  >
                    {card.label}
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

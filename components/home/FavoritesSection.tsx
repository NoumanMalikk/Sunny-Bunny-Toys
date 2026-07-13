"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types/product";
import { getFeaturedProducts } from "@/data/products";
import { formatPrice } from "@/lib/pricing/format";
import { canAddToCart } from "@/lib/safety/product-activation";
import { cn } from "@/lib/utilities/cn";
import { SectionHeader } from "@/components/home/decor/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AgeBadge } from "@/components/product/AgeBadge";
import { useCartStore } from "@/lib/cart/store";
import { useWishlistStore } from "@/lib/cart/wishlist-store";

function FeaturedCard({ product, label }: { product: Product; label: string }) {
  const add = useCartStore((s) => s.add);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));
  const activation = canAddToCart(product);
  const image = product.images[0];

  return (
    <article className="product-card group relative flex h-full min-h-0 flex-col">
      <Link href={`/product/${product.slug}`} className="flex flex-1 flex-col gap-3">
        <div className="product-card-image relative">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={400}
              className="object-contain"
            />
          ) : null}
          <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
            <Badge variant="featured" className="bg-sunshine text-navy">
              {label}
            </Badge>
            <AgeBadge ageMinimum={product.ageMinimum} ageMaximum={product.ageMaximum} />
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="absolute right-2 top-2 size-9 p-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isWishlisted}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
          >
            <Heart className={cn("size-4", isWishlisted && "fill-coral text-coral")} aria-hidden="true" />
          </Button>
        </div>
        <h3 className="line-clamp-title font-display text-base leading-snug text-navy">{product.title}</h3>
        <p className="text-sm text-text-secondary">{product.keyDetail}</p>
        <p className="mt-auto font-ui text-lg font-bold tabular text-navy">{formatPrice(product.price)}</p>
      </Link>
      <div className="mt-3">
        {activation.canPurchase ? (
          <Button type="button" className="w-full" onClick={() => add(product, 1)}>
            <ShoppingBag className="size-4" aria-hidden="true" />
            Add to cart
          </Button>
        ) : (
          <Button href={`/product/${product.slug}`} variant="outline" className="w-full">
            View details
          </Button>
        )}
      </div>
    </article>
  );
}

export function FavoritesSection() {
  const products = getFeaturedProducts(6);

  return (
    <section aria-labelledby="favorites-heading" className="container-store py-16 md:py-20">
      <SectionHeader
        eyebrow="Curated for you"
        title="Playroom favorites"
        description="Handpicked dolls, building sets, games and creative kits from our catalogue — each labeled with age guidance on the product page."
        href="/collections/featured"
        linkLabel="Browse favorites"
      />
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {products.map((product, index) => (
          <li key={product.id} className="h-full">
            <FeaturedCard
              product={product}
              label={index % 2 === 0 ? "Sunny Bunny Pick" : "Featured"}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

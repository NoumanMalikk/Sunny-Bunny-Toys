"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types/product";
import { formatPrice } from "@/lib/pricing/format";
import { canAddToCart } from "@/lib/safety/product-activation";
import { cn } from "@/lib/utilities/cn";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Announcer } from "@/components/ui/Announcer";
import { useCartStore } from "@/lib/cart/store";
import { useWishlistStore } from "@/lib/cart/wishlist-store";
import { AgeBadge } from "@/components/product/AgeBadge";
import { WarningIndicator } from "@/components/product/WarningBanner";
import { QuickView } from "@/components/product/QuickView";

export type ProductCardProps = {
  product: Product;
  className?: string;
  priority?: boolean;
};

function categoryName(category: Product["category"]) {
  return categories.find((c) => c.id === category)?.name ?? category;
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const add = useCartStore((s) => s.add);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));

  const activation = canAddToCart(product);
  const mainImage = product.images[0];
  const detailLine = product.pieceCount
    ? `${product.pieceCount} pieces · ${product.keyDetail}`
    : product.keyDetail;

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const result = add(product, 1);
    setAnnouncement(
      result.ok ? `${product.title} added to cart` : (result.message ?? "Unable to add to cart"),
    );
  };

  const handleWishlist = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWishlist(product.id);
    setAnnouncement(isWishlisted ? `${product.title} removed from wishlist` : `${product.title} saved to wishlist`);
  };

  const handleQuickView = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <Announcer message={announcement} />
      <article className={cn("product-card group relative", className)}>
        <Link href={`/product/${product.slug}`} className="flex h-full flex-col gap-3">
          <div className="product-card-image relative">
            {mainImage ? (
              <Image
                src={mainImage.src}
                alt={mainImage.alt}
                width={400}
                height={400}
                priority={priority}
                className="object-contain"
              />
            ) : null}
            <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
              <AgeBadge ageMinimum={product.ageMinimum} ageMaximum={product.ageMaximum} />
              <WarningIndicator
                warningRequired={product.warningRequired}
                warningText={product.warningText}
              />
            </div>
            <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="size-9 p-0"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={isWishlisted}
                onClick={handleWishlist}
              >
                <Heart className={cn("size-4", isWishlisted && "fill-coral text-coral")} aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="size-9 p-0"
                aria-label={`Quick view ${product.title}`}
                onClick={handleQuickView}
              >
                <Eye className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <Badge variant="category" className="w-fit">
              {categoryName(product.category)}
            </Badge>
            <h3 className="line-clamp-title font-display text-base leading-snug text-navy">{product.title}</h3>
            <p className="text-sm text-text-secondary">{detailLine}</p>
            <p className="mt-auto font-ui text-lg font-bold tabular text-navy">{formatPrice(product.price)}</p>
          </div>
        </Link>

        <div className="mt-3">
          {activation.canPurchase ? (
            <Button type="button" className="w-full" onClick={handleAddToCart}>
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

      <QuickView product={product} open={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </>
  );
}

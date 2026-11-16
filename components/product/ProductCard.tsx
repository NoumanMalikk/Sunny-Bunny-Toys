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
import { useCartUiStore } from "@/lib/cart/ui-store";
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
  const openCart = useCartUiStore((s) => s.open);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));

  const activation = canAddToCart(product);
  const mainImage = product.images[0];
  const pieceLabel = product.pieceCount ? `${product.pieceCount} pieces` : null;
  const detailAlreadyCountsPieces = pieceLabel
    ? product.keyDetail.toLowerCase().includes("piece")
    : false;
  const detailLine =
    pieceLabel && !detailAlreadyCountsPieces
      ? `${pieceLabel} · ${product.keyDetail}`
      : product.keyDetail;

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const result = add(product, 1);
    if (result.ok) {
      setAnnouncement(`${product.title} added to cart`);
      openCart();
    } else {
      setAnnouncement(result.message ?? "Unable to add to cart");
    }
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
        <Link href={`/product/${product.slug}`} className="flex h-full flex-col">
          <div className="product-card-image">
            {mainImage ? (
              <Image
                src={mainImage.src}
                alt={mainImage.alt}
                width={480}
                height={480}
                priority={priority}
                className="object-contain transition-transform duration-[var(--motion-ui)] group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : null}
            <div className="absolute left-2 top-2 z-10 flex max-w-[75%] flex-wrap gap-1.5">
              <AgeBadge ageMinimum={product.ageMinimum} ageMaximum={product.ageMaximum} />
              <WarningIndicator
                warningRequired={product.warningRequired}
                warningText={product.warningText}
              />
            </div>
            <div className="absolute right-2 top-2 z-10 flex gap-1 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100 md:group-focus-within:opacity-100">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="size-9 border border-border/80 bg-cloud/95 p-0 shadow-soft"
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
                className="size-9 border border-border/80 bg-cloud/95 p-0 shadow-soft"
                aria-label={`Quick view ${product.title}`}
                onClick={handleQuickView}
              >
                <Eye className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="product-card-body">
            <Badge variant="category" className="w-fit">
              {categoryName(product.category)}
            </Badge>
            <h3 className="line-clamp-title font-display text-[0.98rem] leading-snug text-navy md:text-base">
              {product.title}
            </h3>
            <p className="product-card-detail line-clamp-1">{detailLine}</p>
            <p className="product-card-price">{formatPrice(product.price)}</p>
          </div>
        </Link>

        <div className="product-card-actions">
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

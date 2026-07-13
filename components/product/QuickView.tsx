"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types/product";
import { formatPrice } from "@/lib/pricing/format";
import { canAddToCart } from "@/lib/safety/product-activation";
import { cn } from "@/lib/utilities/cn";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Announcer } from "@/components/ui/Announcer";
import { useCartStore } from "@/lib/cart/store";
import { useCartUiStore } from "@/lib/cart/ui-store";
import { useWishlistStore } from "@/lib/cart/wishlist-store";
import { AgeBadge } from "@/components/product/AgeBadge";
import { WarningBanner } from "@/components/product/WarningBanner";

export type QuickViewProps = {
  product: Product;
  open: boolean;
  onClose: () => void;
};

export function QuickView({ product, open, onClose }: QuickViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [announcement, setAnnouncement] = useState("");
  const add = useCartStore((s) => s.add);
  const openCart = useCartUiStore((s) => s.open);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));

  const activation = canAddToCart(product);
  const mainImage = product.images[0];
  const maxQty = product.maximumOrderQuantity;

  const handleAdd = () => {
    const result = add(product, quantity);
    if (result.ok) {
      setAnnouncement(`${quantity} × ${product.title} added to cart`);
      onClose();
      openCart();
    } else {
      setAnnouncement(result.message ?? "Unable to add to cart");
    }
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    setAnnouncement(isWishlisted ? "Removed from wishlist" : "Saved to wishlist");
  };

  return (
    <>
      <Announcer message={announcement} />
      <Drawer open={open} onClose={onClose} title={product.title} description={product.subtitle}>
        <div className="flex flex-col gap-5">
          <div className="product-card-image">
            {mainImage ? (
              <Image
                src={mainImage.src}
                alt={mainImage.alt}
                width={480}
                height={480}
                className="object-contain"
              />
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <AgeBadge ageMinimum={product.ageMinimum} ageMaximum={product.ageMaximum} />
            <p className="font-ui text-2xl font-bold tabular text-navy">{formatPrice(product.price)}</p>
          </div>

          {product.warningRequired && product.warningText ? (
            <WarningBanner warningText={product.warningText} compact />
          ) : null}

          {product.pieceCount ? (
            <p className="text-sm text-text-secondary">
              <span className="font-semibold text-navy">{product.pieceCount} pieces</span>
              {product.keyDetail ? ` · ${product.keyDetail}` : null}
            </p>
          ) : (
            <p className="text-sm text-text-secondary">{product.keyDetail}</p>
          )}

          <p className="text-sm leading-relaxed text-text">{product.shortDescription}</p>

          {activation.canPurchase ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-[var(--radius-btn)] border border-border">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="size-10 rounded-none"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="size-4" aria-hidden="true" />
                </Button>
                <span className="min-w-10 text-center font-ui font-semibold tabular" aria-live="polite">
                  {quantity}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="size-10 rounded-none"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                  disabled={quantity >= maxQty}
                >
                  <Plus className="size-4" aria-hidden="true" />
                </Button>
              </div>
              <Button type="button" className="flex-1" onClick={handleAdd}>
                <ShoppingBag className="size-4" aria-hidden="true" />
                Add to cart
              </Button>
            </div>
          ) : (
            <Button href={`/product/${product.slug}`} variant="outline" className="w-full">
              View full details
            </Button>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              aria-pressed={isWishlisted}
              onClick={handleWishlist}
            >
              <Heart className={cn("size-4", isWishlisted && "fill-coral text-coral")} aria-hidden="true" />
              {isWishlisted ? "Saved" : "Wishlist"}
            </Button>
            <Button href={`/product/${product.slug}`} variant="outline" className="flex-1" asChild>
              <Link href={`/product/${product.slug}`}>Full details</Link>
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

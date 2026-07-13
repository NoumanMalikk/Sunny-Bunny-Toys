"use client";

import { useState } from "react";
import { GitCompare, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types/product";
import { formatPrice } from "@/lib/pricing/format";
import { canAddToCart, formatAgeRange } from "@/lib/safety/product-activation";
import { cn } from "@/lib/utilities/cn";
import { categories } from "@/data/categories";
import { giftConfig } from "@/data/store-config";
import { Button } from "@/components/ui/Button";
import { Announcer } from "@/components/ui/Announcer";
import { useCartStore } from "@/lib/cart/store";
import { useWishlistStore } from "@/lib/cart/wishlist-store";
import { useCompareStore } from "@/lib/cart/compare-store";
import { AgeBadge } from "@/components/product/AgeBadge";
import { WarningBanner } from "@/components/product/WarningBanner";

export type PurchasePanelProps = {
  product: Product;
  className?: string;
};

function categoryName(category: Product["category"]) {
  return categories.find((item) => item.id === category)?.name ?? category;
}

function stockLabel(status: Product["stockStatus"]) {
  switch (status) {
    case "in_stock":
      return "In stock";
    case "low_stock":
      return "Low stock";
    case "out_of_stock":
      return "Out of stock";
    default:
      return "Unavailable";
  }
}

export function PurchasePanel({ product, className }: PurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product.availableVariants[0]?.id,
  );
  const [announcement, setAnnouncement] = useState("");

  const add = useCartStore((s) => s.add);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));
  const toggleCompare = useCompareStore((s) => s.toggle);
  const isCompared = useCompareStore((s) => s.has(product.id));

  const activation = canAddToCart(product);
  const maxQty = product.maximumOrderQuantity;
  const hasVariants = product.availableVariants.length > 0;

  const handleAdd = () => {
    const result = add(product, quantity, hasVariants ? selectedVariant : undefined);
    setAnnouncement(
      result.ok ? `${quantity} × ${product.title} added to cart` : (result.message ?? "Unable to add to cart"),
    );
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    setAnnouncement(isWishlisted ? "Removed from wishlist" : "Saved to wishlist");
  };

  const handleCompare = () => {
    const result = toggleCompare(product.id);
    setAnnouncement(
      result.ok
        ? isCompared
          ? "Removed from compare"
          : "Added to compare"
        : (result.message ?? "Unable to update compare list"),
    );
  };

  const panelContent = (
    <div className="space-y-5">
      <div>
        <p className="font-ui text-3xl font-bold tabular text-navy">{formatPrice(product.price)}</p>
        {product.compareAtPrice ? (
          <p className="text-sm text-text-secondary line-through">{formatPrice(product.compareAtPrice)}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <AgeBadge ageMinimum={product.ageMinimum} ageMaximum={product.ageMaximum} />
        <span className="text-sm text-text-secondary">{categoryName(product.category)}</span>
      </div>

      <p className="text-sm text-text-secondary">
        Availability:{" "}
        <span
          className={cn(
            "font-semibold",
            product.stockStatus === "in_stock" && "text-success",
            product.stockStatus === "low_stock" && "text-warning",
            (product.stockStatus === "out_of_stock" || product.stockStatus === "unavailable") && "text-error",
          )}
        >
          {stockLabel(product.stockStatus)}
        </span>
      </p>

      {product.giftEligible ? (
        <p className="text-sm text-text-secondary">
          Gift eligible
          {giftConfig.giftNotesEnabled ? " — add a gift note at checkout." : "."}
        </p>
      ) : null}

      {hasVariants ? (
        <fieldset className="space-y-2">
          <legend className="font-ui text-sm font-semibold text-navy">Choose option</legend>
          <div className="flex flex-wrap gap-2">
            {product.availableVariants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                disabled={!variant.available}
                onClick={() => setSelectedVariant(variant.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-[var(--radius-btn)] border-2 px-3 py-2 font-ui text-sm font-semibold transition-colors",
                  selectedVariant === variant.id ? "border-navy bg-navy/5 text-navy" : "border-border text-text",
                  !variant.available && "cursor-not-allowed opacity-50",
                )}
                aria-pressed={selectedVariant === variant.id}
              >
                {variant.colorHex ? (
                  <span
                    className="size-4 rounded-full border border-border"
                    style={{ backgroundColor: variant.colorHex }}
                    aria-hidden="true"
                  />
                ) : null}
                {variant.label}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {product.warningRequired && product.warningText ? (
        <WarningBanner warningText={product.warningText} />
      ) : null}

      {!activation.canPurchase ? (
        <div
          role="alert"
          className="rounded-[var(--radius-btn)] border border-error/30 bg-error/5 px-4 py-3 text-sm text-error"
        >
          <p className="font-semibold">Purchase unavailable</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {activation.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {product.incomplete ? (
        <div
          role="note"
          className="rounded-[var(--radius-btn)] border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-warning"
        >
          <p className="font-semibold">Product listing incomplete</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {product.incompleteReasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {activation.canPurchase ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-[var(--radius-btn)] border border-border">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="size-11 rounded-none"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
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
              className="size-11 rounded-none"
              aria-label="Increase quantity"
              onClick={() => setQuantity((value) => Math.min(maxQty, value + 1))}
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
        <Button type="button" className="w-full" disabled>
          Add to cart unavailable
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
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          aria-pressed={isCompared}
          onClick={handleCompare}
        >
          <GitCompare className="size-4" aria-hidden="true" />
          {isCompared ? "In compare" : "Compare"}
        </Button>
      </div>

      <p className="text-xs text-text-secondary">
        Recommended {formatAgeRange(product.ageMinimum, product.ageMaximum)}. Age grade source:{" "}
        {product.ageGradeSource}
        {!product.ageGradeVerified ? " (not yet verified)." : "."}
      </p>
    </div>
  );

  return (
    <>
      <Announcer message={announcement} />

      <div className={cn("hidden lg:block", className)}>
        <div className="sticky top-[calc(var(--header-height)+1rem)] rounded-[var(--radius-card)] border border-border bg-cloud p-6 shadow-soft">
          {panelContent}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-cloud/95 p-4 shadow-[var(--shadow-lift)] backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm text-navy">{product.title}</p>
            <p className="font-ui text-lg font-bold tabular text-navy">{formatPrice(product.price)}</p>
          </div>
          {activation.canPurchase ? (
            <Button type="button" onClick={handleAdd}>
              <ShoppingBag className="size-4" aria-hidden="true" />
              Add
            </Button>
          ) : (
            <Button type="button" disabled size="sm">
              Unavailable
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-[var(--radius-card)] border border-border bg-cloud p-6 lg:hidden">{panelContent}</div>
    </>
  );
}

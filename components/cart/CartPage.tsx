"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Heart, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { getFeaturedProducts, getProductById } from "@/data/products";
import { giftConfig, shippingConfig, storeMode } from "@/data/store-config";
import { useCartStore } from "@/lib/cart/store";
import { useWishlistStore } from "@/lib/cart/wishlist-store";
import { calculateOrderTotals } from "@/lib/checkout/totals";
import { formatPrice } from "@/lib/pricing/format";
import { useCartHydrated } from "@/lib/hooks/use-cart-hydrated";
import { cn } from "@/lib/utilities/cn";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { ProductGrid } from "@/components/product/ProductGrid";
import { AgeBadge } from "@/components/product/AgeBadge";
import { WarningBanner } from "@/components/product/WarningBanner";
import { DemoNotice } from "@/components/checkout/DemoNotice";
import { Announcer } from "@/components/ui/Announcer";

export function CartPage() {
  const hydrated = useCartHydrated();
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const remove = useCartStore((s) => s.remove);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const giftNote = useCartStore((s) => s.giftNote);
  const isGift = useCartStore((s) => s.isGift);
  const hidePrices = useCartStore((s) => s.hidePrices);
  const giftWrap = useCartStore((s) => s.giftWrap);
  const setGiftOptions = useCartStore((s) => s.setGiftOptions);
  const addWishlist = useWishlistStore((s) => s.add);
  const [announcement, setAnnouncement] = useState("");

  const isDemo = storeMode.mode === "demo";
  const subtotal = hydrated ? getSubtotal() : 0;
  const totals = calculateOrderTotals({ items, shipping: null, giftWrap });
  const recommendations = useMemo(() => {
    const relatedIds = new Set<string>();
    items.forEach((item) => {
      const product = getProductById(item.productId);
      product?.relatedProductIds.forEach((id) => relatedIds.add(id));
    });
    const related = Array.from(relatedIds)
      .map((id) => getProductById(id))
      .filter((p) => p && p.active && !items.some((i) => i.productId === p.id));
    if (related.length >= 4) return related.slice(0, 4);
    return getFeaturedProducts(4).filter((p) => !items.some((i) => i.productId === p.id));
  }, [items]);

  const handleSaveForLater = (productId: string, title: string) => {
    addWishlist(productId);
    setAnnouncement(`${title} saved to wishlist`);
  };

  if (!hydrated) {
    return (
      <div className="container-store py-12">
        <p className="text-text-secondary">Loading cart…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-store py-12 md:py-16">
        <Announcer message={announcement} />
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 grid size-20 place-items-center rounded-full bg-soft-gray text-navy">
            <ShoppingBag className="size-9" aria-hidden="true" />
          </div>
          <h1 className="font-display text-3xl text-navy">Your cart is empty</h1>
          <p className="mt-3 text-text-secondary">
            Browse dolls, games, and creative kits to start building your order.
          </p>
          <Button href="/new-arrivals" size="lg" className="mt-8">
            Continue shopping
          </Button>
        </div>
        {recommendations.length > 0 ? (
          <section className="mt-16" aria-labelledby="cart-recs-empty">
            <h2 id="cart-recs-empty" className="mb-6 font-display text-2xl text-navy">
              You might also like
            </h2>
            <ProductGrid products={recommendations.filter(Boolean) as NonNullable<(typeof recommendations)[number]>[]} />
          </section>
        ) : null}
      </div>
    );
  }

  return (
    <div className="container-store py-8 md:py-12">
      <Announcer message={announcement} />
      <div className="mb-8">
        <h1 className="font-display text-3xl text-navy md:text-4xl">Your cart</h1>
        <p className="mt-2 text-text-secondary">
          {items.length} item{items.length === 1 ? "" : "s"} · Review warnings and age guidance before checkout.
        </p>
      </div>

      {isDemo ? (
        <DemoNotice
          className="mb-8"
          message="This store is running in demonstration mode. Forms validate and the checkout flow is testable, but payment and order fulfillment are disabled until Stripe credentials are configured."
        />
      ) : null}

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <ul className="divide-y divide-border rounded-[var(--radius-editorial)] border border-border bg-cloud" aria-label="Cart items">
            {items.map((item) => {
              const lineKey = item.variantId ? `${item.productId}:${item.variantId}` : item.productId;
              return (
                <li key={lineKey} className="flex flex-col gap-4 p-4 sm:flex-row sm:p-6">
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative size-28 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-soft-gray"
                  >
                    {item.image ? (
                      <Image src={item.image} alt="" fill sizes="112px" className="object-contain p-2" />
                    ) : null}
                  </Link>

                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <Link href={`/product/${item.slug}`} className="font-display text-lg text-navy hover:underline">
                          {item.title}
                        </Link>
                        {item.variantLabel ? (
                          <p className="text-sm text-text-secondary">Variant: {item.variantLabel}</p>
                        ) : null}
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <AgeBadge ageMinimum={item.ageMinimum} ageMaximum={item.ageMaximum} />
                          {item.pieceCount ? (
                            <span className="text-xs text-text-secondary">{item.pieceCount} pieces</span>
                          ) : null}
                        </div>
                      </div>
                      <p className="tabular font-ui text-lg font-bold text-navy">{formatPrice(item.price)}</p>
                    </div>

                    {item.warningRequired && item.warningText ? (
                      <WarningBanner warningText={item.warningText} />
                    ) : null}

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div
                        className="inline-flex items-center rounded-[var(--radius-btn)] border border-border"
                        role="group"
                        aria-label={`Quantity for ${item.title}`}
                      >
                        <button
                          type="button"
                          onClick={() => updateQty(item.productId, item.quantity - 1, item.variantId)}
                          className="grid size-10 place-items-center hover:bg-soft-gray"
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="tabular min-w-10 text-center font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.productId, item.quantity + 1, item.variantId)}
                          disabled={item.quantity >= item.maxQty}
                          className={cn(
                            "grid size-10 place-items-center hover:bg-soft-gray",
                            item.quantity >= item.maxQty && "opacity-40",
                          )}
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                      <p className="tabular text-sm text-text-secondary">
                        Line total: <strong className="text-navy">{formatPrice(item.price * item.quantity)}</strong>
                        {item.quantity >= item.maxQty ? (
                          <span className="ml-2 text-warning">Max {item.maxQty}</span>
                        ) : null}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSaveForLater(item.productId, item.title)}
                      >
                        <Heart className="size-4" aria-hidden="true" />
                        Save for later
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(item.productId, item.variantId)}
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="rounded-[var(--radius-editorial)] border border-border bg-cloud p-5">
            <h2 className="font-display text-lg text-navy">Gift options</h2>
            <div className="mt-4 space-y-4">
              <Checkbox
                id="cart-is-gift"
                checked={isGift}
                onChange={(e) => setGiftOptions({ isGift: e.target.checked })}
                label="This order includes a gift"
              />
              <div>
                <Label htmlFor="cart-gift-note">Gift note (optional)</Label>
                <Textarea
                  id="cart-gift-note"
                  value={giftNote}
                  onChange={(e) => setGiftOptions({ giftNote: e.target.value })}
                  maxLength={240}
                  placeholder="Add a message for the recipient"
                  className="mt-2"
                />
              </div>
              <Checkbox
                id="cart-hide-prices"
                checked={hidePrices}
                onChange={(e) => setGiftOptions({ hidePrices: e.target.checked })}
                label="Hide prices on packing slip"
              />
              {giftConfig.giftWrapEnabled ? (
                <Checkbox
                  id="cart-gift-wrap"
                  checked={giftWrap}
                  onChange={(e) => setGiftOptions({ giftWrap: e.target.checked })}
                  label={`Add gift wrap (+${formatPrice(giftConfig.giftWrapPrice)})`}
                />
              ) : null}
            </div>
          </div>
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="rounded-[var(--radius-editorial)] border border-border bg-cloud p-6">
            <h2 className="font-display text-xl text-navy">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-text-secondary">Subtotal</dt>
                <dd className="tabular font-semibold text-navy">{formatPrice(subtotal)}</dd>
              </div>
              {totals.giftWrap > 0 ? (
                <div className="flex justify-between">
                  <dt className="text-text-secondary">Gift wrap</dt>
                  <dd className="tabular font-semibold text-navy">{formatPrice(totals.giftWrap)}</dd>
                </div>
              ) : null}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-text-secondary">
              {shippingConfig.carrierEstimateText}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">{totals.taxMessage}</p>
            <Button href="/checkout" size="lg" className="mt-6 w-full">
              Proceed to checkout
            </Button>
            <Button href="/new-arrivals" variant="ghost" className="mt-2 w-full">
              Continue shopping
            </Button>
          </div>
        </aside>
      </div>

      {recommendations.length > 0 ? (
        <section className="mt-16" aria-labelledby="cart-recs">
          <h2 id="cart-recs" className="mb-6 font-display text-2xl text-navy">
            Recommended for you
          </h2>
          <ProductGrid products={recommendations.filter(Boolean) as NonNullable<(typeof recommendations)[number]>[]} />
        </section>
      ) : null}
    </div>
  );
}

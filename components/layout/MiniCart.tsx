"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { WarningBanner } from "@/components/product/WarningBanner";
import { useCartStore } from "@/lib/cart/store";
import { formatPrice } from "@/lib/pricing/format";
import { useCartHydrated } from "@/lib/hooks/use-cart-hydrated";
import { cn } from "@/lib/utilities/cn";

export type MiniCartProps = {
  open: boolean;
  onClose: () => void;
};

export function MiniCart({ open, onClose }: MiniCartProps) {
  const router = useRouter();
  const hydrated = useCartHydrated();
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const remove = useCartStore((state) => state.remove);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getItemCount = useCartStore((state) => state.getItemCount);

  const itemCount = hydrated ? getItemCount() : 0;
  const subtotal = hydrated ? getSubtotal() : 0;
  const hasWarnings = items.some((item) => item.warningRequired && item.warningText);

  const goToCheckout = () => {
    onClose();
    // Prefer hard navigation so checkout always loads with a fresh client tree
    // after the cart drawer closes (avoids stuck drawer focus traps).
    window.setTimeout(() => {
      router.push("/checkout");
    }, 0);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Your cart"
      description={
        itemCount > 0
          ? `${itemCount} item${itemCount === 1 ? "" : "s"} ready for checkout`
          : "Your cart is empty"
      }
      className="max-w-md"
    >
      {!hydrated ? (
        <p className="text-sm text-text-secondary" aria-live="polite">
          Loading cart...
        </p>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-10 text-center">
          <div className="grid size-16 place-items-center rounded-full bg-soft-gray text-navy">
            <ShoppingBag className="size-7" aria-hidden="true" />
          </div>
          <div>
            <p className="font-display text-lg text-navy">Your cart is empty</p>
            <p className="mt-1 text-sm text-text-secondary">
              Browse dolls, games, and creative kits to get started.
            </p>
          </div>
          <Button href="/new-arrivals" onClick={onClose}>
            Shop new arrivals
          </Button>
        </div>
      ) : (
        <div className="flex h-full flex-col gap-4">
          {hasWarnings ? (
            <div role="note" className="rounded-[var(--radius-btn)] border border-warning/30 bg-warning/5 p-3">
              <p className="text-xs font-semibold text-warning">
                Some items include safety warnings. Review each product before checkout.
              </p>
            </div>
          ) : null}

          <ul className="divide-y divide-border" aria-label="Cart items">
            {items.map((item) => {
              const lineKey = item.variantId ? `${item.productId}:${item.variantId}` : item.productId;

              return (
                <li key={lineKey} className="flex gap-3 py-4 first:pt-0">
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={onClose}
                    className="relative size-20 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
                  >
                    {item.image ? (
                      <Image src={item.image} alt="" fill sizes="80px" className="object-contain p-1.5" />
                    ) : null}
                  </Link>

                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={onClose}
                          className="line-clamp-2 font-ui text-sm font-semibold text-navy hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
                        >
                          {item.title}
                        </Link>
                        {item.variantLabel ? (
                          <p className="text-xs text-text-secondary">{item.variantLabel}</p>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.productId, item.variantId)}
                        className="rounded-[var(--radius-btn)] p-1.5 text-text-secondary hover:bg-soft-gray hover:text-error focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div
                        className="inline-flex items-center rounded-[var(--radius-btn)] border border-border"
                        role="group"
                        aria-label={`Quantity for ${item.title}`}
                      >
                        <button
                          type="button"
                          onClick={() => updateQty(item.productId, item.quantity - 1, item.variantId)}
                          className="grid size-9 place-items-center text-navy hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-inset"
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          <Minus className="size-4" aria-hidden="true" />
                        </button>
                        <span className="tabular min-w-8 px-1 text-center text-sm font-semibold text-navy" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.productId, item.quantity + 1, item.variantId)}
                          disabled={item.quantity >= item.maxQty}
                          className={cn(
                            "grid size-9 place-items-center text-navy hover:bg-soft-gray focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-inset",
                            item.quantity >= item.maxQty && "opacity-40",
                          )}
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          <Plus className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="tabular text-sm font-semibold text-navy">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    {item.warningRequired && item.warningText ? (
                      <WarningBanner warningText={item.warningText} compact />
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="sticky bottom-0 -mx-5 mt-auto border-t border-border bg-cloud px-5 py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-ui text-sm text-text-secondary">Subtotal</span>
              <span className="tabular font-display text-lg text-navy">{formatPrice(subtotal)}</span>
            </div>
            <p className="mb-4 text-xs text-text-secondary">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="grid gap-2">
              <Button type="button" size="lg" className="w-full" onClick={goToCheckout}>
                Proceed to checkout
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={onClose}>
                Continue shopping
              </Button>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}

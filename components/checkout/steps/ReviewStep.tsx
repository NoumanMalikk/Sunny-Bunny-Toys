"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useCartStore } from "@/lib/cart/store";
import { calculateDemoShipping } from "@/lib/checkout/shipping";
import { calculateOrderTotals } from "@/lib/checkout/totals";
import { formatPrice } from "@/lib/pricing/format";
import { AgeBadge } from "@/components/product/AgeBadge";
import { WarningBanner } from "@/components/product/WarningBanner";
import { Button } from "@/components/ui/Button";
import type { CheckoutStepProps } from "@/lib/checkout/wizard-types";

export function ReviewStep({ data, onNext, onBack }: CheckoutStepProps) {
  const items = useCartStore((s) => s.items);
  const totalWeight = items.reduce((sum, item) => sum + item.quantity * 1.2, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const shippingQuote = useMemo(
    () =>
      calculateDemoShipping({
        items,
        totalWeightLbs: totalWeight,
        methodId: data.shippingMethod.methodId,
        itemCount,
      }),
    [items, totalWeight, data.shippingMethod.methodId, itemCount],
  );

  const totals = calculateOrderTotals({
    items,
    shipping: shippingQuote,
    giftWrap: data.gift.giftWrap,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-navy">Order review</h2>
        <p className="mt-2 text-sm text-text-secondary">Confirm details before accepting terms and placing your order.</p>
      </div>

      <section className="rounded-[var(--radius-btn)] border border-border p-4">
        <h3 className="font-ui font-semibold text-navy">Customer</h3>
        <p className="mt-2 text-sm text-text-secondary">
          {data.customer.firstName} {data.customer.lastName}<br />
          {data.customer.email}
          {data.customer.phone ? <><br />{data.customer.phone}</> : null}
        </p>
      </section>

      <section className="rounded-[var(--radius-btn)] border border-border p-4">
        <h3 className="font-ui font-semibold text-navy">Shipping</h3>
        <p className="mt-2 text-sm text-text-secondary">
          {data.shipping.line1}
          {data.shipping.line2 ? <>, {data.shipping.line2}</> : null}
          <br />
          {data.shipping.city}, {data.shipping.state} {data.shipping.postalCode}
        </p>
        <p className="mt-2 text-sm">
          <strong>{shippingQuote.methodName}</strong>. {formatPrice(shippingQuote.amount)} · {shippingQuote.estimatedDays}
        </p>
      </section>

      {data.gift.isGift ? (
        <section className="rounded-[var(--radius-btn)] border border-border p-4">
          <h3 className="font-ui font-semibold text-navy">Gift options</h3>
          <p className="mt-2 text-sm text-text-secondary">
            Gift order · {data.gift.hidePrices ? "Prices hidden on slip" : "Prices shown on slip"}
            {data.gift.giftWrap ? " · Gift wrap requested" : ""}
          </p>
          {data.gift.giftNote ? (
            <p className="mt-2 text-sm italic text-text-secondary">&ldquo;{data.gift.giftNote}&rdquo;</p>
          ) : null}
        </section>
      ) : null}

      <section className="rounded-[var(--radius-btn)] border border-border p-4">
        <h3 className="font-ui font-semibold text-navy">Items</h3>
        <ul className="mt-3 space-y-4">
          {items.map((item) => (
            <li key={item.variantId ? `${item.productId}:${item.variantId}` : item.productId} className="flex gap-3">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-soft-gray">
                {item.image ? <Image src={item.image} alt="" fill sizes="64px" className="object-contain p-1" /> : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-ui text-sm font-semibold text-navy">{item.title}</p>
                <p className="text-xs text-text-secondary">Qty {item.quantity} · {formatPrice(item.price * item.quantity)}</p>
                <AgeBadge ageMinimum={item.ageMinimum} ageMaximum={item.ageMaximum} className="mt-1" />
                {item.warningRequired && item.warningText ? (
                  <div className="mt-2">
                    <WarningBanner warningText={item.warningText} compact />
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[var(--radius-btn)] border border-border p-4">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="tabular font-semibold">{formatPrice(totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd className="tabular font-semibold">{formatPrice(totals.shipping)}</dd>
          </div>
          {totals.giftWrap > 0 ? (
            <div className="flex justify-between">
              <dt>Gift wrap</dt>
              <dd className="tabular font-semibold">{formatPrice(totals.giftWrap)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between border-t border-border pt-2 text-base">
            <dt className="font-semibold text-navy">Estimated total</dt>
            <dd className="tabular font-bold text-navy">{formatPrice(totals.total)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-text-secondary">{totals.taxMessage}</p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext} size="lg">
          Continue to terms
        </Button>
      </div>
    </div>
  );
}

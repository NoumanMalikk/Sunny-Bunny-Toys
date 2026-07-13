"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/cart/store";
import { formatPrice } from "@/lib/pricing/format";
import { calculateDemoShipping } from "@/lib/checkout/shipping";
import { calculateOrderTotals } from "@/lib/checkout/totals";
import { cartItemsToLineInput } from "@/lib/checkout/validate-cart";
import { Button } from "@/components/ui/Button";
import { DemoNotice } from "@/components/checkout/DemoNotice";
import type { CheckoutStepProps } from "@/lib/checkout/wizard-types";
import { storeMode } from "@/data/store-config";

type SubmitStepProps = CheckoutStepProps & {
  stripeConfigured: boolean;
  onSubmitSuccess: (url: string) => void;
};

export function SubmitStep({ data, onBack, stripeConfigured }: SubmitStepProps) {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isDemo = storeMode.mode === "demo" || !stripeConfigured;
  const totalWeight = items.reduce((sum, item) => sum + item.quantity * 1.2, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingQuote = calculateDemoShipping({
    items,
    totalWeightLbs: totalWeight,
    methodId: data.shippingMethod.methodId,
    itemCount,
  });
  const totals = calculateOrderTotals({ items, shipping: shippingQuote, giftWrap: data.gift.giftWrap });

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const idempotencyKey = `checkout-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
      const response = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItemsToLineInput(items),
          customer: data.customer,
          shipping: data.shipping,
          billing: data.billing,
          shippingMethod: data.shippingMethod,
          gift: data.gift,
          safety: data.safety,
          terms: data.terms,
          idempotencyKey,
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        url?: string;
        message?: string;
        demo?: boolean;
        orderRef?: string;
        errors?: string[];
      };

      if (!response.ok || !result.ok || !result.url) {
        setError(result.message ?? result.errors?.join(" ") ?? "Unable to complete checkout.");
        return;
      }

      if (result.demo && result.orderRef) {
        const demoSummary = {
          orderRef: result.orderRef,
          email: data.customer.email,
          firstName: data.customer.firstName,
          total: totals.total,
          items: items.map((item) => ({
            title: item.title,
            quantity: item.quantity,
            lineTotal: item.price * item.quantity,
          })),
        };
        sessionStorage.setItem("sunny-bunny-demo-order", JSON.stringify(demoSummary));
        clear();
      }

      window.location.href = result.url;
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-navy">Place your order</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Estimated total: <strong className="text-navy">{formatPrice(totals.total)}</strong>
        </p>
      </div>

      {isDemo ? (
        <DemoNotice message="Demo mode creates a practice order without collecting payment. Connect Stripe to accept live payments." />
      ) : (
        <p className="text-sm text-text-secondary">
          You will be redirected to Stripe to complete payment securely. Your order is not placed until payment is confirmed.
        </p>
      )}

      {error ? (
        <p role="alert" className="text-sm font-semibold text-error">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="ghost" onClick={onBack} disabled={loading}>
          Back
        </Button>
        <Button type="button" size="lg" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Processing...
            </>
          ) : isDemo ? (
            "Complete demo order"
          ) : (
            "Place order and pay with Stripe"
          )}
        </Button>
      </div>
    </div>
  );
}

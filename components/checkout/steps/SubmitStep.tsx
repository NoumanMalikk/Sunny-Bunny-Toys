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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [demoMessage, setDemoMessage] = useState("");

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
    setDemoMessage("");

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

      if (result.demo || response.status === 503) {
        setDemoMessage(
          result.message ??
            "Demonstration mode — checkout is disabled. No paid order was created.",
        );
        return;
      }

      if (!response.ok || !result.ok) {
        setError(result.message ?? result.errors?.join(" ") ?? "Unable to start checkout.");
        return;
      }

      if (result.url) {
        window.location.href = result.url;
      }
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
        <DemoNotice message="Submitting will validate your order but payment cannot be completed in demonstration mode. Configure Stripe credentials to enable live checkout." />
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

      {demoMessage ? (
        <div role="status" className="rounded-[var(--radius-btn)] border border-warning/30 bg-warning/5 p-4">
          <p className="text-sm font-semibold text-warning">{demoMessage}</p>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="ghost" onClick={onBack} disabled={loading}>
          Back
        </Button>
        <Button type="button" size="lg" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Processing…
            </>
          ) : isDemo ? (
            "Test checkout validation"
          ) : (
            "Place order & pay with Stripe"
          )}
        </Button>
      </div>
    </div>
  );
}

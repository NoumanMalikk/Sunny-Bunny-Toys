"use client";

import { formatPrice } from "@/lib/pricing/format";
import { calculateDemoShipping } from "@/lib/checkout/shipping";
import { getAvailableShippingMethods } from "@/lib/checkout/shipping";
import { useCartStore } from "@/lib/cart/store";
import { Button } from "@/components/ui/Button";
import type { CheckoutStepProps } from "@/lib/checkout/wizard-types";
import { cn } from "@/lib/utilities/cn";

export function ShippingMethodStep({ data, onChange, onNext, onBack }: CheckoutStepProps) {
  const items = useCartStore((s) => s.items);
  const methods = getAvailableShippingMethods();
  const totalWeight = items.reduce((sum, item) => sum + item.quantity * 1.2, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-navy">Shipping method</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Rates are estimated for delivery within the United States.
        </p>
      </div>

      <fieldset className="space-y-3">
        <legend className="sr-only">Choose a shipping method</legend>
        {methods.map((method) => {
          const quote = calculateDemoShipping({
            items,
            totalWeightLbs: totalWeight,
            methodId: method.id,
            itemCount,
          });
          const selected = data.shippingMethod.methodId === method.id;

          return (
            <label
              key={method.id}
              className={cn(
                "flex cursor-pointer items-start gap-4 rounded-[var(--radius-btn)] border p-4 transition-colors",
                selected ? "border-navy bg-navy/5" : "border-border hover:border-navy/30",
              )}
            >
              <input
                type="radio"
                name="shippingMethod"
                value={method.id}
                checked={selected}
                onChange={() => onChange({ shippingMethod: { methodId: method.id } })}
                className="mt-1"
              />
              <span className="flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-ui font-semibold text-navy">{method.name}</span>
                  <span className="tabular font-semibold text-navy">
                    {quote.amount === 0 ? "Free" : formatPrice(quote.amount)}
                  </span>
                </span>
                <span className="mt-1 block text-sm text-text-secondary">{method.description}</span>
                <span className="mt-1 block text-xs text-text-secondary">Est. {method.estimatedDays}</span>
              </span>
            </label>
          );
        })}
      </fieldset>

      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext} size="lg">
          Continue to gift options
        </Button>
      </div>
    </div>
  );
}

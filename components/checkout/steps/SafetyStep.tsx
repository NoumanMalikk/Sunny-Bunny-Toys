"use client";

import { getProductById } from "@/data/products";
import { useCartStore } from "@/lib/cart/store";
import { formatAgeRange } from "@/lib/safety/product-activation";
import { AgeBadge } from "@/components/product/AgeBadge";
import { WarningBanner } from "@/components/product/WarningBanner";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import type { CheckoutStepProps } from "@/lib/checkout/wizard-types";
import { Battery, Hammer, ShieldAlert, Users } from "lucide-react";

export function SafetyStep({ data, onChange, onNext, onBack, errors }: CheckoutStepProps) {
  const items = useCartStore((s) => s.items);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-navy">Safety review</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Review age guidance, warnings, and product-specific safety details before continuing.
        </p>
      </div>

      <ul className="space-y-4">
        {items.map((item) => {
          const product = getProductById(item.productId);
          if (!product) return null;

          return (
            <li key={item.variantId ? `${item.productId}:${item.variantId}` : item.productId} className="rounded-[var(--radius-btn)] border border-border p-4">
              <p className="font-ui font-semibold text-navy">{item.title}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <AgeBadge ageMinimum={item.ageMinimum} ageMaximum={item.ageMaximum} />
                <span className="text-xs text-text-secondary">
                  Recommended {formatAgeRange(item.ageMinimum, item.ageMaximum)}
                </span>
              </div>

              {item.warningRequired && item.warningText ? (
                <div className="mt-3">
                  <WarningBanner warningText={item.warningText} />
                </div>
              ) : null}

              <ul className="mt-3 space-y-1.5 text-sm text-text-secondary">
                {product.adultSupervisionRequired ? (
                  <li className="flex items-center gap-2">
                    <Users className="size-4 text-navy" aria-hidden="true" />
                    Adult supervision recommended
                  </li>
                ) : null}
                {product.batteryIncluded ? (
                  <li className="flex items-center gap-2">
                    <Battery className="size-4 text-navy" aria-hidden="true" />
                    Batteries included{product.batteryType ? `: ${product.batteryType}` : ""}
                  </li>
                ) : null}
                {product.assemblyRequired ? (
                  <li className="flex items-center gap-2">
                    <Hammer className="size-4 text-navy" aria-hidden="true" />
                    Assembly required
                  </li>
                ) : null}
                {product.smallParts || product.chokingHazard ? (
                  <li className="flex items-center gap-2">
                    <ShieldAlert className="size-4 text-warning" aria-hidden="true" />
                    Small parts. choking hazard for children under 3
                  </li>
                ) : null}
              </ul>
            </li>
          );
        })}
      </ul>

      <Checkbox
        id="warningsReviewed"
        checked={data.safety.warningsReviewed === true}
        onChange={(e) =>
          onChange({
            safety: { ...data.safety, warningsReviewed: e.target.checked ? true : undefined },
          })
        }
        error={Boolean(errors.warningsReviewed)}
        label="I have reviewed the age guidance and applicable product warnings."
      />
      {errors.warningsReviewed ? <p className="text-xs text-error">{errors.warningsReviewed}</p> : null}

      <Checkbox
        id="safetyAcknowledged"
        checked={data.safety.safetyAcknowledged === true}
        onChange={(e) =>
          onChange({
            safety: { ...data.safety, safetyAcknowledged: e.target.checked ? true : undefined },
          })
        }
        error={Boolean(errors.safetyAcknowledged)}
        label="I understand I am responsible for supervising play and following manufacturer safety instructions."
      />
      {errors.safetyAcknowledged ? <p className="text-xs text-error">{errors.safetyAcknowledged}</p> : null}

      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext} size="lg">
          Continue to billing
        </Button>
      </div>
    </div>
  );
}

"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import type { CheckoutStepProps } from "@/lib/checkout/wizard-types";
import { US_STATES } from "@/lib/checkout/us-states";

export function BillingStep({ data, onChange, onNext, onBack, errors }: CheckoutStepProps) {
  const sameAsShipping = data.billing.sameAsShipping;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-navy">Billing address</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Billing address is used for payment verification. Card details are never stored on this site.
        </p>
      </div>

      <Checkbox
        id="sameAsShipping"
        checked={sameAsShipping}
        onChange={(e) => onChange({ billing: { ...data.billing, sameAsShipping: e.target.checked } })}
        label="Billing address is the same as shipping"
      />

      {!sameAsShipping ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="billing-line1" required>Street address</Label>
            <Input
              id="billing-line1"
              value={data.billing.line1 ?? ""}
              onChange={(e) => onChange({ billing: { ...data.billing, line1: e.target.value } })}
              error={Boolean(errors.billingLine1)}
              className="mt-1.5"
              autoComplete="billing address-line1"
            />
            {errors.billingLine1 ? <p className="mt-1 text-xs text-error">{errors.billingLine1}</p> : null}
          </div>
          <div>
            <Label htmlFor="billing-line2">Apartment, suite, etc.</Label>
            <Input
              id="billing-line2"
              value={data.billing.line2 ?? ""}
              onChange={(e) => onChange({ billing: { ...data.billing, line2: e.target.value } })}
              className="mt-1.5"
              autoComplete="billing address-line2"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="billing-city" required>City</Label>
              <Input
                id="billing-city"
                value={data.billing.city ?? ""}
                onChange={(e) => onChange({ billing: { ...data.billing, city: e.target.value } })}
                error={Boolean(errors.billingCity)}
                className="mt-1.5"
                autoComplete="billing address-level2"
              />
            </div>
            <div>
              <Label htmlFor="billing-state" required>State</Label>
              <Select
                id="billing-state"
                value={data.billing.state ?? ""}
                onChange={(e) => onChange({ billing: { ...data.billing, state: e.target.value } })}
                error={Boolean(errors.billingState)}
                className="mt-1.5"
              >
                <option value="">Select state</option>
                {US_STATES.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="billing-postal" required>ZIP code</Label>
              <Input
                id="billing-postal"
                value={data.billing.postalCode ?? ""}
                onChange={(e) => onChange({ billing: { ...data.billing, postalCode: e.target.value } })}
                error={Boolean(errors.billingPostalCode)}
                className="mt-1.5"
                autoComplete="billing postal-code"
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext} size="lg">
          Continue to payment
        </Button>
      </div>
    </div>
  );
}

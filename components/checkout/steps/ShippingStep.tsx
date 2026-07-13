"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import type { CheckoutStepProps } from "@/lib/checkout/wizard-types";
import { US_STATES } from "@/lib/checkout/us-states";

export function ShippingStep({ data, onChange, onNext, onBack, errors }: CheckoutStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-navy">Shipping address</h2>
        <p className="mt-2 text-sm text-text-secondary">United States addresses only at this time.</p>
      </div>

      <div>
        <Label htmlFor="line1" required>Street address</Label>
        <Input
          id="line1"
          value={data.shipping.line1}
          onChange={(e) => onChange({ shipping: { ...data.shipping, line1: e.target.value } })}
          error={Boolean(errors.line1)}
          className="mt-1.5"
          autoComplete="shipping address-line1"
        />
        {errors.line1 ? <p className="mt-1 text-xs text-error">{errors.line1}</p> : null}
      </div>

      <div>
        <Label htmlFor="line2">Apartment, suite, etc. (optional)</Label>
        <Input
          id="line2"
          value={data.shipping.line2 ?? ""}
          onChange={(e) => onChange({ shipping: { ...data.shipping, line2: e.target.value } })}
          className="mt-1.5"
          autoComplete="shipping address-line2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <Label htmlFor="city" required>City</Label>
          <Input
            id="city"
            value={data.shipping.city}
            onChange={(e) => onChange({ shipping: { ...data.shipping, city: e.target.value } })}
            error={Boolean(errors.city)}
            className="mt-1.5"
            autoComplete="shipping address-level2"
          />
          {errors.city ? <p className="mt-1 text-xs text-error">{errors.city}</p> : null}
        </div>
        <div>
          <Label htmlFor="state" required>State</Label>
          <Select
            id="state"
            value={data.shipping.state}
            onChange={(e) => onChange({ shipping: { ...data.shipping, state: e.target.value } })}
            error={Boolean(errors.state)}
            className="mt-1.5"
            autoComplete="shipping address-level1"
          >
            <option value="">Select state</option>
            {US_STATES.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </Select>
          {errors.state ? <p className="mt-1 text-xs text-error">{errors.state}</p> : null}
        </div>
        <div>
          <Label htmlFor="postalCode" required>ZIP code</Label>
          <Input
            id="postalCode"
            value={data.shipping.postalCode}
            onChange={(e) => onChange({ shipping: { ...data.shipping, postalCode: e.target.value } })}
            error={Boolean(errors.postalCode)}
            className="mt-1.5"
            autoComplete="shipping postal-code"
          />
          {errors.postalCode ? <p className="mt-1 text-xs text-error">{errors.postalCode}</p> : null}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext} size="lg">
          Continue to delivery
        </Button>
      </div>
    </div>
  );
}

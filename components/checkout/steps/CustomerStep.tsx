"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import type { CheckoutStepProps } from "@/lib/checkout/wizard-types";

export function CustomerStep({ data, onChange, onNext, errors }: CheckoutStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-navy">Adult customer information</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Purchases must be completed by an adult (18+). We do not collect child profiles.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName" required>First name</Label>
          <Input
            id="firstName"
            value={data.customer.firstName}
            onChange={(e) => onChange({ customer: { ...data.customer, firstName: e.target.value } })}
            error={Boolean(errors.firstName)}
            className="mt-1.5"
            autoComplete="given-name"
          />
          {errors.firstName ? <p className="mt-1 text-xs text-error">{errors.firstName}</p> : null}
        </div>
        <div>
          <Label htmlFor="lastName" required>Last name</Label>
          <Input
            id="lastName"
            value={data.customer.lastName}
            onChange={(e) => onChange({ customer: { ...data.customer, lastName: e.target.value } })}
            error={Boolean(errors.lastName)}
            className="mt-1.5"
            autoComplete="family-name"
          />
          {errors.lastName ? <p className="mt-1 text-xs text-error">{errors.lastName}</p> : null}
        </div>
      </div>

      <div>
        <Label htmlFor="email" required>Email</Label>
        <Input
          id="email"
          type="email"
          value={data.customer.email}
          onChange={(e) => onChange({ customer: { ...data.customer, email: e.target.value } })}
          error={Boolean(errors.email)}
          className="mt-1.5"
          autoComplete="email"
        />
        {errors.email ? <p className="mt-1 text-xs text-error">{errors.email}</p> : null}
      </div>

      <div>
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input
          id="phone"
          type="tel"
          value={data.customer.phone ?? ""}
          onChange={(e) => onChange({ customer: { ...data.customer, phone: e.target.value } })}
          error={Boolean(errors.phone)}
          className="mt-1.5"
          autoComplete="tel"
        />
        {errors.phone ? <p className="mt-1 text-xs text-error">{errors.phone}</p> : null}
      </div>

      <Checkbox
        id="isAdult"
        checked={data.customer.isAdult === true}
        onChange={(e) => onChange({ customer: { ...data.customer, isAdult: e.target.checked ? true : undefined } })}
        error={Boolean(errors.isAdult)}
        label="I confirm that I am completing this purchase as an adult."
      />
      {errors.isAdult ? <p className="text-xs text-error">{errors.isAdult}</p> : null}

      <Button type="button" onClick={onNext} size="lg">
        Continue to shipping
      </Button>
    </div>
  );
}

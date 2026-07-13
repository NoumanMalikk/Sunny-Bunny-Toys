"use client";

import { giftConfig } from "@/data/store-config";
import { formatPrice } from "@/lib/pricing/format";
import { Checkbox } from "@/components/ui/Checkbox";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import type { CheckoutStepProps } from "@/lib/checkout/wizard-types";

export function GiftStep({ data, onChange, onNext, onBack, errors }: CheckoutStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-navy">Gift options</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Optional gift messaging and packaging preferences. No child profiles are collected.
        </p>
      </div>

      <Checkbox
        id="checkout-is-gift"
        checked={data.gift.isGift}
        onChange={(e) => onChange({ gift: { ...data.gift, isGift: e.target.checked } })}
        label="This order is a gift"
      />

      {giftConfig.giftNotesEnabled ? (
        <div>
          <Label htmlFor="checkout-gift-note">Gift note</Label>
          <Textarea
            id="checkout-gift-note"
            value={data.gift.giftNote ?? ""}
            onChange={(e) => onChange({ gift: { ...data.gift, giftNote: e.target.value } })}
            maxLength={240}
            className="mt-1.5"
            placeholder="Optional message for the recipient"
          />
          {errors.giftNote ? <p className="mt-1 text-xs text-error">{errors.giftNote}</p> : null}
        </div>
      ) : null}

      <Checkbox
        id="checkout-hide-prices"
        checked={data.gift.hidePrices}
        onChange={(e) => onChange({ gift: { ...data.gift, hidePrices: e.target.checked } })}
        label="Hide prices on packing slip"
      />

      {giftConfig.giftWrapEnabled ? (
        <Checkbox
          id="checkout-gift-wrap"
          checked={data.gift.giftWrap}
          onChange={(e) => onChange({ gift: { ...data.gift, giftWrap: e.target.checked } })}
          error={Boolean(errors.giftWrap)}
          label={`Add gift wrap (+${formatPrice(giftConfig.giftWrapPrice)})`}
        />
      ) : null}
      {errors.giftWrap ? <p className="text-xs text-error">{errors.giftWrap}</p> : null}

      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext} size="lg">
          Continue to safety review
        </Button>
      </div>
    </div>
  );
}

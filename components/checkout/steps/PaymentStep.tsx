"use client";

import { CreditCard, Lock } from "lucide-react";
import { storeMode } from "@/data/store-config";
import { Button } from "@/components/ui/Button";
import { DemoNotice } from "@/components/checkout/DemoNotice";
import type { CheckoutStepProps } from "@/lib/checkout/wizard-types";

type PaymentStepProps = CheckoutStepProps & {
  stripeConfigured: boolean;
};

export function PaymentStep({ onNext, onBack, stripeConfigured }: PaymentStepProps) {
  const isDemo = storeMode.mode === "demo" || !stripeConfigured;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-navy">Payment</h2>
        <p className="mt-2 text-sm text-text-secondary">
          We never collect card numbers on this site. Payment is handled securely by Stripe.
        </p>
      </div>

      {isDemo ? (
        <DemoNotice
          title="Payment is not available yet"
          message="Card payment is not turned on for this shop yet. You can still review shipping and your order. No card numbers are collected on this page."
        />
      ) : (
        <div className="rounded-[var(--radius-editorial)] border border-border bg-cloud p-6">
          <div className="flex items-start gap-3">
            <div className="grid size-12 place-items-center rounded-full bg-soft-gray text-navy">
              <CreditCard className="size-6" aria-hidden="true" />
            </div>
            <div>
              <p className="font-ui font-semibold text-navy">Stripe secure checkout</p>
              <p className="mt-1 text-sm text-text-secondary">
                After you review your order and accept terms, you will be redirected to Stripe Checkout to
                complete payment using Stripe&apos;s Payment Element on their secure hosted page.
              </p>
              <p className="mt-3 flex items-center gap-2 text-xs text-text-secondary">
                <Lock className="size-3.5" aria-hidden="true" />
                PCI-compliant · No card data stored on {storeMode.siteUrl}
              </p>
            </div>
          </div>
          <div
            id="stripe-payment-element"
            className="mt-6 min-h-[120px] rounded-[var(--radius-btn)] border border-dashed border-border bg-soft-gray/50 p-4 text-center text-sm text-text-secondary"
            aria-label="Stripe payment element placeholder"
          >
            Payment Element loads on Stripe Checkout after order submission.
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext} size="lg">
          Continue to review
        </Button>
      </div>
    </div>
  );
}

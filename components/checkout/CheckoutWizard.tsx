"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart/store";
import { storeMode } from "@/data/store-config";
import {
  CHECKOUT_STEPS,
  defaultCheckoutState,
  type CheckoutStepId,
  type CheckoutWizardState,
} from "@/lib/checkout/wizard-types";
import {
  adultCustomerSchema,
  billingAddressSchema,
  giftOptionsSchema,
  safetyAcknowledgmentSchema,
  shippingAddressSchema,
  shippingMethodSchema,
  termsSchema,
} from "@/lib/validation/checkout";
import { DemoNotice } from "@/components/checkout/DemoNotice";
import { CustomerStep } from "@/components/checkout/steps/CustomerStep";
import { ShippingStep } from "@/components/checkout/steps/ShippingStep";
import { ShippingMethodStep } from "@/components/checkout/steps/ShippingMethodStep";
import { GiftStep } from "@/components/checkout/steps/GiftStep";
import { SafetyStep } from "@/components/checkout/steps/SafetyStep";
import { BillingStep } from "@/components/checkout/steps/BillingStep";
import { PaymentStep } from "@/components/checkout/steps/PaymentStep";
import { ReviewStep } from "@/components/checkout/steps/ReviewStep";
import { TermsStep } from "@/components/checkout/steps/TermsStep";
import { SubmitStep } from "@/components/checkout/steps/SubmitStep";
import { useCartHydrated } from "@/lib/hooks/use-cart-hydrated";
import { cn } from "@/lib/utilities/cn";
import { Button } from "@/components/ui/Button";

type CheckoutWizardProps = {
  stripeConfigured: boolean;
};

function flattenZodErrors(error: { issues: Array<{ path: PropertyKey[]; message: string }> }) {
  const map: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!map[key]) map[key] = issue.message;
  }
  return map;
}

function validateStep(stepId: CheckoutStepId, data: CheckoutWizardState): Record<string, string> {
  switch (stepId) {
    case "customer": {
      const result = adultCustomerSchema.safeParse(data.customer);
      return result.success ? {} : flattenZodErrors(result.error);
    }
    case "shipping": {
      const result = shippingAddressSchema.safeParse(data.shipping);
      return result.success ? {} : flattenZodErrors(result.error);
    }
    case "shipping-method": {
      const result = shippingMethodSchema.safeParse(data.shippingMethod);
      return result.success ? {} : flattenZodErrors(result.error);
    }
    case "gift": {
      const result = giftOptionsSchema.safeParse(data.gift);
      return result.success ? {} : flattenZodErrors(result.error);
    }
    case "safety": {
      const result = safetyAcknowledgmentSchema.safeParse(data.safety);
      return result.success ? {} : flattenZodErrors(result.error);
    }
    case "billing": {
      const result = billingAddressSchema.safeParse(data.billing);
      if (result.success) return {};
      const flat = flattenZodErrors(result.error);
      const mapped: Record<string, string> = {};
      for (const [key, value] of Object.entries(flat)) {
        if (key.startsWith("line1")) mapped.billingLine1 = value;
        else if (key.startsWith("city")) mapped.billingCity = value;
        else if (key.startsWith("state")) mapped.billingState = value;
        else if (key.startsWith("postalCode")) mapped.billingPostalCode = value;
        else mapped[key] = value;
      }
      return mapped;
    }
    case "terms": {
      const result = termsSchema.safeParse(data.terms);
      return result.success ? {} : flattenZodErrors(result.error);
    }
    default:
      return {};
  }
}

export function CheckoutWizard({ stripeConfigured }: CheckoutWizardProps) {
  const router = useRouter();
  const hydrated = useCartHydrated();
  const items = useCartStore((s) => s.items);
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<CheckoutWizardState>(() => {
    const cart = useCartStore.getState();
    return {
      ...defaultCheckoutState,
      gift: {
        ...defaultCheckoutState.gift,
        giftNote: cart.giftNote,
        isGift: cart.isGift,
        hidePrices: cart.hidePrices,
        giftWrap: cart.giftWrap,
      },
    };
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentStep = CHECKOUT_STEPS[stepIndex];
  const isDemo = storeMode.mode === "demo" || !stripeConfigured;

  const handleChange = useCallback((patch: Partial<CheckoutWizardState>) => {
    setData((prev) => ({ ...prev, ...patch }));
    setErrors({});
  }, []);

  const goNext = useCallback(() => {
    const stepErrors = validateStep(currentStep.id, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStepIndex((i) => Math.min(i + 1, CHECKOUT_STEPS.length - 1));
  }, [currentStep.id, data]);

  const goBack = useCallback(() => {
    setErrors({});
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const stepProps = useMemo(
    () => ({
      data,
      onChange: handleChange,
      onNext: goNext,
      onBack: goBack,
      errors,
    }),
    [data, handleChange, goNext, goBack, errors],
  );

  if (!hydrated) {
    return <p className="text-text-secondary">Loading checkout…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <h1 className="font-display text-3xl text-navy">Checkout</h1>
        <p className="mt-3 text-text-secondary">Your cart is empty. Add items before checking out.</p>
        <Button href="/new-arrivals" size="lg" className="mt-6">
          Continue shopping
        </Button>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep.id) {
      case "customer":
        return <CustomerStep {...stepProps} />;
      case "shipping":
        return <ShippingStep {...stepProps} />;
      case "shipping-method":
        return <ShippingMethodStep {...stepProps} />;
      case "gift":
        return <GiftStep {...stepProps} />;
      case "safety":
        return <SafetyStep {...stepProps} />;
      case "billing":
        return <BillingStep {...stepProps} />;
      case "payment":
        return <PaymentStep {...stepProps} stripeConfigured={stripeConfigured} />;
      case "review":
        return <ReviewStep {...stepProps} />;
      case "terms":
        return <TermsStep {...stepProps} />;
      case "submit":
        return (
          <SubmitStep
            {...stepProps}
            stripeConfigured={stripeConfigured}
            onSubmitSuccess={(url) => {
              if (url.startsWith("http")) {
                window.location.assign(url);
              } else {
                router.push(url);
              }
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
      <nav aria-label="Checkout progress" className="lg:sticky lg:top-24 lg:self-start">
        <ol className="space-y-2">
          {CHECKOUT_STEPS.map((step, index) => (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => index < stepIndex && setStepIndex(index)}
                disabled={index > stepIndex}
                className={cn(
                  "w-full rounded-[var(--radius-btn)] px-3 py-2 text-left text-sm transition-colors",
                  index === stepIndex
                    ? "bg-navy font-semibold text-cloud"
                    : index < stepIndex
                      ? "text-navy hover:bg-soft-gray"
                      : "text-text-secondary",
                )}
                aria-current={index === stepIndex ? "step" : undefined}
              >
                <span className="tabular mr-2 opacity-70">{index + 1}.</span>
                {step.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div>
        {isDemo ? (
          <DemoNotice
            className="mb-8"
            message="Demonstration mode. forms validate and the full checkout flow is testable, but payment, order fulfillment, and confirmation emails are disabled."
          />
        ) : null}
        {renderStep()}
      </div>
    </div>
  );
}

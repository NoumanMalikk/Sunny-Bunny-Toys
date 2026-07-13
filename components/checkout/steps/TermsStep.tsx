"use client";

import Link from "next/link";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import type { CheckoutStepProps } from "@/lib/checkout/wizard-types";

export function TermsStep({ data, onChange, onNext, onBack, errors }: CheckoutStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-navy">Terms &amp; policies</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Please review and accept the required agreements. Marketing consent is optional and unchecked by default.
        </p>
      </div>

      <Checkbox
        id="termsAccepted"
        checked={data.terms.termsAccepted === true}
        onChange={(e) =>
          onChange({ terms: { ...data.terms, termsAccepted: e.target.checked ? true : undefined } })
        }
        error={Boolean(errors.termsAccepted)}
        label={
          <span>
            I accept the{" "}
            <Link href="/terms" className="underline underline-offset-2" target="_blank">
              Terms &amp; Conditions
            </Link>
          </span>
        }
      />
      {errors.termsAccepted ? <p className="text-xs text-error">{errors.termsAccepted}</p> : null}

      <Checkbox
        id="privacyAccepted"
        checked={data.terms.privacyAccepted === true}
        onChange={(e) =>
          onChange({ terms: { ...data.terms, privacyAccepted: e.target.checked ? true : undefined } })
        }
        error={Boolean(errors.privacyAccepted)}
        label={
          <span>
            I accept the{" "}
            <Link href="/privacy" className="underline underline-offset-2" target="_blank">
              Privacy Policy
            </Link>
          </span>
        }
      />
      {errors.privacyAccepted ? <p className="text-xs text-error">{errors.privacyAccepted}</p> : null}

      <Checkbox
        id="marketingConsent"
        checked={data.terms.marketingConsent}
        onChange={(e) => onChange({ terms: { ...data.terms, marketingConsent: e.target.checked } })}
        label="Send me occasional marketing emails about new products and promotions (optional)"
      />

      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext} size="lg">
          Review &amp; place order
        </Button>
      </div>
    </div>
  );
}

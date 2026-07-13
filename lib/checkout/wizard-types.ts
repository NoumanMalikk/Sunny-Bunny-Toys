import type {
  AdultCustomerInput,
  BillingAddressInput,
  CheckoutFormInput,
  GiftOptionsInput,
  SafetyAcknowledgmentInput,
  ShippingAddressInput,
  ShippingMethodInput,
  TermsInput,
} from "@/lib/validation/checkout";
import { checkoutConfig, giftConfig } from "@/data/store-config";

export const CHECKOUT_STEPS = [
  { id: "customer", label: "Your info" },
  { id: "shipping", label: "Shipping" },
  { id: "shipping-method", label: "Delivery" },
  { id: "gift", label: "Gift options" },
  { id: "safety", label: "Safety review" },
  { id: "billing", label: "Billing" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
  { id: "terms", label: "Terms" },
  { id: "submit", label: "Place order" },
] as const;

export type CheckoutStepId = (typeof CHECKOUT_STEPS)[number]["id"];

export type CheckoutWizardState = CheckoutFormInput;

export const defaultCheckoutState: CheckoutWizardState = {
  customer: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    isAdult: undefined,
  },
  shipping: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: checkoutConfig.defaultCountry,
  },
  shippingMethod: { methodId: "standard" },
  gift: {
    isGift: false,
    giftNote: "",
    hidePrices: giftConfig.hidePricesOnPackingSlipDefault,
    giftWrap: false,
  },
  safety: {
    safetyAcknowledged: undefined,
    warningsReviewed: undefined,
  },
  billing: {
    sameAsShipping: true,
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: checkoutConfig.defaultCountry,
  },
  terms: {
    termsAccepted: undefined,
    privacyAccepted: undefined,
    marketingConsent: checkoutConfig.marketingConsentDefault,
  },
};

export type CheckoutStepProps = {
  data: CheckoutWizardState;
  onChange: (patch: Partial<CheckoutWizardState>) => void;
  onNext: () => void;
  onBack: () => void;
  errors: Record<string, string>;
};

export type SectionPatch =
  | { customer: Partial<AdultCustomerInput> }
  | { shipping: Partial<ShippingAddressInput> }
  | { shippingMethod: Partial<ShippingMethodInput> }
  | { gift: Partial<GiftOptionsInput> }
  | { safety: Partial<SafetyAcknowledgmentInput> }
  | { billing: Partial<BillingAddressInput> }
  | { terms: Partial<TermsInput> };

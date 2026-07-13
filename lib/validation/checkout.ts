import { z } from "zod";
import { checkoutConfig, giftConfig } from "@/data/store-config";

const usPhoneRegex = /^(\+1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const zipRegex = /^\d{5}(-\d{4})?$/;

export const adultCustomerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(usPhoneRegex, "Enter a valid US phone number")
    .optional()
    .or(z.literal("")),
  isAdult: checkoutConfig.requireAdultAcknowledgment
    ? z.literal(true, { message: "You must confirm you are 18 or older." })
    : z.boolean().optional(),
});

export const shippingAddressSchema = z.object({
  line1: z.string().trim().min(1, "Street address is required").max(120),
  line2: z.string().trim().max(120).optional().or(z.literal("")),
  city: z.string().trim().min(1, "City is required").max(80),
  state: z
    .string()
    .trim()
    .length(2, "Use a two-letter state code")
    .transform((v) => v.toUpperCase()),
  postalCode: z.string().trim().regex(zipRegex, "Enter a valid ZIP code"),
  country: z.literal(checkoutConfig.defaultCountry),
});

export const shippingMethodSchema = z.object({
  methodId: z.enum(["standard", "expedited"]),
});

export const giftOptionsSchema = z
  .object({
    isGift: z.boolean().default(false),
    giftNote: z.string().trim().max(240, "Gift note must be 240 characters or fewer").optional().or(z.literal("")),
    hidePrices: z.boolean().default(giftConfig.hidePricesOnPackingSlipDefault),
    giftWrap: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (giftConfig.giftNotesEnabled && data.isGift && data.giftNote && data.giftNote.length > 240) {
      ctx.addIssue({
        code: "custom",
        path: ["giftNote"],
        message: "Gift note must be 240 characters or fewer.",
      });
    }
    if (data.giftWrap && !giftConfig.giftWrapEnabled) {
      ctx.addIssue({
        code: "custom",
        path: ["giftWrap"],
        message: "Gift wrap is not available at this time.",
      });
    }
  });

export const safetyAcknowledgmentSchema = z.object({
  safetyAcknowledged: checkoutConfig.requireSafetyAcknowledgment
    ? z.literal(true, { message: "Please acknowledge product safety information." })
    : z.boolean().optional(),
  warningsReviewed: checkoutConfig.requireSafetyAcknowledgment
    ? z.literal(true, {
        message: "Please confirm you have reviewed age guidance and product warnings.",
      })
    : z.boolean().optional(),
});

export const billingAddressSchema = z
  .object({
    sameAsShipping: z.boolean().default(true),
    line1: z.string().trim().max(120).optional().or(z.literal("")),
    line2: z.string().trim().max(120).optional().or(z.literal("")),
    city: z.string().trim().max(80).optional().or(z.literal("")),
    state: z.string().trim().max(2).optional().or(z.literal("")),
    postalCode: z.string().trim().optional().or(z.literal("")),
    country: z.literal(checkoutConfig.defaultCountry).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.sameAsShipping) return;
    const requiredFields: Array<keyof typeof data> = ["line1", "city", "state", "postalCode"];
    for (const field of requiredFields) {
      if (!data[field]) {
        ctx.addIssue({
          code: "custom",
          path: [field],
          message: "Billing address field is required.",
        });
      }
    }
    if (data.state && data.state.length !== 2) {
      ctx.addIssue({ code: "custom", path: ["state"], message: "Use a two-letter state code." });
    }
    if (data.postalCode && !zipRegex.test(data.postalCode)) {
      ctx.addIssue({ code: "custom", path: ["postalCode"], message: "Enter a valid ZIP code." });
    }
  });

export const termsSchema = z.object({
  termsAccepted: checkoutConfig.requireTermsAcceptance
    ? z.literal(true, { message: "You must accept the terms and conditions." })
    : z.boolean().optional(),
  privacyAccepted: checkoutConfig.requireTermsAcceptance
    ? z.literal(true, { message: "You must accept the privacy policy." })
    : z.boolean().optional(),
  marketingConsent: z.boolean().default(checkoutConfig.marketingConsentDefault),
});

export const checkoutFormSchema = z.object({
  customer: adultCustomerSchema,
  shipping: shippingAddressSchema,
  shippingMethod: shippingMethodSchema,
  gift: giftOptionsSchema,
  safety: safetyAcknowledgmentSchema,
  billing: billingAddressSchema,
  terms: termsSchema,
});

const cartLineSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().optional(),
  quantity: z.number().int().min(1),
  price: z.number().positive(),
});

export const checkoutSessionRequestSchema = z.object({
  items: z.array(cartLineSchema).min(1),
  customer: adultCustomerSchema,
  shipping: shippingAddressSchema,
  billing: billingAddressSchema,
  shippingMethod: shippingMethodSchema,
  gift: giftOptionsSchema,
  safety: safetyAcknowledgmentSchema,
  terms: termsSchema,
  idempotencyKey: z.string().trim().min(8).max(128).optional(),
});

export type AdultCustomerInput = z.infer<typeof adultCustomerSchema>;
export type ShippingAddressInput = z.infer<typeof shippingAddressSchema>;
export type ShippingMethodInput = z.infer<typeof shippingMethodSchema>;
export type GiftOptionsInput = z.infer<typeof giftOptionsSchema>;
export type SafetyAcknowledgmentInput = z.infer<typeof safetyAcknowledgmentSchema>;
export type BillingAddressInput = z.infer<typeof billingAddressSchema>;
export type TermsInput = z.infer<typeof termsSchema>;
export type CheckoutFormInput = z.infer<typeof checkoutFormSchema>;
export type CheckoutSessionRequest = z.infer<typeof checkoutSessionRequestSchema>;

export const orderTrackSchema = z.object({
  orderRef: z.string().trim().min(6, "Enter your order reference."),
  email: z.string().trim().email("Enter the email used at checkout."),
});

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email address."),
  subject: z.string().trim().min(1, "Subject is required").max(160),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(2000),
  isAdult: z.literal(true, { message: "You must confirm you are 18 or older." }),
});

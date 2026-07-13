/**
 * Central brand and store configuration.
 * Change public brand name here without rebuilding page copy elsewhere.
 */

export const brand = {
  publicName: "Sunny Bunny Toy Co.",
  shortName: "Sunny Bunny",
  legalName: "Sunny Bunny Toys LLC",
  descriptor: "Dolls, Toys & Family Games",
  tagline: "Let the fun shine.",
  positioning: "Bright ideas begin with play.",
  supporting:
    "Discover dolls, plush friends, pretend-play sets, building toys, creative activities, puzzles and family games selected for joyful everyday play.",
  editorial: "More wonder in every day.",
  owner: "Darryl Lee Proffitt",
  locationDescriptor: "Moultrie, Georgia-based online toy retailer",
  cityStateZip: "Moultrie, Georgia 31768",
  address: {
    line1: "2615 Sylvester Dr",
    city: "Moultrie",
    state: "GA",
    postalCode: "31768",
    country: "United States",
    countryCode: "US",
  },
  phone: "+1 (305) 881-0184",
  phoneHref: "tel:+13058810184",
} as const;

export const announcementMessages = [
  "Bright toys, creative activities and family games for joyful play.",
  "Verified age guidance and applicable warnings appear on every product.",
] as const;

export const shippingConfig = {
  shippingEnabled: true,
  localPickupEnabled: false,
  localDeliveryEnabled: false,
  freeShippingEnabled: false,
  freeShippingThreshold: 75,
  flatShippingRate: 8.95,
  weightBasedEnabled: true,
  weightRatePerLb: 1.25,
  oversizedProductRate: 14.95,
  oversizedWeightThresholdLbs: 8,
  processingText: "Orders typically prepare for shipment within 1–3 business days after payment confirmation.",
  carrierEstimateText:
    "Available shipping methods and costs are calculated during checkout based on product size, weight, quantity and destination.",
  restrictedStates: [] as string[],
  excludedDestinations: [] as string[],
  demoMethods: [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "Demonstration rate — connect a carrier for live rates.",
      estimatedDays: "5–8 business days",
      baseRate: 8.95,
    },
    {
      id: "expedited",
      name: "Expedited Shipping",
      description: "Demonstration rate — connect a carrier for live rates.",
      estimatedDays: "2–4 business days",
      baseRate: 16.95,
    },
  ],
} as const;

export const taxConfig = {
  enabled: true,
  provider: "stripe-tax" as "stripe-tax" | "manual" | "external",
  message: "Taxes are calculated during checkout.",
  demoNote: "Demonstration mode shows estimated tax readiness without collecting payment.",
};

export const giftConfig = {
  giftNotesEnabled: true,
  giftWrapEnabled: process.env.NEXT_PUBLIC_GIFT_WRAP_ENABLED === "true",
  giftWrapPrice: 4.95,
  hidePricesOnPackingSlipDefault: true,
};

export const storeMode = {
  mode: (process.env.NEXT_PUBLIC_STORE_MODE || "demo") as "demo" | "production",
  showFullAddress: process.env.NEXT_PUBLIC_SHOW_FULL_ADDRESS === "true",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  supportEmail: process.env.SUPPORT_EMAIL || "support@example.com",
  contactRecipient: process.env.CONTACT_FORM_RECIPIENT || "support@example.com",
  orderEmailFrom: process.env.ORDER_EMAIL_FROM || "orders@example.com",
};

export const returnsConfig = {
  returnRequestDays: 30,
  restockingFeeEnabled: false,
  restockingFeePercent: 0,
  requireOriginalPackaging: true,
  requireUnusedCondition: true,
  requireCompleteComponents: true,
};

export const checkoutConfig = {
  defaultCountry: "US",
  requireAdultAcknowledgment: true,
  requireSafetyAcknowledgment: true,
  requireTermsAcceptance: true,
  marketingConsentDefault: false,
  maxCompareItems: 4,
  maxOrderQuantityDefault: 10,
};

export const seoDefaults = {
  homeTitle: "Sunny Bunny Toy Co. | Dolls, Creative Toys and Family Games",
  homeDescription:
    "Shop dolls, plush toys, pretend-play sets, building toys, creative activities, puzzles and family games from Sunny Bunny Toys LLC.",
  organizationDescription:
    "Sunny Bunny Toys LLC is a Moultrie, Georgia-based online retailer of dolls, toys, creative activities and family games.",
};

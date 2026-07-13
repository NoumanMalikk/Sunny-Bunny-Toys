import { describe, expect, it } from "vitest";
import type { Product } from "@/lib/types/product";
import { canAddToCart, getProductActivationStatus, formatAgeRange } from "@/lib/safety/product-activation";

function createVerifiedProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: "test-1",
    sku: "SB-TEST-001",
    supplierSku: "SUP-001",
    upc: "012345678901",
    slug: "test-product",
    brand: "Sunny Bunny Toy Co.",
    manufacturer: "Verified Manufacturer Inc.",
    importer: "Sunny Bunny Toys LLC",
    title: "Test Product",
    subtitle: "Test",
    category: "dolls-plush",
    secondaryCategories: [],
    collections: [],
    playStyles: ["imagine"],
    price: 19.99,
    compareAtPrice: null,
    currency: "USD",
    shortDescription: "Short",
    fullDescription: "Full",
    playDescription: "Play",
    ageMinimum: 3,
    ageMaximum: 8,
    ageGradeSource: "Manufacturer label",
    ageGradeVerified: true,
    ageGradeVerifiedAt: "2026-01-01",
    adultSupervisionRequired: false,
    warningText: null,
    warningRequired: false,
    chokingHazard: false,
    smallParts: false,
    magnetsIncluded: false,
    batteryIncluded: false,
    batteryType: null,
    batteryCount: 0,
    material: "Polyester",
    fillingMaterial: null,
    paintOrCoating: null,
    dimensions: { lengthIn: 10, widthIn: 5, heightIn: 3, unit: "in" },
    weightLbs: 0.5,
    pieceCount: null,
    packageContents: ["1 plush toy"],
    assemblyRequired: false,
    instructionsIncluded: true,
    careInstructions: "Surface wash",
    safetyInstructions: "Adult supervision",
    images: [{ src: "/products/test/main.jpg", alt: "Test", type: "main" }],
    imageSource: "manufacturer",
    imageLicense: "Manufacturer license on file",
    availableColors: [],
    availableVariants: [],
    stockStatus: "in_stock",
    maximumOrderQuantity: 10,
    shippingWeight: 0.5,
    featured: false,
    newArrival: false,
    giftEligible: true,
    underTwentyFive: true,
    underFifty: true,
    relatedProductIds: [],
    complianceVerified: true,
    cpcRequired: true,
    cpcDocumentReference: "CPC-2026-001",
    testReportReference: null,
    trackingLabelCode: "TL-001",
    active: true,
    incomplete: false,
    incompleteReasons: [],
    seoTitle: "Test",
    seoDescription: "Test",
    keyDetail: "12 inch",
    ...overrides,
  };
}

describe("getProductActivationStatus", () => {
  it("allows purchase for fully verified product", () => {
    const result = getProductActivationStatus(createVerifiedProduct());
    expect(result.canPurchase).toBe(true);
    expect(result.reasons).toHaveLength(0);
  });

  it("blocks inactive products", () => {
    const result = getProductActivationStatus(createVerifiedProduct({ active: false }));
    expect(result.canPurchase).toBe(false);
    expect(result.reasons).toContain("Product is marked inactive.");
  });

  it("blocks out of stock products", () => {
    const result = getProductActivationStatus(
      createVerifiedProduct({ stockStatus: "out_of_stock" }),
    );
    expect(result.canPurchase).toBe(false);
  });

  it("allows incomplete catalogue products in demo mode", () => {
    const result = getProductActivationStatus(
      createVerifiedProduct({
        incomplete: true,
        incompleteReasons: ["Photography pending"],
        complianceVerified: false,
        ageGradeVerified: false,
        manufacturer: "Pending verification",
        supplierSku: "PENDING-SB-001",
        cpcDocumentReference: null,
        trackingLabelCode: null,
      }),
    );
    expect(result.canPurchase).toBe(true);
  });
});

describe("canAddToCart", () => {
  it("delegates to getProductActivationStatus", () => {
    const product = createVerifiedProduct({ active: false });
    expect(canAddToCart(product).canPurchase).toBe(false);
    expect(canAddToCart(product).reasons).toContain("Product is marked inactive.");
  });
});

describe("catalogue draft products", () => {
  it("allows purchase for active catalogue products in demo mode", async () => {
    const { products } = await import("@/data/products");
    for (const product of products) {
      const result = canAddToCart(product);
      expect(result.canPurchase).toBe(true);
    }
  });
});

describe("formatAgeRange", () => {
  it("formats open and closed ranges without em dashes", () => {
    expect(formatAgeRange(3, null)).toBe("Ages 3+");
    expect(formatAgeRange(5, 7)).toBe("Ages 5-7");
  });
});

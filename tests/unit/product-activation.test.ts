import { describe, expect, it } from "vitest";
import type { Product } from "@/lib/types/product";
import { canAddToCart, getProductActivationStatus } from "@/lib/safety/product-activation";

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

  it("blocks purchase when product is incomplete", () => {
    const result = getProductActivationStatus(
      createVerifiedProduct({
        incomplete: true,
        incompleteReasons: ["Photography pending"],
      }),
    );
    expect(result.canPurchase).toBe(false);
    expect(result.reasons).toContain("Photography pending");
  });

  it("blocks purchase when compliance is not verified", () => {
    const result = getProductActivationStatus(
      createVerifiedProduct({ complianceVerified: false }),
    );
    expect(result.canPurchase).toBe(false);
    expect(result.reasons).toContain("Compliance records are not verified.");
  });

  it("blocks purchase when CPC reference is missing", () => {
    const result = getProductActivationStatus(
      createVerifiedProduct({ cpcDocumentReference: null }),
    );
    expect(result.canPurchase).toBe(false);
    expect(result.reasons).toContain("Children's Product Certificate reference is missing.");
  });

  it("blocks purchase when warning is required but missing", () => {
    const result = getProductActivationStatus(
      createVerifiedProduct({
        warningRequired: true,
        warningText: null,
      }),
    );
    expect(result.canPurchase).toBe(false);
    expect(result.reasons).toContain("Required warning text is missing.");
  });

  it("blocks purchase for placeholder images", () => {
    const result = getProductActivationStatus(
      createVerifiedProduct({
        imageSource: "placeholder",
        images: [{ src: "/products/test/main.svg", alt: "Test", type: "placeholder" }],
      }),
    );
    expect(result.canPurchase).toBe(false);
    expect(result.reasons).toContain("Exact authorized product photography is required.");
  });

  it("blocks purchase for pending manufacturer and SKU", () => {
    const result = getProductActivationStatus(
      createVerifiedProduct({
        manufacturer: "Pending verification",
        supplierSku: "PENDING-SB-001",
      }),
    );
    expect(result.canPurchase).toBe(false);
    expect(result.reasons).toContain("Manufacturer must be verified.");
    expect(result.reasons).toContain("Supplier SKU must be verified.");
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
  it("blocks purchase for all incomplete draft listings", async () => {
    const { products } = await import("@/data/products");
    for (const product of products) {
      const result = canAddToCart(product);
      expect(result.canPurchase).toBe(false);
      expect(result.reasons.length).toBeGreaterThan(0);
    }
  });
});

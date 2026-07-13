import { describe, expect, it } from "vitest";
import { getActiveProducts } from "@/data/products";
import { searchProducts } from "@/lib/utilities/search";

const products = getActiveProducts();

describe("searchProducts synonyms", () => {
  it("finds plush bunny via synonym expansion", () => {
    const results = searchProducts(products, "plush bunny");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.product.slug.includes("bunny"))).toBe(true);
    expect(results.some((r) => r.matchedFields.includes("synonym"))).toBe(true);
  });

  it("finds dollhouse products", () => {
    const results = searchProducts(products, "dollhouse");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.product.slug.includes("dollhouse"))).toBe(true);
  });

  it("finds building tiles via magnetic synonym", () => {
    const results = searchProducts(products, "building tiles");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.product.slug.includes("magnetic"))).toBe(true);
  });

  it("finds pretend kitchen via little baker synonym", () => {
    const results = searchProducts(products, "pretend kitchen");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.product.title.toLowerCase().includes("baker"))).toBe(true);
  });

  it("finds family game products", () => {
    const results = searchProducts(products, "family game");
    expect(results.length).toBeGreaterThan(0);
  });

  it("finds outdoor toy products", () => {
    const results = searchProducts(products, "outdoor toy");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.product.category === "outdoor-play")).toBe(true);
  });

  it("returns empty for blank query", () => {
    expect(searchProducts(products, "   ")).toHaveLength(0);
  });

  it("ranks title matches highly", () => {
    const results = searchProducts(products, "honeyhop");
    expect(results[0]?.product.slug).toBe("honeyhop-plush-bunny-12-inch");
    expect(results[0]?.matchedFields).toContain("title");
  });
});

import { describe, expect, it } from "vitest";
import { getActiveProducts } from "@/data/products";
import {
  countActiveFilters,
  filterAndSortProducts,
  filterProducts,
  sortProducts,
  type ProductFilters,
} from "@/lib/utilities/filters";

const products = getActiveProducts();

describe("filterProducts", () => {
  it("returns only active products", () => {
    const filtered = filterProducts(products, {});
    expect(filtered.every((p) => p.active)).toBe(true);
    expect(filtered).toHaveLength(26);
  });

  it("filters by category", () => {
    const filtered = filterProducts(products, { category: "dolls-plush" });
    expect(filtered.every((p) => p.category === "dolls-plush")).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);
  });

  it("filters by age range overlap", () => {
    const filtered = filterProducts(products, { ageMin: 3, ageMax: 5 });
    for (const product of filtered) {
      if (product.ageMaximum !== null) {
        expect(product.ageMaximum).toBeGreaterThanOrEqual(3);
      }
      expect(product.ageMinimum).toBeLessThanOrEqual(5);
    }
  });

  it("filters under-25 gifts", () => {
    const filtered = filterProducts(products, { under25: true });
    expect(filtered.every((p) => p.underTwentyFive)).toBe(true);
  });

  it("filters by play style", () => {
    const filtered = filterProducts(products, { playStyle: "construct" });
    expect(filtered.every((p) => p.playStyles.includes("construct"))).toBe(true);
  });

  it("filters battery-free products", () => {
    const filtered = filterProducts(products, { batteryFree: true });
    expect(filtered.every((p) => !p.batteryIncluded)).toBe(true);
  });

  it("filters featured products", () => {
    const filtered = filterProducts(products, { featured: true });
    expect(filtered.every((p) => p.featured)).toBe(true);
  });
});

describe("sortProducts", () => {
  it("sorts by price ascending", () => {
    const sorted = sortProducts(products, "price-asc");
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].price).toBeGreaterThanOrEqual(sorted[i - 1].price);
    }
  });

  it("sorts by price descending", () => {
    const sorted = sortProducts(products, "price-desc");
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].price).toBeLessThanOrEqual(sorted[i - 1].price);
    }
  });

  it("sorts alphabetically", () => {
    const sorted = sortProducts(products, "alpha");
    const titles = sorted.map((p) => p.title);
    expect([...titles].sort((a, b) => a.localeCompare(b))).toEqual(titles);
  });
});

describe("filterAndSortProducts", () => {
  it("combines category filter with price sort", () => {
    const filters: ProductFilters = { category: "puzzles-games" };
    const result = filterAndSortProducts(products, filters, "price-asc");
    expect(result.every((p) => p.category === "puzzles-games")).toBe(true);
    for (let i = 1; i < result.length; i++) {
      expect(result[i].price).toBeGreaterThanOrEqual(result[i - 1].price);
    }
  });
});

describe("countActiveFilters", () => {
  it("counts applied filters", () => {
    expect(countActiveFilters({})).toBe(0);
    expect(countActiveFilters({ category: "dolls-plush", under25: true })).toBe(2);
    expect(countActiveFilters({ ageMin: 3, ageMax: 8 })).toBe(1);
  });
});

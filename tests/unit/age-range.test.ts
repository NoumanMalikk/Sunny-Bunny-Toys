import { describe, expect, it } from "vitest";
import { getActiveProducts } from "@/data/products";
import { formatAgeRange } from "@/lib/safety/product-activation";
import { filterProducts } from "@/lib/utilities/filters";

describe("formatAgeRange", () => {
  it("formats bounded age range", () => {
    expect(formatAgeRange(3, 8)).toBe("Ages 3-8");
    expect(formatAgeRange(6, 12)).toBe("Ages 6-12");
  });

  it("formats open-ended age range with plus", () => {
    expect(formatAgeRange(14, null)).toBe("Ages 14+");
    expect(formatAgeRange(3, null)).toBe("Ages 3+");
  });
});

describe("age range overlap (filterProducts)", () => {
  const products = getActiveProducts();

  it("includes products whose range overlaps filter 3-5", () => {
    const filtered = filterProducts(products, { ageMin: 3, ageMax: 5 });
    expect(filtered.length).toBeGreaterThan(0);

    for (const product of filtered) {
      const productMax = product.ageMaximum ?? product.ageMinimum;
      expect(product.ageMinimum).toBeLessThanOrEqual(5);
      expect(productMax).toBeGreaterThanOrEqual(3);
    }
  });

  it("excludes products entirely above filter max", () => {
    const filtered = filterProducts(products, { ageMax: 2 });
    for (const product of filtered) {
      expect(product.ageMinimum).toBeLessThanOrEqual(2);
    }
  });

  it("excludes products entirely below filter min", () => {
    const filtered = filterProducts(products, { ageMin: 14 });
    for (const product of filtered) {
      const productMax = product.ageMaximum ?? Infinity;
      expect(productMax).toBeGreaterThanOrEqual(14);
    }
  });

  it("matches shop-by-age style ranges used in catalogue", () => {
    const ages3to5 = filterProducts(products, { ageMin: 3, ageMax: 5 });
    const ages6to8 = filterProducts(products, { ageMin: 6, ageMax: 8 });

    expect(ages3to5.length).toBeGreaterThan(0);
    expect(ages6to8.length).toBeGreaterThan(0);

    const overlap = ages3to5.filter((p) => ages6to8.some((q) => q.id === p.id));
    for (const product of overlap) {
      const max = product.ageMaximum ?? product.ageMinimum;
      expect(product.ageMinimum).toBeLessThanOrEqual(8);
      expect(max).toBeGreaterThanOrEqual(3);
    }
  });
});

import { describe, expect, it } from "vitest";
import type { CartItem } from "@/lib/cart/store";
import {
  calculateGiftWrapTotal,
  calculateOrderTotals,
  calculateSubtotal,
} from "@/lib/checkout/totals";

function createCartItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    productId: "prod-1",
    slug: "test-product",
    title: "Test Product",
    price: 19.99,
    quantity: 2,
    image: "/products/test/main.jpg",
    ageMinimum: 3,
    ageMaximum: 8,
    warningText: null,
    warningRequired: false,
    pieceCount: null,
    maxQty: 10,
    incomplete: false,
    complianceVerified: true,
    ...overrides,
  };
}

describe("calculateSubtotal", () => {
  it("sums line totals with rounding", () => {
    const items = [createCartItem({ price: 10.5, quantity: 2 }), createCartItem({ price: 5.25, quantity: 1 })];
    expect(calculateSubtotal(items)).toBe(26.25);
  });

  it("returns zero for empty cart", () => {
    expect(calculateSubtotal([])).toBe(0);
  });
});

describe("calculateGiftWrapTotal", () => {
  it("returns zero when gift wrap disabled", () => {
    expect(calculateGiftWrapTotal(false)).toBe(0);
    expect(calculateGiftWrapTotal(true)).toBe(0);
  });
});

describe("calculateOrderTotals", () => {
  it("calculates subtotal, shipping, and total", () => {
    const items = [createCartItem({ price: 24.99, quantity: 1 })];
    const totals = calculateOrderTotals({
      items,
      shipping: {
        methodId: "standard",
        methodName: "Standard",
        amount: 8.95,
        estimatedDays: "5–8 days",
        description: "Demonstration rate",
      },
      giftWrap: false,
    });

    expect(totals.subtotal).toBe(24.99);
    expect(totals.shipping).toBe(8.95);
    expect(totals.giftWrap).toBe(0);
    expect(totals.total).toBe(33.94);
    expect(totals.estimatedTax).toBeNull();
    expect(totals.taxMessage).toBeTruthy();
  });

  it("handles null shipping quote", () => {
    const totals = calculateOrderTotals({
      items: [createCartItem()],
      shipping: null,
    });
    expect(totals.shipping).toBe(0);
    expect(totals.total).toBe(totals.subtotal);
  });

  it("rounds combined totals correctly", () => {
    const items = [createCartItem({ price: 8.95, quantity: 3 })];
    const totals = calculateOrderTotals({
      items,
      shipping: {
        methodId: "standard",
        methodName: "Standard",
        amount: 8.95,
        estimatedDays: "5–8 days",
        description: "Demonstration rate",
      },
    });
    expect(totals.subtotal).toBe(26.85);
    expect(totals.total).toBe(35.8);
  });
});

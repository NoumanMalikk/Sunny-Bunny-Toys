import { describe, expect, it } from "vitest";
import { formatPrice, roundMoney } from "@/lib/pricing/format";

describe("formatPrice", () => {
  it("formats USD amounts with two decimal places", () => {
    expect(formatPrice(24.99)).toBe("$24.99");
    expect(formatPrice(0)).toBe("$0.00");
    expect(formatPrice(1000)).toBe("$1,000.00");
  });

  it("respects currency parameter", () => {
    expect(formatPrice(10, "EUR")).toMatch(/10\.00/);
  });
});

describe("roundMoney", () => {
  it("rounds to two decimal places", () => {
    expect(roundMoney(10.005)).toBe(10.01);
    expect(roundMoney(10.004)).toBe(10);
    expect(roundMoney(1.235)).toBe(1.24);
  });

  it("handles floating-point edge cases", () => {
    expect(roundMoney(0.1 + 0.2)).toBe(0.3);
    expect(roundMoney(8.95 * 3)).toBe(26.85);
  });
});

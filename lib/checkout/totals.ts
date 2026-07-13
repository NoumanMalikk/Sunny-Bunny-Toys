import type { CartItem } from "@/lib/cart/store";
import { roundMoney } from "@/lib/pricing/format";
import { giftConfig, taxConfig } from "@/data/store-config";
import type { ShippingQuote } from "@/lib/checkout/shipping";

export type OrderTotalsInput = {
  items: CartItem[];
  shipping: ShippingQuote | null;
  giftWrap?: boolean;
};

export type OrderTotals = {
  subtotal: number;
  shipping: number;
  giftWrap: number;
  estimatedTax: number | null;
  taxMessage: string;
  total: number;
};

export function calculateSubtotal(items: CartItem[]): number {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return roundMoney(subtotal);
}

export function calculateGiftWrapTotal(giftWrap: boolean): number {
  if (!giftWrap || !giftConfig.giftWrapEnabled) return 0;
  return roundMoney(giftConfig.giftWrapPrice);
}

export function calculateOrderTotals(input: OrderTotalsInput): OrderTotals {
  const subtotal = calculateSubtotal(input.items);
  const shipping = input.shipping?.amount ?? 0;
  const giftWrap = calculateGiftWrapTotal(Boolean(input.giftWrap));

  const estimatedTax: number | null = null;
  const taxMessage = taxConfig.enabled
    ? taxConfig.message
    : "Tax calculation is not enabled in this demonstration store.";

  const total = roundMoney(subtotal + shipping + giftWrap + (estimatedTax ?? 0));

  return {
    subtotal,
    shipping: roundMoney(shipping),
    giftWrap,
    estimatedTax,
    taxMessage,
    total,
  };
}

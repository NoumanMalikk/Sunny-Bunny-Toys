import type { CartItem } from "@/lib/cart/store";
import { roundMoney } from "@/lib/pricing/format";
import { shippingConfig } from "@/data/store-config";

export type ShippingMethodId = (typeof shippingConfig.demoMethods)[number]["id"];

export type ShippingInput = {
  items: Pick<CartItem, "quantity" | "price">[];
  totalWeightLbs: number;
  methodId: ShippingMethodId;
  itemCount: number;
};

export type ShippingQuote = {
  methodId: ShippingMethodId;
  methodName: string;
  estimatedDays: string;
  amount: number;
  description: string;
};

function getMethod(methodId: ShippingMethodId) {
  const method = shippingConfig.demoMethods.find((m) => m.id === methodId);
  if (!method) throw new Error(`Unknown shipping method: ${methodId}`);
  return method;
}

export function calculateItemWeight(totalWeightLbs: number, itemCount: number): number {
  if (itemCount <= 0) return 0;
  return totalWeightLbs;
}

export function calculateDemoShipping(input: ShippingInput): ShippingQuote {
  const method = getMethod(input.methodId);
  let amount: number = method.baseRate;

  if (shippingConfig.weightBasedEnabled && input.totalWeightLbs > 0) {
    amount += roundMoney(input.totalWeightLbs * shippingConfig.weightRatePerLb);
  }

  if (
    input.totalWeightLbs >= shippingConfig.oversizedWeightThresholdLbs ||
    input.itemCount >= 6
  ) {
    amount += shippingConfig.oversizedProductRate;
  }

  if (!shippingConfig.freeShippingEnabled) {
    amount = roundMoney(amount);
    return {
      methodId: method.id,
      methodName: method.name,
      estimatedDays: method.estimatedDays,
      amount,
      description: method.description,
    };
  }

  const subtotal = input.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (subtotal >= shippingConfig.freeShippingThreshold) {
    amount = 0;
  }

  return {
    methodId: method.id,
    methodName: method.name,
    estimatedDays: method.estimatedDays,
    amount: roundMoney(amount),
    description: method.description,
  };
}

export function getAvailableShippingMethods(): typeof shippingConfig.demoMethods {
  return shippingConfig.demoMethods;
}

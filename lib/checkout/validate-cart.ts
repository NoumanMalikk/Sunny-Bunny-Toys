import { getProductById } from "@/data/products";
import { roundMoney } from "@/lib/pricing/format";
import { canAddToCart } from "@/lib/safety/product-activation";
import type { CartItem } from "@/lib/cart/store";
import type { OrderLineItem } from "@/lib/orders/types";

export type CartLineInput = {
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
};

export type ValidatedCartResult =
  | { ok: true; items: OrderLineItem[]; totalWeightLbs: number }
  | { ok: false; errors: string[] };

export function validateCartLines(lines: CartLineInput[]): ValidatedCartResult {
  const errors: string[] = [];

  if (lines.length === 0) {
    return { ok: false, errors: ["Your cart is empty."] };
  }

  const validatedItems: OrderLineItem[] = [];
  let totalWeightLbs = 0;

  for (const line of lines) {
    const product = getProductById(line.productId);
    if (!product || !product.active) {
      errors.push(`Product ${line.productId} is not available.`);
      continue;
    }

    const activation = canAddToCart(product);
    if (!activation.canPurchase) {
      errors.push(`${product.title}: ${activation.reasons[0] ?? "Cannot be purchased."}`);
      continue;
    }

    if (line.variantId) {
      const variant = product.availableVariants.find((v) => v.id === line.variantId);
      if (!variant || !variant.available) {
        errors.push(`${product.title}: selected variant is not available.`);
        continue;
      }
    }

    if (line.quantity < 1 || line.quantity > product.maximumOrderQuantity) {
      errors.push(`${product.title}: quantity must be between 1 and ${product.maximumOrderQuantity}.`);
      continue;
    }

    if (roundMoney(line.price) !== roundMoney(product.price)) {
      errors.push(`${product.title}: price mismatch. refresh your cart and try again.`);
      continue;
    }

    const variant = line.variantId
      ? product.availableVariants.find((v) => v.id === line.variantId)
      : undefined;

    validatedItems.push({
      productId: product.id,
      slug: product.slug,
      sku: product.sku,
      title: product.title,
      variantId: line.variantId,
      variantLabel: variant?.label,
      image: product.images[0]?.src ?? "",
      quantity: line.quantity,
      unitPrice: product.price,
      lineTotal: roundMoney(product.price * line.quantity),
      ageMinimum: product.ageMinimum,
      ageMaximum: product.ageMaximum,
      warningText: product.warningText,
      warningRequired: product.warningRequired,
      warningShown: Boolean(product.warningRequired && product.warningText),
      pieceCount: product.pieceCount,
    });

    totalWeightLbs += product.shippingWeight * line.quantity;
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, items: validatedItems, totalWeightLbs };
}

export function cartItemsToLineInput(items: CartItem[]): CartLineInput[] {
  return items.map((item) => ({
    productId: item.productId,
    variantId: item.variantId,
    quantity: item.quantity,
    price: item.price,
  }));
}

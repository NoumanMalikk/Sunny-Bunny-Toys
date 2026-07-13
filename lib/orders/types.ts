import type { GiftOptions } from "@/lib/cart/store";
import type { AdultCustomerInput, ShippingAddressInput } from "@/lib/validation/checkout";
import type { ShippingMethodId } from "@/lib/checkout/shipping";

export type OrderStatus =
  | "payment_received"
  | "processing"
  | "preparing_shipment"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"
  | "safety_hold";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded" | "demo_blocked";

export type OrderLineItem = {
  productId: string;
  slug: string;
  sku: string;
  title: string;
  variantId?: string;
  variantLabel?: string;
  image: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  ageMinimum: number;
  ageMaximum: number | null;
  warningText: string | null;
  warningRequired: boolean;
  warningShown: boolean;
  pieceCount: number | null;
};

export type OrderAddress = ShippingAddressInput & {
  firstName?: string;
  lastName?: string;
};

export type Order = {
  id: string;
  orderRef: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  customer: AdultCustomerInput;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  shippingMethodId: ShippingMethodId;
  shippingMethodName: string;
  gift: GiftOptions;
  safetyAcknowledged: boolean;
  warningsReviewed: boolean;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  marketingConsent: boolean;
  items: OrderLineItem[];
  subtotal: number;
  shipping: number;
  giftWrap: number;
  tax: number | null;
  total: number;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  idempotencyKey?: string;
  demoMode: boolean;
  trackingNumber?: string;
  carrierName?: string;
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  payment_received: "Payment received",
  processing: "Processing",
  preparing_shipment: "Preparing shipment",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
  safety_hold: "Safety hold",
};

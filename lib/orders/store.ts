import { customAlphabet } from "nanoid";
import type { Order, OrderStatus } from "@/lib/orders/types";

const generateOrderRef = customAlphabet("23456789ABCDEFGHJKLMNPQRSTUVWXYZ", 10);

const ordersByRef = new Map<string, Order>();
const ordersBySessionId = new Map<string, Order>();
const ordersByIdempotencyKey = new Map<string, Order>();

export function createOrderRef(): string {
  return `SBT-${generateOrderRef()}`;
}

export function saveOrder(order: Order): Order {
  ordersByRef.set(order.orderRef, order);
  if (order.stripeSessionId) {
    ordersBySessionId.set(order.stripeSessionId, order);
  }
  if (order.idempotencyKey) {
    ordersByIdempotencyKey.set(order.idempotencyKey, order);
  }
  return order;
}

export function getOrderByRef(orderRef: string): Order | undefined {
  return ordersByRef.get(orderRef.toUpperCase());
}

export function getOrderBySessionId(sessionId: string): Order | undefined {
  return ordersBySessionId.get(sessionId);
}

export function getOrderByIdempotencyKey(key: string): Order | undefined {
  return ordersByIdempotencyKey.get(key);
}

export function findOrdersByEmail(email: string): Order[] {
  const normalized = email.trim().toLowerCase();
  return Array.from(ordersByRef.values()).filter(
    (order) => order.customer.email.trim().toLowerCase() === normalized,
  );
}

export function updateOrderStatus(orderRef: string, status: OrderStatus): Order | undefined {
  const order = getOrderByRef(orderRef);
  if (!order) return undefined;
  const updated: Order = { ...order, status, updatedAt: new Date().toISOString() };
  return saveOrder(updated);
}

export function markOrderPaid(orderRef: string, stripePaymentIntentId?: string): Order | undefined {
  const order = getOrderByRef(orderRef);
  if (!order) return undefined;
  const updated: Order = {
    ...order,
    paymentStatus: "paid",
    status: "payment_received",
    stripePaymentIntentId,
    updatedAt: new Date().toISOString(),
  };
  return saveOrder(updated);
}

export function getAllOrders(): Order[] {
  return Array.from(ordersByRef.values());
}

import { getOrderByRef } from "@/lib/orders/store";
import { ORDER_STATUS_LABELS } from "@/lib/orders/types";
import { orderTrackSchema } from "@/lib/validation/checkout";
import { getClientIp, rateLimit } from "@/lib/utilities/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`order-track:${ip}`, 10, 60_000);

  if (!limit.allowed) {
    return Response.json(
      { ok: false, message: "Too many lookup attempts. Please wait and try again." },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const parsed = orderTrackSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid request." },
        { status: 400 },
      );
    }

    const orderRef = parsed.data.orderRef.toUpperCase();
    const order = getOrderByRef(orderRef);

    if (!order) {
      return Response.json(
        { ok: false, message: "No order found with that reference and email combination." },
        { status: 404 },
      );
    }

    const emailMatch =
      order.customer.email.trim().toLowerCase() === parsed.data.email.trim().toLowerCase();

    if (!emailMatch) {
      return Response.json(
        { ok: false, message: "No order found with that reference and email combination." },
        { status: 404 },
      );
    }

    return Response.json({
      ok: true,
      order: {
        orderRef: order.orderRef,
        status: order.status,
        statusLabel: ORDER_STATUS_LABELS[order.status],
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        total: order.total,
        shippingMethodName: order.shippingMethodName,
        trackingNumber: order.trackingNumber ?? null,
        carrierName: order.carrierName ?? null,
        demoMode: order.demoMode,
        items: order.items.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          image: item.image,
        })),
        timeline: buildTimeline(order.status, order.createdAt, order.updatedAt),
      },
    });
  } catch {
    return Response.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }
}

function buildTimeline(status: keyof typeof ORDER_STATUS_LABELS, createdAt: string, updatedAt: string) {
  const allStatuses = [
    "payment_received",
    "processing",
    "preparing_shipment",
    "shipped",
    "delivered",
  ] as const;

  const terminal = ["cancelled", "refunded", "safety_hold"] as const;
  if ((terminal as readonly string[]).includes(status)) {
    return [
      { status, label: ORDER_STATUS_LABELS[status], at: updatedAt, current: true },
    ];
  }

  const currentIndex = allStatuses.indexOf(status as (typeof allStatuses)[number]);
  return allStatuses.map((step, index) => ({
    status: step,
    label: ORDER_STATUS_LABELS[step],
    at: index === 0 ? createdAt : index <= currentIndex ? updatedAt : null,
    current: step === status,
    completed: index < currentIndex,
  }));
}
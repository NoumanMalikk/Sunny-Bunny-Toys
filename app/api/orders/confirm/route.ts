import { getOrderByRef, getOrderBySessionId, markOrderPaid } from "@/lib/orders/store";
import { sendOrderConfirmationEmail } from "@/lib/email/order-confirmation";
import { getStripe, isDemoMode } from "@/lib/stripe/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");
  const orderRef = searchParams.get("orderRef");

  if (isDemoMode()) {
    return Response.json({
      ok: false,
      verified: false,
      demo: true,
      message: "Demonstration mode — no paid order was created.",
    });
  }

  if (!sessionId && !orderRef) {
    return Response.json(
      { ok: false, verified: false, message: "session_id or orderRef is required." },
      { status: 400 },
    );
  }

  let order = sessionId ? getOrderBySessionId(sessionId) : undefined;
  if (!order && orderRef) {
    order = getOrderByRef(orderRef);
  }

  if (!order) {
    return Response.json({ ok: false, verified: false, message: "Order not found." }, { status: 404 });
  }

  if (order.paymentStatus === "paid") {
    return Response.json({
      ok: true,
      verified: true,
      order: sanitizeOrder(order),
    });
  }

  if (!sessionId && order.stripeSessionId) {
    return Response.json({
      ok: false,
      verified: false,
      message: "Payment not yet confirmed. Provide session_id to verify.",
    });
  }

  const stripeSessionId = sessionId ?? order.stripeSessionId;
  if (!stripeSessionId) {
    return Response.json({ ok: false, verified: false, message: "No payment session associated." }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

    if (session.payment_status !== "paid") {
      return Response.json({
        ok: false,
        verified: false,
        paymentStatus: session.payment_status,
        message: "Payment has not been completed.",
      });
    }

    const paidOrder = markOrderPaid(
      order.orderRef,
      typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
    );

    if (paidOrder) {
      await sendOrderConfirmationEmail(paidOrder);
    }

    return Response.json({
      ok: true,
      verified: true,
      order: sanitizeOrder(paidOrder ?? order),
    });
  } catch (error) {
    console.error("Order confirm error:", error);
    return Response.json({ ok: false, verified: false, message: "Unable to verify payment." }, { status: 500 });
  }
}

function sanitizeOrder(order: ReturnType<typeof getOrderByRef>) {
  if (!order) return null;
  return {
    orderRef: order.orderRef,
    status: order.status,
    paymentStatus: order.paymentStatus,
    total: order.total,
    createdAt: order.createdAt,
    customer: { firstName: order.customer.firstName, email: order.customer.email },
    items: order.items.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      lineTotal: item.lineTotal,
    })),
    demoMode: order.demoMode,
  };
}

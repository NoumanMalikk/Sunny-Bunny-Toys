import { headers } from "next/headers";
import Stripe from "stripe";
import { markOrderPaid, getOrderBySessionId } from "@/lib/orders/store";
import { sendOrderConfirmationEmail } from "@/lib/email/order-confirmation";
import { getStripe, getStripeWebhookSecret, isDemoMode } from "@/lib/stripe/client";

const processedEvents = new Set<string>();

export async function POST(request: Request) {
  if (isDemoMode()) {
    return Response.json({ ok: false, message: "Webhooks disabled in demonstration mode." }, { status: 503 });
  }

  const webhookSecret = getStripeWebhookSecret();
  if (!webhookSecret) {
    return Response.json({ ok: false, message: "Webhook secret not configured." }, { status: 503 });
  }

  const body = await request.text();
  const headerStore = await headers();
  const signature = headerStore.get("stripe-signature");

  if (!signature) {
    return Response.json({ ok: false, message: "Missing stripe-signature header." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return Response.json({ ok: false, message: "Invalid signature." }, { status: 400 });
  }

  if (processedEvents.has(event.id)) {
    return Response.json({ ok: true, message: "Event already processed." });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === "paid") {
      const order = getOrderBySessionId(session.id);
      if (order && order.paymentStatus !== "paid") {
        const paidOrder = markOrderPaid(
          order.orderRef,
          typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
        );
        if (paidOrder) {
          await sendOrderConfirmationEmail(paidOrder);
        }
      }
    }
  }

  processedEvents.add(event.id);
  return Response.json({ ok: true, received: true });
}

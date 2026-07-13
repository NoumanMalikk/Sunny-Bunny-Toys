import { brand, storeMode } from "@/data/store-config";
import { calculateDemoShipping } from "@/lib/checkout/shipping";
import { calculateOrderTotals } from "@/lib/checkout/totals";
import { validateCartLines } from "@/lib/checkout/validate-cart";
import { createOrderRef, getOrderByIdempotencyKey, saveOrder } from "@/lib/orders/store";
import type { Order, OrderAddress } from "@/lib/orders/types";
import { getStripe, isDemoMode, isStripeConfigured } from "@/lib/stripe/client";
import { checkoutSessionRequestSchema } from "@/lib/validation/checkout";

function normalizeGiftOptions(gift: {
  isGift: boolean;
  hidePrices: boolean;
  giftWrap: boolean;
  giftNote?: string;
}) {
  return {
    isGift: gift.isGift,
    hidePrices: gift.hidePrices,
    giftWrap: gift.giftWrap,
    giftNote: gift.giftNote ?? "",
  };
}

function resolveBillingAddress(
  shipping: OrderAddress,
  billing: {
    sameAsShipping: boolean;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  },
): OrderAddress {
  if (billing.sameAsShipping) return shipping;
  return {
    line1: billing.line1 ?? "",
    line2: billing.line2 ?? "",
    city: billing.city ?? "",
    state: (billing.state ?? "").toUpperCase(),
    postalCode: billing.postalCode ?? "",
    country: billing.country ?? "US",
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = checkoutSessionRequestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid checkout data." },
        { status: 400 },
      );
    }

    const data = parsed.data;

    if (data.idempotencyKey) {
      const existing = getOrderByIdempotencyKey(data.idempotencyKey);
      if (existing?.stripeSessionId) {
        return Response.json({
          ok: true,
          orderRef: existing.orderRef,
          sessionId: existing.stripeSessionId,
          demo: existing.demoMode,
          message: "Existing checkout session returned.",
        });
      }
    }

    const cartValidation = validateCartLines(data.items);
    if (!cartValidation.ok) {
      return Response.json({ ok: false, errors: cartValidation.errors }, { status: 400 });
    }

    const shippingQuote = calculateDemoShipping({
      items: cartValidation.items.map((item) => ({
        quantity: item.quantity,
        price: item.unitPrice,
      })),
      totalWeightLbs: cartValidation.totalWeightLbs,
      methodId: data.shippingMethod.methodId,
      itemCount: cartValidation.items.reduce((sum, item) => sum + item.quantity, 0),
    });

    const totals = calculateOrderTotals({
      items: cartValidation.items.map((item) => ({
        productId: item.productId,
        slug: item.slug,
        title: item.title,
        price: item.unitPrice,
        quantity: item.quantity,
        image: item.image,
        ageMinimum: item.ageMinimum,
        ageMaximum: item.ageMaximum,
        warningText: item.warningText,
        warningRequired: item.warningRequired,
        pieceCount: item.pieceCount,
        maxQty: 10,
        incomplete: false,
        complianceVerified: true,
      })),
      shipping: shippingQuote,
      giftWrap: data.gift.giftWrap,
    });

    const billingAddress = resolveBillingAddress(data.shipping, data.billing);
    const giftOptions = normalizeGiftOptions(data.gift);
    const orderRef = createOrderRef();
    const now = new Date().toISOString();

    if (isDemoMode()) {
      const demoOrder: Order = {
        id: crypto.randomUUID(),
        orderRef,
        createdAt: now,
        updatedAt: now,
        status: "safety_hold",
        paymentStatus: "demo_blocked",
        customer: data.customer,
        shippingAddress: data.shipping,
        billingAddress,
        shippingMethodId: shippingQuote.methodId,
        shippingMethodName: shippingQuote.methodName,
        gift: giftOptions,
        safetyAcknowledged: Boolean(data.safety.safetyAcknowledged),
        warningsReviewed: Boolean(data.safety.warningsReviewed),
        termsAccepted: Boolean(data.terms.termsAccepted),
        privacyAccepted: Boolean(data.terms.privacyAccepted),
        marketingConsent: data.terms.marketingConsent,
        items: cartValidation.items,
        subtotal: totals.subtotal,
        shipping: totals.shipping,
        giftWrap: totals.giftWrap,
        tax: totals.estimatedTax,
        total: totals.total,
        idempotencyKey: data.idempotencyKey,
        demoMode: true,
      };

      saveOrder(demoOrder);

      return Response.json(
        {
          ok: false,
          demo: true,
          orderRef,
          message:
            "Demonstration mode — checkout is disabled. Configure STRIPE_SECRET_KEY and set NEXT_PUBLIC_STORE_MODE=production to accept payments.",
        },
        { status: 503 },
      );
    }

    if (!isStripeConfigured()) {
      return Response.json(
        {
          ok: false,
          demo: true,
          message: "Payment processing is not configured.",
        },
        { status: 503 },
      );
    }

    const stripe = getStripe();
    const successUrl = `${storeMode.siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${storeMode.siteUrl}/checkout?cancelled=1`;

    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        customer_email: data.customer.email,
        line_items: cartValidation.items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
              description: item.variantLabel ?? undefined,
              images: item.image ? [`${storeMode.siteUrl}${item.image}`] : undefined,
              metadata: {
                productId: item.productId,
                sku: item.sku,
                ageMinimum: String(item.ageMinimum),
              },
            },
            unit_amount: Math.round(item.unitPrice * 100),
          },
          quantity: item.quantity,
        })),
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: Math.round(totals.shipping * 100), currency: "usd" },
              display_name: shippingQuote.methodName,
              delivery_estimate: {
                minimum: { unit: "business_day", value: 2 },
                maximum: { unit: "business_day", value: 8 },
              },
            },
          },
        ],
        metadata: {
          orderRef,
          customerName: `${data.customer.firstName} ${data.customer.lastName}`,
          giftNote: data.gift.giftNote ?? "",
          isGift: String(data.gift.isGift),
          hidePrices: String(data.gift.hidePrices),
          giftWrap: String(data.gift.giftWrap),
          safetyAcknowledged: String(data.safety.safetyAcknowledged),
          warningsReviewed: String(data.safety.warningsReviewed),
          marketingConsent: String(data.terms.marketingConsent),
        },
        success_url: successUrl,
        cancel_url: cancelUrl,
      },
      data.idempotencyKey ? { idempotencyKey: data.idempotencyKey } : undefined,
    );

    const pendingOrder: Order = {
      id: crypto.randomUUID(),
      orderRef,
      createdAt: now,
      updatedAt: now,
      status: "processing",
      paymentStatus: "pending",
      customer: data.customer,
      shippingAddress: data.shipping,
      billingAddress,
      shippingMethodId: shippingQuote.methodId,
      shippingMethodName: shippingQuote.methodName,
      gift: giftOptions,
      safetyAcknowledged: Boolean(data.safety.safetyAcknowledged),
      warningsReviewed: Boolean(data.safety.warningsReviewed),
      termsAccepted: Boolean(data.terms.termsAccepted),
      privacyAccepted: Boolean(data.terms.privacyAccepted),
      marketingConsent: data.terms.marketingConsent,
      items: cartValidation.items,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      giftWrap: totals.giftWrap,
      tax: totals.estimatedTax,
      total: totals.total,
      stripeSessionId: session.id,
      idempotencyKey: data.idempotencyKey,
      demoMode: false,
    };

    saveOrder(pendingOrder);

    return Response.json({
      ok: true,
      orderRef,
      sessionId: session.id,
      url: session.url,
      demo: false,
      message: `Redirecting to ${brand.publicName} secure checkout.`,
    });
  } catch (error) {
    console.error("Checkout session error:", error);
    return Response.json({ ok: false, message: "Unable to create checkout session." }, { status: 500 });
  }
}

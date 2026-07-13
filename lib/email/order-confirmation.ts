import { Resend } from "resend";
import { brand, storeMode } from "@/data/store-config";
import { formatAgeRange } from "@/lib/safety/product-activation";
import { formatPrice } from "@/lib/pricing/format";
import { isDemoMode } from "@/lib/stripe/client";
import type { Order } from "@/lib/orders/types";
import { ORDER_STATUS_LABELS } from "@/lib/orders/types";

function buildOrderConfirmationHtml(order: Order): string {
  const itemRows = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #e8e4df;">
          <strong>${item.title}</strong>
          ${item.variantLabel ? `<br><span style="color:#5c6470;font-size:13px;">${item.variantLabel}</span>` : ""}
          <br><span style="color:#5c6470;font-size:13px;">SKU: ${item.sku}</span>
          <br><span style="color:#5c6470;font-size:13px;">${formatAgeRange(item.ageMinimum, item.ageMaximum)}</span>
          ${item.warningText ? `<br><span style="color:#b45309;font-size:13px;font-weight:600;">Warning: ${item.warningText}</span>` : ""}
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #e8e4df;text-align:center;">${item.quantity}</td>
        <td style="padding:12px 0;border-bottom:1px solid #e8e4df;text-align:right;">${formatPrice(item.lineTotal)}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Order confirmation ${order.orderRef}</title></head>
<body style="margin:0;padding:0;background:#faf8f5;font-family:Inter,Arial,sans-serif;color:#1a2744;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#1a2744;color:#ffffff;padding:24px 32px;">
          <h1 style="margin:0;font-size:22px;">${brand.publicName}</h1>
          <p style="margin:8px 0 0;font-size:14px;opacity:0.85;">Order confirmation from ${brand.legalName}</p>
        </td></tr>
        <tr><td style="padding:32px;">
          <p style="margin:0 0 8px;font-size:14px;color:#5c6470;">Order reference</p>
          <p style="margin:0 0 24px;font-size:24px;font-weight:700;color:#1a2744;">${order.orderRef}</p>
          <p style="margin:0 0 24px;">Hi ${order.customer.firstName}, thank you for your order. Status: <strong>${ORDER_STATUS_LABELS[order.status]}</strong>.</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <thead>
              <tr style="color:#5c6470;font-size:13px;text-align:left;">
                <th style="padding-bottom:8px;">Item</th>
                <th style="padding-bottom:8px;text-align:center;">Qty</th>
                <th style="padding-bottom:8px;text-align:right;">Total</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr><td style="padding:4px 0;">Subtotal</td><td style="text-align:right;">${formatPrice(order.subtotal)}</td></tr>
            <tr><td style="padding:4px 0;">Shipping</td><td style="text-align:right;">${formatPrice(order.shipping)}</td></tr>
            ${order.giftWrap > 0 ? `<tr><td style="padding:4px 0;">Gift wrap</td><td style="text-align:right;">${formatPrice(order.giftWrap)}</td></tr>` : ""}
            <tr><td style="padding:8px 0;font-weight:700;">Total</td><td style="text-align:right;font-weight:700;">${formatPrice(order.total)}</td></tr>
          </table>
          <p style="margin:0 0 8px;font-weight:600;">Ship to</p>
          <p style="margin:0 0 24px;color:#5c6470;line-height:1.5;">
            ${order.shippingAddress.line1}<br>
            ${order.shippingAddress.line2 ? `${order.shippingAddress.line2}<br>` : ""}
            ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}
          </p>
          <p style="margin:0;font-size:12px;color:#5c6470;line-height:1.6;">
            Age guidance and applicable warnings were shown during checkout. Adult purchasers are responsible for supervising play and following manufacturer instructions.
          </p>
        </td></tr>
        <tr><td style="background:#f3f0eb;padding:20px 32px;font-size:12px;color:#5c6470;">
          ${brand.legalName} · ${brand.cityStateZip}<br>
          Questions? ${storeMode.supportEmail}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendOrderConfirmationEmail(order: Order): Promise<{ sent: boolean; reason?: string }> {
  if (isDemoMode()) {
    console.info("[demo] Order confirmation email skipped:", order.orderRef);
    return { sent: false, reason: "demo_mode" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured — skipping order confirmation email.");
    return { sent: false, reason: "resend_not_configured" };
  }

  const resend = new Resend(apiKey);
  const html = buildOrderConfirmationHtml(order);

  await resend.emails.send({
    from: storeMode.orderEmailFrom,
    to: order.customer.email,
    subject: `Your ${brand.publicName} order ${order.orderRef}`,
    html,
  });

  return { sent: true };
}

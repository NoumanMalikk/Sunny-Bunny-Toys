import Stripe from "stripe";
import { storeMode } from "@/data/store-config";

let stripeClient: Stripe | null = null;

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY) && storeMode.mode !== "demo";
}

export function isDemoMode(): boolean {
  return !isStripeConfigured();
}

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  if (!stripeClient) {
    // Use the SDK's bundled API version so TypeScript always matches the installed stripe package.
    stripeClient = new Stripe(secretKey, {
      apiVersion: Stripe.API_VERSION,
      typescript: true,
    });
  }

  return stripeClient;
}

export function getStripeWebhookSecret(): string | undefined {
  return process.env.STRIPE_WEBHOOK_SECRET;
}

# Payment Setup

Stripe integration for checkout. Demo mode is the default — no live charges until configured.

## Demo mode

When `NEXT_PUBLIC_STORE_MODE=demo` (default):

- Checkout wizard runs through all steps (customer, shipping, safety, billing, review)
- **Demo notice** displayed at top of checkout
- Payment submission disabled; no Stripe session created for live charges
- Order confirmation emails not sent
- Tax shown as readiness message only

Safe for public preview deployments without Stripe keys.

## Production mode

Set `NEXT_PUBLIC_STORE_MODE=production` only after:

- All products verified (no incomplete listings)
- Stripe account activated and verified
- Webhook endpoint deployed
- Legal pages and return policy reviewed

## Environment variables

```env
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Use test keys (`sk_test_`, `pk_test_`) in staging.

## Checkout integration

The storefront supports:

- **Stripe Checkout** — session created via `/api/checkout/create-session`
- **Payment Element** — client-side payment step in checkout wizard (`components/checkout/steps/PaymentStep.tsx`)

`app/(store)/checkout/page.tsx` sets `stripeConfigured` when secret key is present and mode is `production`.

## Webhooks

Register endpoint:

```
POST /api/webhooks/stripe
```

Events handled in `app/api/webhooks/stripe/route.ts`. Set `STRIPE_WEBHOOK_SECRET` from the Stripe dashboard.

Required events (configure in Stripe):

- `checkout.session.completed`
- `payment_intent.succeeded` (if using Payment Element)

## Tax

`taxConfig` in `data/store-config.ts` defaults to Stripe Tax readiness. Enable Stripe Tax in the dashboard before production.

## Testing

1. Use Stripe test cards in test mode
2. Run `npm run test:e2e` — checkout smoke test verifies demo notice
3. Confirm webhook delivery in Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Security

- Never expose `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET` to the client
- Validate webhook signatures
- Use HTTPS in production (automatic on Vercel)

## Gift wrap

Controlled by `NEXT_PUBLIC_GIFT_WRAP_ENABLED`. Gift wrap line item added in order totals when enabled.

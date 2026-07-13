# Deployment (Vercel)

## Readiness

This project is structured for [Vercel](https://vercel.com) deployment with Next.js App Router. Before deploying to a public URL:

1. Complete [launch-checklist.md](./launch-checklist.md) items appropriate to your deployment stage.
2. Keep `NEXT_PUBLIC_STORE_MODE=demo` until all 26 products are verified and Stripe is configured.
3. Do **not** deploy with placeholder product images on a public production domain.

## Vercel project setup

1. Import the repository in the Vercel dashboard.
2. Framework preset: **Next.js** (auto-detected).
3. Build command: `npm run build` (default).
4. Output: Next.js default (no custom output directory).

## Environment variables

Add all variables from `.env.example` in **Project → Settings → Environment Variables**. At minimum for a demo deployment:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | Your Vercel URL (e.g. `https://sunnybunny.example.com`) |
| `NEXT_PUBLIC_STORE_MODE` | `demo` |
| `NEXT_PUBLIC_STORE_NAME` | `Sunny Bunny Toy Co.` |
| `NEXT_PUBLIC_LEGAL_NAME` | `Sunny Bunny Toys LLC` |

For production checkout, also configure Stripe, email, and analytics variables. See [payment-setup.md](./payment-setup.md).

Mark server-only secrets (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `CRON_SECRET`) as **not** exposed to the browser.

## Build verification

Run locally before pushing:

```bash
npm run typecheck
npm run test
npm run build
```

## Security headers

`next.config.ts` sets `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` on all routes. Review after deployment with a header scanner.

## Stripe webhooks

After production Stripe setup, register the webhook endpoint:

```
https://<your-domain>/api/webhooks/stripe
```

Set `STRIPE_WEBHOOK_SECRET` in Vercel. See [payment-setup.md](./payment-setup.md).

## Cron / scheduled tasks

If you add scheduled jobs (inventory sync, recall checks), protect them with `CRON_SECRET` and Vercel Cron.

## Post-deploy checks

- [ ] Homepage, shop (26 products), search, and product pages load
- [ ] Demo checkout notice appears; no live charges in demo mode
- [ ] `/admin` returns 404 (no admin dashboard exists)
- [ ] `robots.txt` and `sitemap.xml` resolve
- [ ] Security headers present in response

## Domain

Point your custom domain in Vercel after trademark and brand-conflict review. See [launch-checklist.md](./launch-checklist.md).

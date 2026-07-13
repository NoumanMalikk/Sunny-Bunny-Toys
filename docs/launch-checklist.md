# Launch Checklist

Comprehensive pre-launch checklist for Sunny Bunny Toy Co. **None of these items are marked complete by this repository.**

## Brand and legal

- [ ] **Trademark search** — "Sunny Bunny Toy Co." / "Sunny Bunny Toys" clearance in relevant classes
- [ ] **Sunny Bunnies conflict review** — confirm no confusion with the *Sunny Bunnies* children's entertainment property (characters, trade dress, sound marks)
- [ ] **Domain registered** and DNS configured
- [ ] **Legal entity** — Sunny Bunny Toys LLC filings current
- [ ] Privacy policy, terms, returns, and shipping pages reviewed by counsel
- [ ] **Do not claim trademark clearance is done** until attorney confirms

## Environment and infrastructure

- [ ] All `.env.example` variables set in production
- [ ] `NEXT_PUBLIC_SITE_URL` matches live domain
- [ ] `NEXT_PUBLIC_STORE_MODE=production` only when ready for live sales
- [ ] Vercel deployment successful (`npm run build` clean)
- [ ] Security headers verified (`next.config.ts`)
- [ ] SSL/HTTPS active
- [ ] `CRON_SECRET` set if using scheduled jobs

## All 26 products — per-SKU verification

For **each** product in `data/products.ts`:

- [ ] Manufacturer name verified (not "Pending verification")
- [ ] Supplier SKU mapped to source product (not `PENDING-*`)
- [ ] UPC/barcode confirmed if used
- [ ] Price and compare-at price correct
- [ ] Piece count, materials, dimensions, weight accurate
- [ ] Age minimum/maximum match manufacturer label
- [ ] `ageGradeVerified: true` with `ageGradeVerifiedAt` date
- [ ] Warning text matches label (if `warningRequired`)
- [ ] Choking hazard / small parts / magnet flags correct
- [ ] Authorized images — no placeholders; license on file
- [ ] `imageSource` and `imageLicense` documented
- [ ] `complianceVerified: true`
- [ ] CPC on file (if `cpcRequired`)
- [ ] Test report on file (if magnets or required by category)
- [ ] Tracking label reference (if `cpcRequired`)
- [ ] `incomplete: false`; `incompleteReasons` empty
- [ ] `active: true`; `stockStatus` reflects inventory
- [ ] Related products reviewed
- [ ] Age collections and category assignments correct
- [ ] Product page manually reviewed on mobile and desktop

## Images and creative

- [ ] All placeholder SVGs replaced ([image-sourcing.md](./image-sourcing.md))
- [ ] Campaign assets follow [campaign-image-guide.md](./campaign-image-guide.md)
- [ ] No AI-altered product photography in catalogue
- [ ] Favicon and brand assets finalized

## Payments

- [ ] Stripe account verified for live charges
- [ ] `STRIPE_SECRET_KEY`, publishable key, webhook secret set
- [ ] Webhook endpoint tested (`/api/webhooks/stripe`)
- [ ] Test transaction in production with refund
- [ ] Stripe Tax configured if enabled
- [ ] Demo mode disabled for go-live

## Shipping and tax

- [ ] Shipping rates and carriers configured (replace demo methods)
- [ ] Free shipping threshold confirmed (`shippingConfig`)
- [ ] Restricted states / destinations updated if needed
- [ ] Tax calculation verified for primary nexus states
- [ ] Processing time text accurate

## Email and support

- [ ] `RESEND_API_KEY` configured
- [ ] `ORDER_EMAIL_FROM`, `SUPPORT_EMAIL`, `CONTACT_FORM_RECIPIENT` set
- [ ] Order confirmation email tested
- [ ] Contact form delivery tested
- [ ] Support response process documented

## Safety and compliance

- [ ] Current CPSC/ASTM/CPSIA requirements verified ([product-safety.md](./product-safety.md))
- [ ] CPCs and test reports organized per SKU
- [ ] July 8, 2026 import eFiling obligations confirmed if importing
- [ ] Recall procedure documented ([recall-readiness.md](./recall-readiness.md))
- [ ] `/product-safety` page accurate

## Accessibility and quality

- [ ] Keyboard navigation through checkout
- [ ] Screen reader spot-check (hero pause, cart, search)
- [ ] Color contrast review
- [ ] `npm run test` and `npm run test:e2e` passing
- [ ] `npm run typecheck` and `npm run lint` clean

## Security

- [ ] No secrets in git
- [ ] Server-only env vars not exposed to client
- [ ] Rate limiting reviewed on API routes
- [ ] `/admin` returns 404 (no admin surface)
- [ ] Dependency audit (`npm audit`)

## Analytics (optional)

- [ ] `NEXT_PUBLIC_GA_ID` configured
- [ ] `NEXT_PUBLIC_META_PIXEL_ID` configured with consent approach
- [ ] Conversion events tested

## Go-live

- [ ] Final stakeholder sign-off
- [ ] Rollback plan documented
- [ ] Post-launch monitoring for 48 hours (orders, webhooks, errors)

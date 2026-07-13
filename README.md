# Sunny Bunny Toy Co.

A Next.js storefront for **Sunny Bunny Toys LLC**. dolls, plush, pretend-play sets, building toys, creative activities, puzzles, and family games. The catalogue ships with 26 draft products for demonstration and pre-launch review.

> **Branding precaution:** This project uses original **Sunny Bunny Toy Co.** branding. It is **not** affiliated with the *Sunny Bunnies* children's entertainment property. Conduct trademark and brand-conflict review before public launch. See [docs/launch-checklist.md](docs/launch-checklist.md).

## Demo mode

`NEXT_PUBLIC_STORE_MODE=demo` (default) enables the full browsing experience. shop, search, product pages, wishlist, and checkout wizard. without collecting payment or sending live order emails. Products remain **incomplete** until manufacturer mapping, authorized photography, age grades, warnings, and compliance records are verified. Purchase is blocked until verification is complete.

There is **no admin dashboard**. Product and content changes are made directly in source files (`data/products.ts`, `data/categories.ts`, etc.).

## Quick start

```bash
cp .env.example .env.local
npm install
npm run generate:placeholders
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). See [docs/setup.md](docs/setup.md) for full setup instructions.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run test` | Unit tests (Vitest) |
| `npm run test:watch` | Unit tests in watch mode |
| `npm run test:e2e` | End-to-end tests (Playwright) |
| `npm run generate:placeholders` | Generate SVG placeholder product images |

## Launch prerequisites

Before switching to production (`NEXT_PUBLIC_STORE_MODE=production`):

1. **Credentials**. Stripe, Resend, Supabase (if used), analytics IDs. See [docs/payment-setup.md](docs/payment-setup.md) and `.env.example`.
2. **Safety documentation**. Verify current CPSC/ASTM/CPSIA requirements; collect CPCs, test reports, and tracking labels. See [docs/product-safety.md](docs/product-safety.md).
3. **Supplier mapping**. Map every SKU to a verified manufacturer source product. See [docs/product-editing.md](docs/product-editing.md).
4. **Authorized images**. Replace all placeholders with licensed photography. See [docs/image-sourcing.md](docs/image-sourcing.md).
5. **Brand legal review**. Trademark clearance and Sunny Bunnies conflict review. **Not completed by this repository.**
6. **Full launch checklist**. [docs/launch-checklist.md](docs/launch-checklist.md).

## Documentation

| Doc | Topic |
|-----|-------|
| [docs/setup.md](docs/setup.md) | Local install and development |
| [docs/deployment.md](docs/deployment.md) | Vercel deployment |
| [docs/product-editing.md](docs/product-editing.md) | Catalogue management |
| [docs/image-sourcing.md](docs/image-sourcing.md) | Product photography rules |
| [docs/campaign-image-guide.md](docs/campaign-image-guide.md) | Marketing image policy |
| [docs/product-safety.md](docs/product-safety.md) | CPSC/ASTM/CPSIA overview |
| [docs/recall-readiness.md](docs/recall-readiness.md) | Recall response procedures |
| [docs/payment-setup.md](docs/payment-setup.md) | Stripe and checkout |
| [docs/launch-checklist.md](docs/launch-checklist.md) | Pre-launch checklist |

## Tech stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS · Zustand · Stripe · Vitest · Playwright

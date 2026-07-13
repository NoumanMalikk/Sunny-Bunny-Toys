# Local Setup

## Prerequisites

- Node.js 20+
- npm (or pnpm/yarn)

## Install

```bash
git clone <repository-url>
cd sunny-bunny-toy-co
npm install
```

## Environment

Copy the example file and fill in values as needed for local development:

```bash
cp .env.example .env.local
```

For local browsing and demo checkout, defaults are sufficient:

```env
NEXT_PUBLIC_STORE_MODE=demo
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

See `.env.example` for the full variable list. Production credentials (Stripe, Resend, Supabase) are optional in demo mode.

## Generate placeholder images

Product images are SVG placeholders until authorized photography is sourced. Generate them before first run:

```bash
npm run generate:placeholders
```

This writes files to `public/products/<slug>/main.svg` for all 26 catalogue items. **Replace every placeholder before production activation.**

## Development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verify setup

```bash
npm run typecheck
npm run test
npm run lint
```

For end-to-end tests, install Playwright browsers once:

```bash
npx playwright install chromium
npm run test:e2e
```

## Product completeness note

All 26 catalogue products ship as **incomplete drafts**. Each listing requires:

- Verified manufacturer and supplier SKU mapping
- Authorized product photography (no placeholders)
- Verified age grade, warnings, materials, and piece counts
- Compliance documents (CPC, test reports, tracking labels where required)

Purchase is blocked until these are verified. See [product-editing.md](./product-editing.md) and [launch-checklist.md](./launch-checklist.md).

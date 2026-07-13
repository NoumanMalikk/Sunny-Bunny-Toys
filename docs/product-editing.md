# Product Editing

Products are defined in `data/products.ts`. There is **no admin dashboard** — all catalogue changes are made in source and deployed via git.

> **Important:** Products ship as incomplete drafts. Do not mark a product purchasable until manufacturer/SKU mapping, authorized images, age grades, warnings, materials, and compliance are verified.

## File structure

- `data/products.ts` — product drafts and `buildProduct()` factory
- `data/categories.ts` — categories, age groups, play styles
- `public/products/<slug>/` — product images (replace placeholders)
- `lib/safety/product-activation.ts` — purchase eligibility rules

## Adding a product

1. Add a new entry to the `drafts` array in `data/products.ts` with required fields: `id`, `sku`, `slug`, `title`, `category`, `price`, `ageMinimum`, `material`, etc.
2. Run `npm run generate:placeholders` to create a placeholder image, or add authorized images manually.
3. Set `relatedProductIds` to cross-link complementary items.
4. Add the product to relevant `collections` and age-based collection slugs in `data/categories.ts` if needed.
5. Leave `incomplete: true` (default via `buildProduct`) until fully verified.

## Removing a product

1. Remove or comment out the draft entry.
2. Set `active: false` in `buildProduct` output if you need to hide without deleting (soft deactivation).
3. Remove images from `public/products/<slug>/` if no longer needed.
4. Update any hard-coded references (hero slides, featured sections) in `components/home/`.

## Prices

Edit `price` and optional `compareAtPrice` on the draft. Prices are in USD. The `underTwentyFive` and `underFifty` flags drive gift-collection filters — update them when price changes.

## Images

See [image-sourcing.md](./image-sourcing.md). Each product needs a `main` image at minimum. Update the `images` array in `buildProduct` or override per draft. Set `imageSource` to the correct license type (`manufacturer`, `supplier`, etc.) — never `placeholder` at launch.

## Age grades

- `ageMinimum` / `ageMaximum` — displayed via `formatAgeRange()`
- `ageGradeSource` — cite the manufacturer label source
- `ageGradeVerified` — set `true` only after owner verification
- `ageGradeVerifiedAt` — ISO date of verification

Products appear in **Shop by Age** collections when their age range overlaps the collection range (see `data/categories.ts` age groups).

## Warnings

- `warningRequired` — `true` if a safety warning applies
- `warningText` — exact warning copy from manufacturer label (choking hazard, magnets, etc.)
- `chokingHazard`, `smallParts`, `magnetsIncluded` — boolean flags for filtering and checkout safety step

Purchase is blocked if `warningRequired` is true but `warningText` is missing.

## Pieces, materials, compliance

| Field | Purpose |
|-------|---------|
| `pieceCount` | Piece count for sets (displayed on cards and PDP) |
| `material` / `fillingMaterial` / `paintOrCoating` | Material disclosures |
| `complianceVerified` | Owner sign-off on safety records |
| `cpcRequired` / `cpcDocumentReference` | Children's Product Certificate |
| `testReportReference` | Third-party test report (required for magnets) |
| `trackingLabelCode` | CPSIA tracking label reference |
| `manufacturer` / `supplierSku` | Must be verified (not "Pending verification" or `PENDING-*`) |

## Activate / deactivate

**Deactivate** (hide from shop, block purchase):

```ts
active: false,
```

**Activate for production** — all of the following must be true (enforced by `getProductActivationStatus`):

- `active: true`
- `incomplete: false` with empty `incompleteReasons`
- `ageGradeVerified: true`
- `complianceVerified: true`
- `manufacturer` verified
- `supplierSku` verified (not `PENDING-*`)
- Authorized images (no `placeholder` type)
- CPC / test reports / tracking labels where required
- `stockStatus` not `out_of_stock` or `unavailable`

## Related products

Set `relatedProductIds` to an array of product `id` values. Rendered on the product detail page.

## Age collections

Assign `collections` array entries matching slugs in `data/categories.ts` (e.g. `"ages-3-5"`, `"imaginative-play"`). Age overlap with shop-by-age pages is computed from `ageMinimum`/`ageMaximum`.

## After editing

```bash
npm run typecheck
npm run test
npm run dev
```

Verify the product on `/product/<slug>` and in shop filters.

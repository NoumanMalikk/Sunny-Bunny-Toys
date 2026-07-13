# Image Sourcing

## Priority order

Use images in this order of preference:

1. **Manufacturer-provided** photography with written license
2. **Supplier / distributor** catalog assets with license
3. **Commissioned original** photography of the exact SKU in your inventory
4. **Placeholder** — development only; blocks production purchase

## Requirements

- **Exact product** — image must depict the SKU you sell (correct color, piece count, packaging)
- **White or neutral background** for primary (`main`) catalogue images
- **No hotlinking** — host all images in `public/products/<slug>/` or a CDN you control
- **Alt text** — descriptive, includes product name and key detail (size, piece count)
- **License on file** — record `imageSource` and `imageLicense` in product data

## Placeholder rules

`npm run generate:placeholders` creates labeled SVG placeholders for local development. Placeholders:

- Are marked `type: "placeholder"` and `imageSource: "placeholder"`
- **Block purchase** via `product-activation.ts`
- Must be replaced before any public production launch

Do not use placeholder images in paid advertising or on a live storefront.

## File naming

```
public/products/<slug>/main.svg      # Primary image (replace .svg with .jpg/.webp at launch)
public/products/<slug>/detail-*.jpg   # Optional additional angles
```

Update the `images` array in `data/products.ts` when adding files.

## What not to do

- Do not scrape competitor or marketplace images
- Do not use AI-generated product renders as catalogue photography (see [campaign-image-guide.md](./campaign-image-guide.md) for campaign-only AI use)
- Do not alter product appearance in post-processing (color shifts, removed warnings, added accessories)

## Verification checklist per product

- [ ] Image matches verified supplier SKU
- [ ] License documented
- [ ] `imageSource` updated from `placeholder`
- [ ] `type` set to `main`, `detail`, etc. (not `placeholder`)
- [ ] Alt text reviewed for accuracy

# Recall Readiness

Procedures for responding to CPSC recalls, supplier notices, or internal safety concerns.

## Batch lookup

Maintain a spreadsheet mapping every `supplierSku` and `upc` to CPSC recall databases and supplier alert lists. On receiving a recall notice:

1. Identify affected SKUs in `data/products.ts`
2. Cross-reference open orders in your order store / Stripe
3. Document batch numbers or date ranges if provided

## Stop-sale (immediate)

1. Set `active: false` on affected products in `data/products.ts`
2. Set `stockStatus: "unavailable"`
3. Deploy immediately. purchase is blocked by `product-activation.ts`
4. Remove from featured sections and homepage references if any

## Safety hold

For investigations without a confirmed recall:

- Keep `active: true` for browsing **or** deactivate per counsel advice
- Set `stockStatus: "unavailable"` to block purchase
- Add an internal note in `incompleteReasons` explaining the hold
- Do not ship pending inventory until cleared

## Customer notification

If units were sold:

1. Email affected customers using order records (Resend / `ORDER_EMAIL_FROM`)
2. Post notice on site if broadly affected (temporary banner or policy update)
3. Follow CPSC Fast Track or Section 15 reporting requirements when applicable
4. Coordinate with manufacturer on remedy (refund, return, repair, replacement)

## Refunds

Process refunds through Stripe for card orders. Document refund reason as safety/recall. See returns policy at `/returns`. safety recalls may override standard return windows.

## Deactivation checklist

- [ ] `active: false` in product data
- [ ] `stockStatus: "unavailable"`
- [ ] Deployed to production
- [ ] Removed from marketing emails and ads
- [ ] Customer notifications sent for sold units
- [ ] Inventory quarantined physically
- [ ] CPSC / counsel notified if required

## Ongoing monitoring

- Subscribe to CPSC recall RSS/email alerts
- Review supplier safety bulletins at goods receipt
- Re-run batch lookup quarterly or when adding new suppliers

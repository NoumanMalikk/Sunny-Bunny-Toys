# Product Safety

Overview of U.S. children's product safety obligations for Sunny Bunny Toys LLC. **This document is guidance only. not legal advice.**

## Regulatory framework

| Agency / framework | Scope |
|--------------------|-------|
| **CPSC** (Consumer Product Safety Commission) | Federal safety standards, recalls, reporting |
| **ASTM** | Voluntary consensus standards adopted by CPSC for toys (e.g. ASTM F963 for toy safety) |
| **CPSIA** (Consumer Product Safety Improvement Act) | Lead limits, phthalates, third-party testing, Children's Product Certificates (CPC), tracking labels |

## Do not hardcode standard versions

ASTM and CPSC rules are updated periodically. **Verify the current mandatory and recognized standard versions at launch**. do not rely on version numbers in this repo or in draft product data.

Before selling any children's product:

1. Identify applicable CPSC regulations and ASTM standards for that product category
2. Confirm your inventory meets the **current** requirements
3. Obtain third-party testing from a CPSC-accepted laboratory where required
4. Issue a CPC supported by test reports
5. Apply CPSIA tracking labels to product and packaging

## No fake approvals

- Do not set `complianceVerified: true` without real documentation on file
- Do not invent CPC references, test report numbers, or tracking label codes
- Do not display certification badges or imply CPSC approval without basis
- `ageGradeVerified` must reflect actual manufacturer label review

The storefront blocks purchase when compliance fields are incomplete (`lib/safety/product-activation.ts`).

## Product-specific considerations

- **Small parts / choking**. age grading and warning text from manufacturer labels
- **Magnets**. additional testing and warnings; `magnetsIncluded` products require `testReportReference`
- **Paint and surface coatings**. lead content limits under CPSIA
- **Plush / textiles**. flammability and labeling requirements

## Import eFiling (July 8, 2026)

CPSC import requirements are evolving. As of **July 8, 2026**, importers should confirm whether **eFiling** obligations apply to your product lines and customs entries. Consult CPSC guidance and your customs broker before importing inventory. This repository does not automate import filing.

## Owner responsibilities

- Maintain a product safety file per SKU (CPC, test reports, labels, supplier correspondence)
- Monitor [CPSC recalls](https://www.cpsc.gov/Recalls) for products you carry
- Report substantial product hazards to CPSC when required
- See [recall-readiness.md](./recall-readiness.md) for stop-sale procedures

## Storefront safety features

- Age badges and warning banners on product pages
- Checkout safety acknowledgment step
- Purchase blocked for unverified compliance
- Product safety policy page at `/product-safety`

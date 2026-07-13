import type { Metadata } from "next";
import Link from "next/link";
import { PolicyLayout } from "@/components/editorial/PolicyLayout";
import { brand } from "@/data/store-config";

const LAST_UPDATED = "2026-07-13";

export const metadata: Metadata = {
  title: "Product Safety",
  description:
    "Product safety guidance from Sunny Bunny Toy Co. — age grading, warnings, supervision, magnets, batteries, recalls and how to report concerns.",
};

export default function ProductSafetyPage() {
  return (
    <PolicyLayout
      title="Product Safety"
      lastUpdated={LAST_UPDATED}
      intro={`${brand.publicName} provides safety information to help adult purchasers make informed choices. Every product is different — always review the physical product, packaging, instructions and warnings before use.`}
    >
      <p>
        <strong>Always review the physical product, packaging, instructions and warnings before use.</strong>{" "}
        No toy is suitable for every child. Age guidance on this website reflects verified product labeling
        where available and does not replace your judgment as a parent, guardian or gift buyer.
      </p>

      <h2>Age grading</h2>
      <p>
        Each active product includes a verified age grade based on manufacturer labeling and applicable safety
        considerations. Use Shop by Age and product pages to find items within a chosen range. Do not give a toy
        to a child younger than the stated minimum age unless you have reviewed all warnings and determined it
        is appropriate under your supervision.
      </p>

      <h2>Small parts and choking hazards</h2>
      <p>
        Toys with small parts, small balls, balloons, marbles or similar hazards may carry regulated warnings.
        These warnings appear on product cards, quick view, product pages, in the cart and during checkout when
        applicable. Keep small parts away from young children and follow every warning printed on the product.
      </p>

      <h2>Adult supervision</h2>
      <p>
        Some products require adult supervision during assembly, play or cleanup. Supervision notes are shown
        where recorded. Stay nearby when children use art materials, magnets, batteries, projectiles or items
        with multiple small components.
      </p>

      <h2>Magnet safety</h2>
      <p>
        Products that include magnets can be hazardous if swallowed. Keep magnet-containing toys away from
        children who may mouth objects. Inspect magnets and attached parts regularly. Discontinue use if a
        magnet becomes loose or damaged.
      </p>

      <h2>Battery safety</h2>
      <p>
        Battery-operated toys may include coin-cell or other batteries. Keep battery compartments secure,
        follow insertion instructions and dispose of spent batteries responsibly. Seek immediate medical
        attention if a battery is swallowed or placed in the nose or ear.
      </p>

      <h2>Assembly and instructions</h2>
      <p>
        When assembly is required, follow the included instructions and retain them for future reference.
        Check that all fasteners, decorative parts and accessories are secure before play begins.
      </p>

      <h2>Product care</h2>
      <p>
        Follow care instructions on the product label and on the product page. Proper cleaning and storage
        help maintain safe play. See our{" "}
        <Link href="/toy-care">Toy Care</Link> page for general material guidance.
      </p>

      <h2>Damaged toys</h2>
      <p>
        Discontinue use of a toy that is cracked, splintered, torn, missing a critical part or otherwise
        compromised. Contact us with photos and your order reference if a product arrives damaged.
      </p>

      <h2>Missing pieces</h2>
      <p>
        If a new product arrives without listed components, contact us promptly with your order reference and
        a description of what is missing. Do not allow play with incomplete sets that may create unexpected
        hazards.
      </p>

      <h2>Recalls</h2>
      <p>
        {brand.legalName} maintains recall-readiness procedures for affected products and batches. If a recall
        affects an item you purchased, we will provide instructions through the contact information supplied at
        checkout. You may also check official government recall listings for current notices.
      </p>

      <h2>Reporting a concern</h2>
      <p>
        If you have a safety concern about a product purchased from {brand.publicName}, contact us through the{" "}
        <Link href="/contact">contact form</Link> and select &ldquo;Safety question.&rdquo; Include the product
        name, order reference if available and a clear description of the issue. For urgent medical situations,
        contact emergency services first.
      </p>

      <h2>Reviewing physical labels and instructions</h2>
      <p>
        Online information is provided to help adult buyers compare products before purchase. The physical
        label, packaging, instructions and warnings that arrive with your order are authoritative for that
        specific item. Review them on receipt and before first use.
      </p>
    </PolicyLayout>
  );
}

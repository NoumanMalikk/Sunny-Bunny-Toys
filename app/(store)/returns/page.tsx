import type { Metadata } from "next";
import Link from "next/link";
import { PolicyLayout } from "@/components/editorial/PolicyLayout";
import { brand, returnsConfig } from "@/data/store-config";

const LAST_UPDATED = "2026-07-13";

export const metadata: Metadata = {
  title: "Returns and Refunds",
  description:
    "Return and refund policy for Sunny Bunny Toy Co. request period, eligible condition, restricted items and how to start a return.",
};

export default function ReturnsPage() {
  return (
    <PolicyLayout
      title="Returns and Refunds"
      lastUpdated={LAST_UPDATED}
      intro={`This policy template describes how ${brand.legalName} handles return requests for online purchases. Specific outcomes depend on the item, condition and circumstances described below.`}
    >
      <h2>Return request period</h2>
      <p>
        Return requests should be submitted within <strong>{returnsConfig.returnRequestDays} days</strong> of
        delivery unless a product page or checkout notice states a different period for a specific item.
      </p>

      <h2>Eligible condition</h2>
      <p>To qualify for a standard return review, items should generally be:</p>
      <ul>
        {returnsConfig.requireUnusedCondition ? <li>Unused and in resalable condition</li> : null}
        {returnsConfig.requireOriginalPackaging ? <li>In original packaging with labels intact</li> : null}
        {returnsConfig.requireCompleteComponents ? (
          <li>Complete with all components, accessories and instruction sheets</li>
        ) : null}
      </ul>

      <h2>Damaged, missing or incorrect items</h2>
      <p>
        If a product arrives damaged, missing pieces, incorrect or defective, contact us promptly through the{" "}
        <Link href="/contact">contact form</Link> with your order reference and photos where helpful. We will
        review replacement, repair or refund options based on the situation.
      </p>

      <h2>Safety concerns</h2>
      <p>
        If you have a safety concern, discontinue use and contact us with the product name and details. See
        our <Link href="/product-safety">Product Safety</Link> page for additional guidance.
      </p>

      <h2>Restricted returns</h2>
      <p>The following may not qualify for standard return acceptance:</p>
      <ul>
        <li>Used art materials or consumable creative supplies</li>
        <li>Opened clay, bubble solution or similar opened consumables</li>
        <li>Products missing pieces or returned incomplete</li>
        <li>Items damaged after delivery through customer use or mishandling</li>
        <li>Personalized or custom-configured products</li>
        <li>Items returned outside the configured return-request period</li>
        <li>Products clearly marked as final sale at the time of purchase</li>
      </ul>

      <h2>Refund processing and replacements</h2>
      <p>
        Approved refunds are typically issued to the original payment method after the returned item is received
        and inspected, or sooner when a refund without return is appropriate. Replacement shipments are sent
        when inventory and circumstances allow.
      </p>

      <h2>Return shipping</h2>
      <p>
        Unless we provide a prepaid return label for our error or a defective item, customers are generally
        responsible for return-shipping costs for change-of-mind returns.
      </p>

      <h2>Restocking fee</h2>
      <p>
        {returnsConfig.restockingFeeEnabled
          ? `A restocking fee of ${returnsConfig.restockingFeePercent}% may apply to eligible returns.`
          : "A restocking fee is not currently applied to eligible returns."}
      </p>

      <h2>How to start a return</h2>
      <p>
        Contact us through the <Link href="/contact">contact form</Link>, select &ldquo;Return,&rdquo; and
        include your order reference, the item name and the reason for your request. We will reply with next
        steps. Do not send items to the business address without return authorization.
      </p>

      <div className="policy-note" role="note">
        <strong>Require legal review.</strong> This returns and refunds policy is a template for {brand.legalName}{" "}
        and should be reviewed by qualified legal counsel before production use.
      </div>
    </PolicyLayout>
  );
}

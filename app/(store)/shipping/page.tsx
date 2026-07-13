import type { Metadata } from "next";
import Link from "next/link";
import { PolicyLayout } from "@/components/editorial/PolicyLayout";
import { formatPrice } from "@/lib/pricing/format";
import { brand, shippingConfig, taxConfig } from "@/data/store-config";

const LAST_UPDATED = "2026-07-13";

export const metadata: Metadata = {
  title: "Shipping Information",
  description:
    "Shipping methods, processing times and delivery information for Sunny Bunny Toy Co. orders shipped within the United States.",
};

export default function ShippingPage() {
  return (
    <PolicyLayout
      title="Shipping Information"
      lastUpdated={LAST_UPDATED}
      intro={`${brand.legalName} ships orders from our online store to destinations within the United States. Rates and methods are calculated during checkout.`}
    >
      <h2>Order processing</h2>
      <p>{shippingConfig.processingText}</p>

      <h2>Shipping methods and rates</h2>
      <p>{shippingConfig.carrierEstimateText}</p>

      {shippingConfig.shippingEnabled ? (
        <>
          <p>Demonstration shipping methods currently shown include:</p>
          <ul>
            {shippingConfig.demoMethods.map((method) => (
              <li key={method.id}>
                <strong>{method.name}</strong>. {method.description} Estimated delivery:{" "}
                {method.estimatedDays}. Starting at {formatPrice(method.baseRate)}.
              </li>
            ))}
          </ul>
          {shippingConfig.weightBasedEnabled ? (
            <p>
              Additional weight-based charges may apply at {formatPrice(shippingConfig.weightRatePerLb)} per
              pound. Oversized items over {shippingConfig.oversizedWeightThresholdLbs} lbs may incur an
              additional {formatPrice(shippingConfig.oversizedProductRate)} handling rate.
            </p>
          ) : null}
        </>
      ) : (
        <p>Shipping is not currently enabled for this store configuration.</p>
      )}

      <h2>Free shipping</h2>
      <p>
        {shippingConfig.freeShippingEnabled
          ? `Free standard shipping is available on qualifying orders over ${formatPrice(shippingConfig.freeShippingThreshold)} before tax.`
          : "Free shipping promotions are not currently enabled. Check back during seasonal campaigns or watch for announcements."}
      </p>

      <h2>Local pickup and local delivery</h2>
      <p>
        {shippingConfig.localPickupEnabled || shippingConfig.localDeliveryEnabled ? (
          <>
            {shippingConfig.localPickupEnabled ? "Local pickup may be available at checkout. " : null}
            {shippingConfig.localDeliveryEnabled ? "Local delivery may be available in eligible areas. " : null}
            Details appear during checkout when enabled.
          </>
        ) : (
          <>
            Local pickup and local delivery are not currently offered. {brand.publicName} is a{" "}
            {brand.locationDescriptor.toLowerCase()}.
          </>
        )}
      </p>

      <h2>Restricted destinations</h2>
      <p>
        {shippingConfig.restrictedStates.length > 0 || shippingConfig.excludedDestinations.length > 0 ? (
          <>
            Some destinations may be restricted. Restricted states:{" "}
            {shippingConfig.restrictedStates.join(", ") || "none configured"}. Excluded destinations:{" "}
            {shippingConfig.excludedDestinations.join(", ") || "none configured"}.
          </>
        ) : (
          "No destination restrictions are currently configured. Availability is confirmed during checkout."
        )}
      </p>

      <h2>Taxes</h2>
      <p>{taxConfig.message}</p>
      {taxConfig.demoNote ? <p className="text-sm text-text-secondary">{taxConfig.demoNote}</p> : null}

      <h2>Order tracking</h2>
      <p>
        After your order ships, tracking details are shared using the email provided at checkout. You may also
        visit <Link href="/order-tracking">Order Tracking</Link> with your secure order reference.
      </p>

      <h2>Questions</h2>
      <p>
        For shipping questions before or after purchase, use our <Link href="/contact">contact form</Link> and
        select &ldquo;Shipping.&rdquo;
      </p>
    </PolicyLayout>
  );
}

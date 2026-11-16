import type { Metadata } from "next";
import Link from "next/link";
import { PolicyLayout } from "@/components/editorial/PolicyLayout";
import { brand, storeMode } from "@/data/store-config";

const LAST_UPDATED = "2026-07-13";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and Conditions for shopping at Sunny Bunny Toy Co., operated by Sunny Bunny Toys LLC. online retail terms for adult purchasers.",
};

export default function TermsPage() {
  return (
    <PolicyLayout
      title="Terms and Conditions"
      lastUpdated={LAST_UPDATED}
      intro={`These Terms and Conditions ("Terms") govern your use of the ${brand.publicName} website and online purchases from ${brand.legalName}. By using the site or placing an order, you agree to these Terms.`}
    >
      <h2>Online retail service</h2>
      <p>
        {brand.legalName} operates an online retail store offering dolls, toys, creative activities, puzzles and
        family games. Product availability, pricing and descriptions may change without notice. We reserve the
        right to limit quantities, refuse service or cancel orders placed in error.
      </p>

      <h2>Adult purchasers</h2>
      <p>
        You represent that you are at least 18 years old and are providing accurate information for yourself as
        the purchaser or authorized agent. The site is not directed to children, and you agree not to submit a
        child&apos;s personal information through our forms or checkout.
      </p>

      <h2>Product information and safety</h2>
      <p>
        We display verified age guidance, warnings, materials and product details where recorded. You
        acknowledge that:
      </p>
      <ul>
        <li>
          You will review physical product labels, packaging, instructions and warnings before use
        </li>
        <li>Age guidance and online warnings do not replace your supervision and judgment</li>
        <li>No toy is suitable for every child</li>
        <li>Product images and colors may vary slightly from the item received</li>
      </ul>
      <p>
        See our <Link href="/product-safety">Product Safety</Link> page for additional guidance.
      </p>

      <h2>Orders and payment</h2>
      <p>
        An order is an offer to purchase. We may confirm, modify or cancel an order before shipment. Payment is
        processed through our configured payment provider when checkout is live. Taxes and shipping are calculated
        at checkout unless otherwise stated.
      </p>

      <h2>Shipping and returns</h2>
      <p>
        Shipping terms are described in our <Link href="/shipping">Shipping Information</Link>. Return and refund
        terms are described in our <Link href="/returns">Returns and Refunds</Link> policy.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The {brand.publicName} name, logo, website design, product photography, editorial content and other site
        materials are owned by {brand.legalName} or its licensors and are protected by applicable intellectual
        property laws. You may not copy, reproduce or exploit site content without written permission except for
        personal, non-commercial viewing and shopping.
      </p>

      <h2>Prohibited use</h2>
      <p>You agree not to misuse the site, including by attempting unauthorized access, interfering with site
        operation, submitting false information, or using automated tools to scrape or overload the service.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        The site and products are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis to the
        fullest extent permitted by law, except for any non-waivable consumer rights that apply in your
        jurisdiction.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {brand.legalName} and its owner will not be liable for indirect,
        incidental, special, consequential or punitive damages arising from your use of the site or products. Our
        total liability for any claim relating to a purchase will not exceed the amount you paid for the
        affected product, except where a different limit is required by law.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of New Jersey, without regard to conflict-of-law
        principles, except where mandatory consumer protections in your state of residence apply.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these Terms from time to time. The &ldquo;Last updated&rdquo; date at the top of this page
        indicates when changes were posted. Continued use of the site after changes constitutes acceptance of the
        revised Terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms may be sent to{" "}
        <a href={`mailto:${storeMode.supportEmail}`}>{storeMode.supportEmail}</a> or through our{" "}
        <Link href="/contact">contact form</Link>.
      </p>

      <div className="policy-note" role="note">
        <strong>Require legal review.</strong> These Terms and Conditions are a template for {brand.legalName}{" "}
        and should be reviewed by qualified legal counsel before production use.
      </div>
    </PolicyLayout>
  );
}

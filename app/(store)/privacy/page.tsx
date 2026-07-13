import type { Metadata } from "next";
import Link from "next/link";
import { PolicyLayout } from "@/components/editorial/PolicyLayout";
import { brand, storeMode } from "@/data/store-config";

const LAST_UPDATED = "2026-07-13";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Sunny Bunny Toys LLC — how adult purchaser data is collected, used and protected when shopping at Sunny Bunny Toy Co.",
};

export default function PrivacyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro={`This Privacy Policy describes how ${brand.legalName} ("we," "us") collects, uses and shares information when you use the ${brand.publicName} website and related adult-directed services.`}
    >
      <h2>Who this policy covers</h2>
      <p>
        Our store is designed for <strong>adult purchasers</strong> — parents, guardians, grandparents, gift
        buyers and other adults making purchasing decisions. We do not create child profiles and do not knowingly
        collect personal information from children under 13. Purchasing, accounts, contact forms, newsletter
        sign-up and customer communication are directed to adults.
      </p>

      <h2>Information we collect</h2>
      <p>Depending on how you interact with the site, we may collect:</p>
      <ul>
        <li>
          <strong>Contact and account information</strong> — name, email address, phone number if provided,
          shipping and billing addresses, and order references when you purchase, create an account or contact
          us.
        </li>
        <li>
          <strong>Order information</strong> — products purchased, payment status, shipping selections, gift
          notes and safety acknowledgments recorded during checkout.
        </li>
        <li>
          <strong>Communications</strong> — messages you send through our contact form or support channels.
        </li>
        <li>
          <strong>Newsletter information</strong> — email address and optional marketing consent preferences for
          adults who subscribe.
        </li>
        <li>
          <strong>Technical information</strong> — device and browser type, IP address, pages visited and
          similar usage data collected through cookies and similar technologies.
        </li>
      </ul>

      <h2>How we use information</h2>
      <p>We use collected information to:</p>
      <ul>
        <li>Process and fulfill orders</li>
        <li>Provide customer support and respond to inquiries</li>
        <li>Send transactional emails such as order confirmations and shipping updates</li>
        <li>Send marketing communications when you have opted in</li>
        <li>Improve site performance, security and accessibility</li>
        <li>Meet legal, tax and safety obligations</li>
      </ul>

      <h2>Service providers</h2>
      <p>
        When connected in production, we use trusted processors to operate the store, including:
      </p>
      <ul>
        <li>
          <strong>Stripe</strong> — payment processing and, when enabled, tax calculation
        </li>
        <li>
          <strong>Supabase</strong> — database, authentication and order storage when configured
        </li>
        <li>
          <strong>Resend</strong> — transactional and support email delivery when configured
        </li>
      </ul>
      <p>
        These providers process information on our behalf according to their terms and our instructions. We do
        not sell your personal information.
      </p>

      <h2>Cookies and similar technologies</h2>
      <p>
        We use cookies and similar technologies to keep your cart functional, remember preferences, understand
        site usage and support security. You can control cookies through your browser settings. Some features may
        not work correctly if essential cookies are disabled.
      </p>

      <h2>Data retention</h2>
      <p>
        We retain information for as long as needed to fulfill orders, provide support, comply with legal
        obligations and resolve disputes. You may request deletion of certain account or contact information
        subject to legal and operational requirements.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>Update account details through your account settings when available</li>
        <li>Opt out of marketing emails using the unsubscribe link in any marketing message</li>
        <li>Contact us to access, correct or request deletion of certain personal information</li>
      </ul>

      <h2>Security</h2>
      <p>
        We use administrative, technical and organizational measures designed to protect personal information.
        No online transmission or storage system is completely secure.
      </p>

      <h2>Contact us</h2>
      <p>
        Privacy questions may be directed to {brand.legalName} at{" "}
        <a href={`mailto:${storeMode.supportEmail}`}>{storeMode.supportEmail}</a> or through our{" "}
        <Link href="/contact">contact form</Link>. You may also call{" "}
        <a href={brand.phoneHref}>{brand.phone}</a>.
      </p>

      <div className="policy-note" role="note">
        <strong>Require legal review.</strong> This Privacy Policy is a template for {brand.legalName} and
        should be reviewed by qualified legal counsel before production use.
      </div>
    </PolicyLayout>
  );
}

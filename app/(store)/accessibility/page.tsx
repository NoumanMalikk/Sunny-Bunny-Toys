import type { Metadata } from "next";
import Link from "next/link";
import { PolicyLayout } from "@/components/editorial/PolicyLayout";
import { brand, storeMode } from "@/data/store-config";

const LAST_UPDATED = "2026-07-13";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Accessibility Statement for Sunny Bunny Toy Co. — our commitment to WCAG 2.2 AA and how to report barriers.",
};

export default function AccessibilityPage() {
  return (
    <PolicyLayout
      title="Accessibility Statement"
      lastUpdated={LAST_UPDATED}
      intro={`${brand.publicName} is committed to providing a website that is accessible to adult purchasers, including people who use assistive technologies. We aim to conform with Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.`}
    >
      <h2>Our approach</h2>
      <p>We work to make shopping, product discovery and checkout usable for as many people as possible. Our
        efforts include:</p>
      <ul>
        <li>Logical heading structure and descriptive link text</li>
        <li>Keyboard-accessible navigation, sliders, drawers and forms</li>
        <li>Visible focus indicators and sufficient color contrast</li>
        <li>Text alternatives for meaningful images</li>
        <li>Accessible product warnings that do not rely on color alone</li>
        <li>Support for reduced-motion preferences</li>
        <li>Screen-reader announcements for dynamic cart and form updates</li>
        <li>Minimum touch-target sizes on mobile</li>
      </ul>

      <h2>Known limitations</h2>
      <p>
        Some third-party payment interfaces, carrier tools or embedded content may not fully meet our
        accessibility targets. We review these components as integrations are connected and updated.
      </p>

      <h2>Feedback and assistance</h2>
      <p>
        If you encounter a barrier on our website — or need help completing a purchase — please contact us. We
        will try to provide the information or service through an alternative method while we work on a fix.
      </p>
      <ul>
        <li>
          Email:{" "}
          <a href={`mailto:${storeMode.supportEmail}`}>{storeMode.supportEmail}</a>
        </li>
        <li>
          Phone: <a href={brand.phoneHref}>{brand.phone}</a>
        </li>
        <li>
          <Link href="/contact">Contact form</Link> — select &ldquo;Website issue&rdquo;
        </li>
      </ul>
      <p>
        When reporting an issue, include the page URL, a description of the barrier and the assistive technology
        or browser you are using if applicable.
      </p>

      <h2>Continuous improvement</h2>
      <p>
        Accessibility is an ongoing effort. We test key flows during development and incorporate feedback from
        customers and audits to improve the experience over time.
      </p>
    </PolicyLayout>
  );
}

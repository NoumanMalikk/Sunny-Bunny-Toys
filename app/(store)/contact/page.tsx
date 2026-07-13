import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { brand, storeMode } from "@/data/store-config";

export const metadata: Metadata = {
  title: "Contact Sunny Bunny",
  description:
    "Contact Sunny Bunny Toy Co. with questions about toys, age guidance, orders, shipping, returns or website support. Adult-directed communication only.",
};

export default function ContactPage() {
  return (
    <div className="container-store py-12 md:py-16">
      <header className="mx-auto max-w-3xl">
        <p className="eyebrow mb-3 text-mint">Get in touch</p>
        <h1 className="font-display text-3xl text-navy md:text-4xl">Contact Sunny Bunny</h1>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          Questions about a toy, age guidance, warning, order or website experience? Send a message with the
          relevant details.
        </p>
      </header>

      <div className="mx-auto mt-10 grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
        <aside className="rounded-[var(--radius-card)] border border-border bg-cloud p-6 shadow-soft">
          <h2 className="font-display text-xl text-navy">Business information</h2>
          <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed text-text-secondary">
            <p className="font-semibold text-navy">{brand.legalName}</p>
            {storeMode.showFullAddress ? (
              <p>
                {brand.address.line1}
                <br />
                {brand.address.city}, {brand.address.state} {brand.address.postalCode}
              </p>
            ) : (
              <p>{brand.cityStateZip}</p>
            )}
            <p>{brand.locationDescriptor}</p>
            <p>
              Phone:{" "}
              <a href={brand.phoneHref} className="font-semibold text-navy underline-offset-2 hover:underline">
                {brand.phone}
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href={`mailto:${storeMode.supportEmail}`}
                className="font-semibold text-navy underline-offset-2 hover:underline"
              >
                {storeMode.supportEmail}
              </a>
            </p>
          </address>
          <p className="mt-4 text-xs leading-relaxed text-text-secondary">
            Purchasing, contact forms and customer communication are directed to adults. We do not collect
            personal information from children.
          </p>
        </aside>

        <section aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading" className="sr-only">
            Contact form
          </h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}

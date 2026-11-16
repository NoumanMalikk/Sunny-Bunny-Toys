import type { Metadata } from "next";
import { faqItems } from "@/data/faq";
import { brand } from "@/data/store-config";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about shopping at Sunny Bunny Toy Co., including ordering, age guidance, warnings, gifts, and adult-directed communication.",
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="container-store py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="mx-auto max-w-3xl">
        <p className="eyebrow mb-3 text-mint">Help center</p>
        <h1 className="font-display text-3xl text-navy md:text-4xl">Frequently Asked Questions</h1>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          Quick answers for adult purchasers shopping at {brand.publicName}. Need more help?{" "}
          <a href="/contact" className="font-semibold text-navy underline-offset-2 hover:underline">
            Contact us
          </a>
          .
        </p>
      </header>

      <div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-[var(--radius-card)] border border-border bg-cloud shadow-soft">
        {faqItems.map((item, index) => (
          <details key={item.question} className="group px-6 py-5">
            <summary className="cursor-pointer list-none font-display text-lg text-navy marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                <span>{item.question}</span>
                <span
                  className="mt-1 shrink-0 font-ui text-sm font-bold text-mint transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </span>
            </summary>
            <p id={`faq-answer-${index}`} className="mt-4 text-sm leading-relaxed text-text-secondary">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}

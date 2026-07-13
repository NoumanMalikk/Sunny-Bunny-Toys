import { Camera, ShieldCheck, ClipboardList, Lock } from "lucide-react";
import { SectionHeader } from "@/components/home/decor/SectionHeader";
import { cn } from "@/lib/utilities/cn";

const trustCards = [
  {
    icon: Camera,
    title: "Exact product photography",
    description:
      "Every product page is designed for authorized photography before launch — what you see will match the verified listing.",
    accent: "#FFD457",
  },
  {
    icon: ClipboardList,
    title: "Clear age guidance",
    description:
      "Verified age grades, piece counts, materials and applicable warnings appear on each product page — read before purchase.",
    accent: "#79C9F4",
  },
  {
    icon: ShieldCheck,
    title: "Detailed product information",
    description:
      "Package contents, care instructions and safety notes are listed for every active product — no hidden surprises.",
    accent: "#55CFA8",
  },
  {
    icon: Lock,
    title: "Secure checkout",
    description:
      "Checkout uses industry-standard encryption. Taxes and shipping are calculated during checkout based on your order.",
    accent: "#A89AEF",
  },
] as const;

export function WhySunnyBunny() {
  return (
    <section aria-labelledby="why-sunny-bunny-heading" className="container-store py-16 md:py-20">
      <SectionHeader
        eyebrow="Why Sunny Bunny"
        title="Thoughtful toys, transparent details"
        description="We focus on clear product information, verified age guidance and a secure shopping experience — so adults can choose with confidence."
        align="center"
      />

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" role="list">
        {trustCards.map((card) => (
          <li key={card.title} className="h-full">
            <article
              className={cn(
                "flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-cloud p-6 shadow-soft",
              )}
            >
              <span
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: `${card.accent}33` }}
              >
                <card.icon className="size-6 text-navy" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg text-navy">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">{card.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

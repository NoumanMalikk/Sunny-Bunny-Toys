import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/brand/BrandMark";

export function ProductSafetyTeaser() {
  return (
    <section
      aria-labelledby="product-safety-heading"
      className="container-store py-12 md:py-16"
    >
      <div className="relative overflow-hidden rounded-[var(--radius-editorial)] border border-mint/30 bg-gradient-to-br from-mint/10 via-cream to-sky/10 p-8 md:p-12">
        <BrandMark className="absolute -right-4 -top-4 h-24 w-24 opacity-15 md:h-32 md:w-32" aria-hidden="true" />

        <div className="relative max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-mint/15 px-4 py-1.5 font-ui text-xs font-bold uppercase tracking-wide text-deep-mint">
            <ShieldCheck className="size-4" aria-hidden="true" />
            Product safety
          </div>
          <h2 id="product-safety-heading" className="font-display text-2xl text-navy md:text-3xl">
            Safety information you can trust
          </h2>
          <p className="mt-3 text-base leading-relaxed text-text-secondary">
            Every active product includes age grades, applicable warnings, materials and care instructions.
            Review packaging, instructions and warnings before use. and visit our safety hub for compliance
            details and recall information.
          </p>
          <Button href="/product-safety" className="mt-6">
            Visit product safety
          </Button>
        </div>
      </div>
    </section>
  );
}

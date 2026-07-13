import { getProductsByCategory } from "@/data/products";
import { ProductSlider } from "@/components/sliders/ProductSlider";
import { SectionHeader } from "@/components/home/decor/SectionHeader";
import { cn } from "@/lib/utilities/cn";

function StudioDoodles() {
  const doodles = [
    { className: "left-[6%] top-[14%] rotate-12", d: "M12 20 Q20 8 28 20" },
    { className: "right-[8%] top-[20%] -rotate-6", d: "M8 16 L24 16 L16 4 Z" },
    { className: "left-[12%] bottom-[18%] rotate-45", d: "M4 20 C12 4 20 4 28 20" },
    { className: "right-[14%] bottom-[22%] -rotate-12", d: "M16 4 L28 28 L4 28 Z" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {doodles.map((doodle, i) => (
        <svg
          key={i}
          viewBox="0 0 32 32"
          className={cn("absolute h-10 w-10 text-coral/25 md:h-14 md:w-14", doodle.className)}
        >
          <path d={doodle.d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ))}
    </div>
  );
}

export function CreativeStudioSection() {
  const products = getProductsByCategory("arts-crafts");

  return (
    <section
      aria-labelledby="creative-studio-heading"
      className="relative overflow-hidden py-16 md:py-20"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-coral/12 via-peach/20 to-cream"
        aria-hidden="true"
      />
      <StudioDoodles />

      <div className="container-store relative">
        <SectionHeader
          eyebrow="Arts & crafts"
          title="Welcome to the Sunny Studio"
          description="Washable art sets, clay colors and giant coloring rolls — creative supplies with care instructions on every product page."
          href="/arts-crafts"
          linkLabel="Shop arts & crafts"
          align="center"
        />
        <ProductSlider products={products} ariaLabel="Creative studio products" />
      </div>
    </section>
  );
}

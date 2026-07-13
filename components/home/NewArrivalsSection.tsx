import { getNewArrivals } from "@/data/products";
import { ProductSlider } from "@/components/sliders/ProductSlider";
import { SectionHeader } from "@/components/home/decor/SectionHeader";
import { Button } from "@/components/ui/Button";

export function NewArrivalsSection() {
  const products = getNewArrivals(8);

  return (
    <section aria-labelledby="new-arrivals-heading" className="container-store py-16 md:py-20">
      <SectionHeader
        eyebrow="New in the playroom"
        title="Fresh ways to play"
        description="Recently added dolls, building sets, creative kits and family games — each with verified age guidance on the product page."
        href="/new-arrivals"
        linkLabel="See all new arrivals"
      />
      <ProductSlider products={products} ariaLabel="New arrivals carousel" />
      <div className="mt-8 text-center md:hidden">
        <Button href="/new-arrivals" variant="outline">
          See all new arrivals
        </Button>
      </div>
    </section>
  );
}

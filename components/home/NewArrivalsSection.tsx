import { getNewArrivals } from "@/data/products";
import { ProductSlider } from "@/components/sliders/ProductSlider";
import { SectionHeader } from "@/components/home/decor/SectionHeader";
import { Button } from "@/components/ui/Button";

export function NewArrivalsSection() {
  const products = getNewArrivals(8);

  return (
    <section aria-labelledby="new-arrivals-heading" className="home-section">
      <div className="container-store">
        <SectionHeader
          eyebrow="New in the playroom"
          title="Fresh ways to play"
          description="Recently added dolls, building sets, creative kits and family games — each shown with matching photography and age guidance."
          href="/new-arrivals"
          linkLabel="See all new arrivals"
        />
        <ProductSlider products={products} ariaLabel="New arrivals carousel" />
        <div className="mt-8 text-center md:hidden">
          <Button href="/new-arrivals" variant="outline">
            See all new arrivals
          </Button>
        </div>
      </div>
    </section>
  );
}

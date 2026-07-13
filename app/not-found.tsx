import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { Button } from "@/components/ui/Button";
import { brand } from "@/data/store-config";

export default function NotFound() {
  return (
    <div className="container-store flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <BrandMark className="mb-6 h-20 w-20 opacity-30" aria-hidden="true" />
      <p className="eyebrow mb-3 text-mint">Page not found</p>
      <h1 className="font-display text-3xl text-navy md:text-4xl">This path wandered off the play map</h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary">
        The page you are looking for may have moved or does not exist. Let&apos;s get you back to something
        bright at {brand.publicName}.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href="/" size="lg">
          Back to home
        </Button>
        <Button href="/new-arrivals" variant="outline" size="lg">
          Shop new arrivals
        </Button>
      </div>
      <nav aria-label="Helpful links" className="mt-8">
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-text-secondary">
          <li>
            <Link href="/contact" className="hover:text-navy hover:underline">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/faq" className="hover:text-navy hover:underline">
              FAQ
            </Link>
          </li>
          <li>
            <Link href="/journal" className="hover:text-navy hover:underline">
              Journal
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

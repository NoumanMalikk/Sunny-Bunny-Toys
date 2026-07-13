import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { brand, storeMode } from "@/data/store-config";
import { footerNav } from "@/data/navigation";

const footerColumns = [
  { title: "Shop", links: footerNav.shop },
  { title: "Shop by age", links: footerNav.ages },
  { title: "Help", links: footerNav.help },
  { title: "Company", links: footerNav.company },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-cloud" aria-labelledby="site-footer-heading">
      <h2 id="site-footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="container-wide py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] lg:gap-16">
          <div className="space-y-5">
            <Link href="/" className="inline-block rounded-[var(--radius-btn)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2">
              <Logo variant="horizontal" className="h-10 w-auto" />
            </Link>

            <div className="space-y-1 text-sm text-text-secondary">
              <p className="font-display text-base text-navy">{brand.legalName}</p>
              <p>{brand.descriptor}</p>
              <p>{brand.locationDescriptor}</p>
              <p>{brand.cityStateZip}</p>
              <p>
                <a
                  href={brand.phoneHref}
                  className="font-semibold text-navy underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
                >
                  {brand.phone}
                </a>
              </p>
            </div>
          </div>

          <nav
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            aria-label="Footer navigation"
          >
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="eyebrow mb-3 text-navy">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-border bg-soft-gray/60">
        <div className="container-wide flex flex-col gap-3 py-5 text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {brand.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-navy focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sunshine focus-visible:ring-offset-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {storeMode.mode === "demo" ? (
            <p className="text-[0.7rem] uppercase tracking-wide">Demonstration store</p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}

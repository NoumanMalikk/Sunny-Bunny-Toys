import { brand, seoDefaults, storeMode } from "@/data/store-config";

export function JsonLd() {
  const siteUrl = storeMode.siteUrl.replace(/\/$/, "");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: brand.legalName,
        alternateName: [brand.publicName, brand.shortName],
        description: seoDefaults.organizationDescription,
        url: siteUrl,
        telephone: brand.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: brand.address.city,
          addressRegion: brand.address.state,
          postalCode: brand.address.postalCode,
          addressCountry: brand.address.countryCode,
        },
      },
      {
        "@type": "OnlineStore",
        "@id": `${siteUrl}/#store`,
        name: brand.publicName,
        description: brand.supporting,
        url: siteUrl,
        parentOrganization: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { SkipLink } from "@/components/layout/SkipLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { brand, seoDefaults, storeMode } from "@/data/store-config";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(storeMode.siteUrl),
  title: {
    default: seoDefaults.homeTitle,
    template: `%s | ${brand.publicName}`,
  },
  description: seoDefaults.homeDescription,
  applicationName: brand.publicName,
  icons: {
    icon: "/icons/favicon.svg",
    apple: "/icons/apple-touch-icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: brand.publicName,
    title: seoDefaults.homeTitle,
    description: seoDefaults.homeDescription,
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ colorScheme: "light" }}
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-text">
        <JsonLd />
        <Providers>
          <SkipLink />
          <AnnouncementBar />
          <Header />
          <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

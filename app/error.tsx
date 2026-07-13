"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { Button } from "@/components/ui/Button";
import { brand } from "@/data/store-config";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-store flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <BrandMark className="mb-6 h-20 w-20 opacity-30" aria-hidden="true" />
      <p className="eyebrow mb-3 text-coral">Something went wrong</p>
      <h1 className="font-display text-3xl text-navy md:text-4xl">We hit a little bump</h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary" role="alert">
        {brand.publicName} ran into an unexpected error. You can try again, return home or contact us if the
        problem continues.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button type="button" size="lg" onClick={reset}>
          Try again
        </Button>
        <Button href="/" variant="outline" size="lg">
          Back to home
        </Button>
      </div>
      <p className="mt-6 text-sm text-text-secondary">
        Need help?{" "}
        <Link href="/contact" className="font-semibold text-navy underline-offset-2 hover:underline">
          Contact support
        </Link>
      </p>
    </div>
  );
}

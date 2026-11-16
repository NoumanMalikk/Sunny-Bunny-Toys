import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AccountPage() {
  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return (
    <div className="container-store py-8 md:py-12">
      <div className="mx-auto max-w-xl text-center">
        <User className="mx-auto size-12 text-navy" aria-hidden="true" />
        <h1 className="mt-4 font-display text-3xl text-navy md:text-4xl">Your account</h1>

        {supabaseConfigured ? (
          <p className="mt-3 text-text-secondary">
            Account sign-in is available. Sign in to view order history, saved addresses, and wishlists across devices.
          </p>
        ) : (
          <>
            <p className="mt-3 text-text-secondary">
              Customer accounts will be available when sign-in is connected. Until then, track an order with the
              reference and email from checkout.
            </p>
          </>
        )}

        <div className="mt-8 grid gap-3">
          <Button href="/order-tracking" size="lg">
            Track an order
          </Button>
          <Button href="/account/orders" variant="outline">
            View order history
          </Button>
        </div>

        <p className="mt-8 text-sm text-text-secondary">
          Need help?{" "}
          <Link href="/contact" className="underline underline-offset-2">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}

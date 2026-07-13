import Link from "next/link";
import { PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DemoNotice } from "@/components/checkout/DemoNotice";

export function AccountOrdersPage() {
  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return (
    <div className="container-store py-8 md:py-12">
      <div className="mx-auto max-w-xl text-center">
        <PackageOpen className="mx-auto size-12 text-navy" aria-hidden="true" />
        <h1 className="mt-4 font-display text-3xl text-navy">Order history</h1>

        {supabaseConfigured ? (
          <p className="mt-3 text-text-secondary">
            Sign in to your account to view past orders and reorder favorites.
          </p>
        ) : (
          <>
            <p className="mt-3 text-text-secondary">
              Order history requires a customer account. In demonstration mode, no orders are stored locally.
            </p>
            <DemoNotice
              className="mt-8 text-left"
              title="No orders to display"
              message="Your local order history is empty. Use order tracking with your order reference and checkout email, or configure Supabase for persistent accounts."
            />
          </>
        )}

        <div className="mt-8 grid gap-3">
          <Button href="/order-tracking" size="lg">
            Track an order
          </Button>
          <Button href="/account" variant="ghost">
            Back to account
          </Button>
        </div>

        <p className="mt-8 text-sm text-text-secondary">
          <Link href="/new-arrivals" className="underline underline-offset-2">
            Continue shopping
          </Link>
        </p>
      </div>
    </div>
  );
}

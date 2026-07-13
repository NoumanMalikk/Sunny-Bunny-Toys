"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { DemoNotice } from "@/components/checkout/DemoNotice";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/pricing/format";
import { storeMode } from "@/data/store-config";

type ConfirmResponse = {
  ok: boolean;
  verified: boolean;
  demo?: boolean;
  message?: string;
  order?: {
    orderRef: string;
    status: string;
    paymentStatus: string;
    total: number;
    customer: { firstName: string; email: string };
    items: Array<{ title: string; quantity: number; lineTotal: number }>;
  };
};

export function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const orderRef = searchParams.get("orderRef");
  const isDemo = storeMode.mode === "demo";
  const hasRef = Boolean(sessionId || orderRef);

  const [state, setState] = useState<"loading" | "verified" | "blocked" | "error">(() => {
    if (!hasRef) return "error";
    if (isDemo) return "blocked";
    return "loading";
  });
  const [response, setResponse] = useState<ConfirmResponse | null>(() =>
    isDemo && hasRef
      ? {
          ok: false,
          verified: false,
          demo: true,
          message: "Demonstration mode — no paid order was created.",
        }
      : null,
  );

  useEffect(() => {
    if (!hasRef || isDemo) return;

    const params = new URLSearchParams();
    if (sessionId) params.set("session_id", sessionId);
    if (orderRef) params.set("orderRef", orderRef);

    let cancelled = false;
    fetch(`/api/orders/confirm?${params.toString()}`)
      .then((res) => res.json())
      .then((data: ConfirmResponse) => {
        if (cancelled) return;
        setResponse(data);
        if (data.demo) {
          setState("blocked");
        } else if (data.verified) {
          setState("verified");
        } else {
          setState("blocked");
        }
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [sessionId, orderRef, isDemo, hasRef]);

  if (!sessionId && !orderRef) {
    return (
      <div className="container-store py-16 text-center">
        <XCircle className="mx-auto size-12 text-warning" aria-hidden="true" />
        <h1 className="mt-4 font-display text-3xl text-navy">Order reference required</h1>
        <p className="mt-3 text-text-secondary">
          A valid session_id or order reference is required to view this page.
        </p>
        <Button href="/order-tracking" className="mt-6">
          Track an order
        </Button>
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div className="container-store py-16 text-center">
        <p className="text-text-secondary">Verifying your payment…</p>
      </div>
    );
  }

  if (state === "verified" && response?.order) {
    return (
      <div className="container-store py-12 md:py-16">
        <div className="mx-auto max-w-xl text-center">
          <CheckCircle className="mx-auto size-14 text-deep-mint" aria-hidden="true" />
          <h1 className="mt-4 font-display text-3xl text-navy">Thank you for your order!</h1>
          <p className="mt-3 text-text-secondary">
            Order <strong className="text-navy">{response.order.orderRef}</strong> has been confirmed.
            A confirmation email was sent to {response.order.customer.email}.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-lg rounded-[var(--radius-editorial)] border border-border bg-cloud p-6">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-text-secondary">Order total</dt>
              <dd className="tabular font-bold text-navy">{formatPrice(response.order.total)}</dd>
            </div>
          </dl>
          <ul className="mt-4 divide-y divide-border text-sm">
            {response.order.items.map((item) => (
              <li key={item.title} className="flex justify-between py-2">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span className="tabular">{formatPrice(item.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-2">
            <Button href={`/order-tracking?orderRef=${response.order.orderRef}`}>Track your order</Button>
            <Button href="/new-arrivals" variant="ghost">
              Continue shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-store py-12 md:py-16">
      <div className="mx-auto max-w-xl">
        <XCircle className="mx-auto size-14 text-warning" aria-hidden="true" />
        <h1 className="mt-4 text-center font-display text-3xl text-navy">
          {state === "error" ? "Unable to verify order" : "Order not confirmed"}
        </h1>

        {response?.demo || isDemo ? (
          <DemoNotice
            className="mt-8"
            title="Demonstration mode"
            message="Demonstration mode — no paid order was created. Configure Stripe credentials and set NEXT_PUBLIC_STORE_MODE=production to accept live payments."
          />
        ) : (
          <p className="mt-4 text-center text-text-secondary">
            {response?.message ?? "Payment could not be verified. If you completed payment, check your email or track your order."}
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/order-tracking">Track an order</Button>
          <Button href="/checkout" variant="ghost">
            Return to checkout
          </Button>
        </div>

        <p className="mt-8 text-center text-xs text-text-secondary">
          Questions? Contact{" "}
          <Link href={`mailto:${storeMode.supportEmail}`} className="underline">
            {storeMode.supportEmail}
          </Link>
        </p>
      </div>
    </div>
  );
}

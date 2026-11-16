"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Package, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { DemoNotice } from "@/components/checkout/DemoNotice";
import { storeMode } from "@/data/store-config";
import { formatPrice } from "@/lib/pricing/format";
import { cn } from "@/lib/utilities/cn";

type TimelineEntry = {
  status: string;
  label: string;
  at: string | null;
  current?: boolean;
  completed?: boolean;
};

type TrackResult = {
  orderRef: string;
  statusLabel: string;
  paymentStatus: string;
  total: number;
  shippingMethodName: string;
  trackingNumber: string | null;
  carrierName: string | null;
  demoMode: boolean;
  items: Array<{ title: string; quantity: number; image: string }>;
  timeline: TimelineEntry[];
};

export function OrderTrackingPage() {
  const searchParams = useSearchParams();
  const [orderRef, setOrderRef] = useState(searchParams.get("orderRef") ?? "");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<TrackResult | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderRef, email }),
      });
      const data = (await response.json()) as { ok?: boolean; message?: string; order?: TrackResult };

      if (!response.ok || !data.ok || !data.order) {
        setError(data.message ?? "Order not found.");
        return;
      }

      setResult(data.order);
    } catch {
      setError("Unable to look up order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-store py-8 md:py-12">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <Package className="mx-auto size-12 text-navy" aria-hidden="true" />
          <h1 className="mt-4 font-display text-3xl text-navy md:text-4xl">Track your order</h1>
          <p className="mt-3 text-text-secondary">
            Enter your order reference and the email address used at checkout.
          </p>
        </div>

        {storeMode.mode === "demo" ? (
          <DemoNotice
            className="mt-8"
            message="Use the order reference and the email from checkout. Orders from this visit can be looked up here."
          />
        ) : null}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-[var(--radius-editorial)] border border-border bg-cloud p-6">
          <div>
            <Label htmlFor="orderRef" required>Order reference</Label>
            <Input
              id="orderRef"
              value={orderRef}
              onChange={(e) => setOrderRef(e.target.value)}
              placeholder="SBT-XXXXXXXXXX"
              className="mt-1.5"
              required
            />
          </div>
          <div>
            <Label htmlFor="track-email" required>Email address</Label>
            <Input
              id="track-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5"
              autoComplete="email"
              required
            />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            <Search className="size-4" aria-hidden="true" />
            {loading ? "Looking up…" : "Track order"}
          </Button>
        </form>

        {error ? (
          <p role="alert" className="mt-4 text-center text-sm font-semibold text-error">
            {error}
          </p>
        ) : null}

        {result ? (
          <div className="mt-10 space-y-6">
            <div className="rounded-[var(--radius-editorial)] border border-border bg-cloud p-6">
              <p className="text-sm text-text-secondary">Order reference</p>
              <p className="font-display text-2xl text-navy">{result.orderRef}</p>
              <p className="mt-2 text-sm">
                Status: <strong className="text-navy">{result.statusLabel}</strong>
                {result.demoMode ? (
                  <span className="ml-2 text-xs text-warning">(demo)</span>
                ) : null}
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                {result.shippingMethodName} · {formatPrice(result.total)}
              </p>
              {result.trackingNumber ? (
                <p className="mt-2 text-sm">
                  Tracking: {result.carrierName ? `${result.carrierName} ` : ""}
                  <strong>{result.trackingNumber}</strong>
                </p>
              ) : null}
            </div>

            <div className="rounded-[var(--radius-editorial)] border border-border bg-cloud p-6">
              <h2 className="font-display text-lg text-navy">Shipment timeline</h2>
              <ol className="mt-4 space-y-3">
                {result.timeline.map((entry) => (
                  <li
                    key={entry.status}
                    className={cn(
                      "flex items-start gap-3 text-sm",
                      entry.current ? "font-semibold text-navy" : "text-text-secondary",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1 size-2.5 shrink-0 rounded-full",
                        entry.current ? "bg-sunshine" : entry.completed ? "bg-deep-mint" : "bg-border",
                      )}
                      aria-hidden="true"
                    />
                    <span>
                      {entry.label}
                      {entry.at ? (
                        <span className="ml-2 text-xs text-text-secondary">
                          {new Date(entry.at).toLocaleDateString()}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[var(--radius-editorial)] border border-border bg-cloud p-6">
              <h2 className="font-display text-lg text-navy">Items</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {result.items.map((item) => (
                  <li key={item.title}>
                    {item.title} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

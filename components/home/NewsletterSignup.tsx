"use client";

import { useState } from "react";
import { brand } from "@/data/store-config";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { BrandMark } from "@/components/brand/BrandMark";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, marketingConsent }),
      });

      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("Thank you. check your inbox for a confirmation.");
      setEmail("");
      setMarketingConsent(false);
    } catch {
      setStatus("error");
      setMessage("Unable to connect. Please try again later.");
    }
  };

  return (
    <section aria-labelledby="newsletter-heading" className="container-store py-16 md:py-20">
      <div className="relative overflow-hidden rounded-[var(--radius-editorial)] bg-deep-mint px-6 py-10 text-cloud md:px-12 md:py-14">
        <BrandMark tone="dark" className="absolute -right-6 -top-6 h-28 w-28 opacity-20 md:h-36 md:w-36" aria-hidden="true" />

        <div className="relative mx-auto max-w-xl text-center">
          <p className="eyebrow mb-2 text-mint/80">Stay in the loop</p>
          <h2 id="newsletter-heading" className="font-display text-3xl text-cloud md:text-4xl">
            Sunny days in your inbox
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-cloud/85 md:text-base">
            Sign-up is for adults only. Get new arrivals, journal posts and seasonal gift ideas from{" "}
            {brand.publicName}. no child profiles or personal data collected.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
            <div>
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-cloud/30 bg-cloud/10 text-cloud placeholder:text-cloud/60"
                disabled={status === "loading"}
              />
            </div>

            <Checkbox
              id="newsletter-marketing"
              name="marketingConsent"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              label={
                <span className="text-cloud/90">
                  Yes, send me occasional marketing emails about new products and promotions (optional)
                </span>
              }
              disabled={status === "loading"}
            />

            <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </Button>
          </form>

          {message ? (
            <p
              role={status === "error" ? "alert" : "status"}
              className={`mt-4 text-sm ${status === "error" ? "text-coral" : "text-sunshine"}`}
            >
              {message}
            </p>
          ) : null}

          <p className="mt-4 text-xs text-cloud/70">
            By subscribing you confirm you are 18 or older. See our{" "}
            <a href="/privacy" className="underline underline-offset-2 hover:text-sunshine">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

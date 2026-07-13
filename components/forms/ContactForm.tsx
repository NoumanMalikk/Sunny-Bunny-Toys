"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { contactTopics } from "@/data/contact-topics";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "product" | "orderReference" | "topic" | "message" | "consent", string>
>;

export function ContactForm() {
  const formId = useId();
  const errorSummaryId = `${formId}-errors`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [orderReference, setOrderReference] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setFormMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          product: product || undefined,
          orderReference: orderReference || undefined,
          topic,
          message,
          consent,
          website: honeypot,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setFormMessage(data.message ?? "Something went wrong. Please try again.");
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        return;
      }

      setStatus("success");
      setFormMessage(data.message ?? "Thank you — your message has been received.");
      setName("");
      setEmail("");
      setPhone("");
      setProduct("");
      setOrderReference("");
      setTopic("");
      setMessage("");
      setConsent(false);
    } catch {
      setStatus("error");
      setFormMessage("Unable to connect. Please try again later.");
    }
  };

  const hasFieldErrors = Object.keys(fieldErrors).length > 0;

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby={hasFieldErrors ? errorSummaryId : undefined}>
      {hasFieldErrors ? (
        <div
          id={errorSummaryId}
          role="alert"
          className="mb-6 rounded-[var(--radius-card)] border border-error/30 bg-error/5 p-4"
        >
          <p className="font-ui text-sm font-semibold text-error">Please correct the following:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-text">
            {Object.entries(fieldErrors).map(([field, error]) => (
              <li key={field}>
                <a href={`#${formId}-${field}`} className="underline underline-offset-2 hover:text-navy">
                  {error}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Honeypot — hidden from users and assistive tech */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={`${formId}-name`} required>
            Your name (adult purchaser)
          </Label>
          <Input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? `${formId}-name-error` : undefined}
            disabled={status === "loading"}
          />
          {fieldErrors.name ? (
            <p id={`${formId}-name-error`} className="text-sm text-error" role="alert">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${formId}-email`} required>
            Email
          </Label>
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? `${formId}-email-error` : undefined}
            disabled={status === "loading"}
          />
          {fieldErrors.email ? (
            <p id={`${formId}-email-error`} className="text-sm text-error" role="alert">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${formId}-phone`}>Phone (optional)</Label>
          <Input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={Boolean(fieldErrors.phone)}
            disabled={status === "loading"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${formId}-product`}>Product (optional)</Label>
          <Input
            id={`${formId}-product`}
            name="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Product name or SKU"
            disabled={status === "loading"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${formId}-orderReference`}>Order reference (optional)</Label>
          <Input
            id={`${formId}-orderReference`}
            name="orderReference"
            value={orderReference}
            onChange={(e) => setOrderReference(e.target.value)}
            placeholder="Order number, if applicable"
            disabled={status === "loading"}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={`${formId}-topic`} required>
            Topic
          </Label>
          <Select
            id={`${formId}-topic`}
            name="topic"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            error={Boolean(fieldErrors.topic)}
            aria-describedby={fieldErrors.topic ? `${formId}-topic-error` : undefined}
            disabled={status === "loading"}
          >
            <option value="">Select a topic</option>
            {contactTopics.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
          {fieldErrors.topic ? (
            <p id={`${formId}-topic-error`} className="text-sm text-error" role="alert">
              {fieldErrors.topic}
            </p>
          ) : null}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={`${formId}-message`} required>
            Message
          </Label>
          <Textarea
            id={`${formId}-message`}
            name="message"
            required
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? `${formId}-message-error` : undefined}
            disabled={status === "loading"}
          />
          {fieldErrors.message ? (
            <p id={`${formId}-message-error`} className="text-sm text-error" role="alert">
              {fieldErrors.message}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <Checkbox
            id={`${formId}-consent`}
            name="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            error={Boolean(fieldErrors.consent)}
            disabled={status === "loading"}
            label={
              <span>
                I confirm I am 18 or older, that this inquiry relates to adult purchasing or account matters, and I
                consent to {` `}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-navy">
                  processing of my contact details
                </Link>{" "}
                to respond to this message. I am not submitting a child&apos;s personal information.
              </span>
            }
          />
          {fieldErrors.consent ? (
            <p className="mt-2 text-sm text-error" role="alert">
              {fieldErrors.consent}
            </p>
          ) : null}
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send message"}
      </Button>

      {formMessage ? (
        <p
          role={status === "error" ? "alert" : "status"}
          className={`mt-4 text-sm ${status === "error" ? "text-error" : "text-success"}`}
        >
          {formMessage}
        </p>
      ) : null}
    </form>
  );
}

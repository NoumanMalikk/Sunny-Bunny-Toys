"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { filterProducts } from "@/lib/utilities/filters";
import type { PlayStyle } from "@/lib/types/product";
import { SectionHeader } from "@/components/home/decor/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";

type AgeChoice = "3-4" | "5-7" | "8-10" | "10-plus";
type BudgetChoice = "under-25" | "under-50" | "special";

const ageOptions: { value: AgeChoice; label: string; min: number; max: number | null }[] = [
  { value: "3-4", label: "Ages 3-4", min: 3, max: 4 },
  { value: "5-7", label: "Ages 5-7", min: 5, max: 7 },
  { value: "8-10", label: "Ages 8-10", min: 8, max: 10 },
  { value: "10-plus", label: "Ages 10+ & family", min: 10, max: null },
];

const interestOptions: { value: PlayStyle; label: string }[] = [
  { value: "imagine", label: "Imaginative & pretend play" },
  { value: "pretend", label: "Pretend play sets" },
  { value: "construct", label: "Building & construction" },
  { value: "create", label: "Arts & crafts" },
  { value: "think", label: "Puzzles & games" },
  { value: "move", label: "Outdoor & active play" },
];

const budgetOptions: { value: BudgetChoice; label: string; priceMax?: number; priceMin?: number }[] = [
  { value: "under-25", label: "Under $25", priceMax: 24.99 },
  { value: "under-50", label: "Under $50", priceMax: 49.99 },
  { value: "special", label: "Extra-special ($50+)", priceMin: 50 },
];

export function GiftFinder() {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState<AgeChoice | "">("");
  const [interest, setInterest] = useState<PlayStyle | "">("");
  const [budget, setBudget] = useState<BudgetChoice | "">("");

  const matches = useMemo(() => {
    if (!age || !interest || !budget) return [];

    const ageDef = ageOptions.find((a) => a.value === age)!;
    const budgetDef = budgetOptions.find((b) => b.value === budget)!;

    return filterProducts(products, {
      ageMin: ageDef.min,
      ageMax: ageDef.max ?? undefined,
      playStyle: interest,
      priceMin: budgetDef.priceMin,
      priceMax: budgetDef.priceMax,
    }).slice(0, 6);
  }, [age, interest, budget]);

  const steps = ["Choose an age range", "Pick an interest", "Set a budget", "Your matches"];

  return (
    <section aria-labelledby="gift-finder-heading" className="container-store py-16 md:py-20">
      <SectionHeader
        eyebrow="Gift finder"
        title="Find a thoughtful gift"
        description="Choose an age range, a play interest, and a budget. Matches come from the catalogue only, and no personal data is collected."
        align="center"
      />

      <div className="mx-auto max-w-3xl rounded-[var(--radius-editorial)] border border-border bg-cloud p-6 shadow-soft md:p-10">
        <ol className="mb-8 flex flex-wrap justify-center gap-2" aria-label="Gift finder steps">
          {steps.map((label, index) => (
            <li
              key={label}
              className={`rounded-full px-4 py-1.5 font-ui text-xs font-semibold ${
                index === step ? "bg-sunshine text-navy" : index < step ? "bg-mint/20 text-deep-mint" : "bg-soft-gray text-text-secondary"
              }`}
            >
              {index + 1}. {label}
            </li>
          ))}
        </ol>

        {step === 0 && (
          <fieldset className="space-y-4">
            <legend className="sr-only">Age range</legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ageOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setAge(option.value);
                    setStep(1);
                  }}
                  className="rounded-[var(--radius-card)] border-2 border-border bg-soft-gray px-5 py-4 text-left font-ui font-semibold text-navy transition-colors hover:border-sunshine hover:bg-sunshine/10"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && age && (
          <fieldset className="space-y-4">
            <legend className="sr-only">Play interest</legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {interestOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setInterest(option.value);
                    setStep(2);
                  }}
                  className="rounded-[var(--radius-card)] border-2 border-border bg-soft-gray px-5 py-4 text-left font-ui font-semibold text-navy transition-colors hover:border-sunshine hover:bg-sunshine/10"
                >
                  {option.label}
                </button>
              ))}
            </div>
            <Button type="button" variant="ghost" onClick={() => setStep(0)}>
              Back
            </Button>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="space-y-4">
            <legend className="sr-only">Budget</legend>
            <div className="grid grid-cols-1 gap-3">
              {budgetOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setBudget(option.value);
                    setStep(3);
                  }}
                  className="rounded-[var(--radius-card)] border-2 border-border bg-soft-gray px-5 py-4 text-left font-ui font-semibold text-navy transition-colors hover:border-sunshine hover:bg-sunshine/10"
                >
                  {option.label}
                </button>
              ))}
            </div>
            <Button type="button" variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
          </fieldset>
        )}

        {step === 3 && (
          <div>
            {matches.length > 0 ? (
              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
                {matches.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-[var(--radius-card)] bg-soft-gray px-6 py-10 text-center text-text-secondary">
                No exact matches for this combination. Try a different interest or budget, or browse{" "}
                <Link href="/gifts" className="font-semibold text-deep-mint underline-offset-2 hover:underline">
                  all gifts
                </Link>
                .
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Change budget
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setAge("");
                  setInterest("");
                  setBudget("");
                  setStep(0);
                }}
              >
                Start over
              </Button>
              <Button href="/gifts">Browse all gifts</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

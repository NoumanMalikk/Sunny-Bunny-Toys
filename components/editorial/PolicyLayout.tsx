import { cn } from "@/lib/utilities/cn";

type PolicyLayoutProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
  intro?: string;
  className?: string;
};

export function PolicyLayout({ title, lastUpdated, children, intro, className }: PolicyLayoutProps) {
  return (
    <article className={cn("container-store py-12 md:py-16", className)}>
      <header className="mx-auto max-w-3xl">
        <p className="eyebrow mb-3 text-mint">Policy</p>
        <h1 className="font-display text-3xl leading-tight text-navy md:text-4xl">{title}</h1>
        {intro ? (
          <p className="mt-4 text-base leading-relaxed text-text-secondary">{intro}</p>
        ) : null}
        <p className="mt-4 font-ui text-sm text-text-secondary">
          Last updated:{" "}
          <time dateTime={lastUpdated}>{formatPolicyDate(lastUpdated)}</time>
        </p>
      </header>

      <div className="policy-prose mx-auto mt-10 max-w-3xl">{children}</div>
    </article>
  );
}

function formatPolicyDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

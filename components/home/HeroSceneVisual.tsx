import Image from "next/image";
import { cn } from "@/lib/utilities/cn";

export type HeroSceneVisualProps = {
  variant: "imagine" | "build" | "together";
  productSlugs: string[];
  className?: string;
};

const scenes = {
  imagine: {
    wash: "from-[#FFF6E0] via-[#FFE79A] to-[#B8EBD4]",
    orb: "bg-[#FFD457]/55",
    orbTwo: "bg-[#55CFA8]/35",
  },
  build: {
    wash: "from-[#DFF3FC] via-[#F4FAFF] to-[#FFE7A8]",
    orb: "bg-[#79C9F4]/45",
    orbTwo: "bg-[#F5B83D]/35",
  },
  together: {
    wash: "from-[#E9E4FF] via-[#FFF8F3] to-[#FFD3C8]",
    orb: "bg-[#A89AEF]/40",
    orbTwo: "bg-[#FF7968]/30",
  },
} as const;

function ProductShot({
  slug,
  className,
  priority = false,
  sizes,
}: {
  slug: string;
  className?: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.5rem] bg-white shadow-[0_22px_50px_rgba(32,50,71,0.18)] ring-1 ring-black/5",
        className,
      )}
    >
      <Image
        src={`/products/${slug}/main.png`}
        alt=""
        fill
        priority={priority}
        className="object-contain p-5 sm:p-6"
        sizes={sizes}
      />
    </div>
  );
}

export function HeroSceneVisual({ variant, productSlugs, className }: HeroSceneVisualProps) {
  const scene = scenes[variant];
  const [primary, secondary, tertiary] = productSlugs;

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden bg-gradient-to-br", scene.wash, className)}
      aria-hidden="true"
    >
      <div className={cn("pointer-events-none absolute -right-16 -top-8 h-[30rem] w-[30rem] rounded-full blur-3xl", scene.orb)} />
      <div className={cn("pointer-events-none absolute bottom-0 left-[40%] h-72 w-72 rounded-full blur-3xl", scene.orbTwo)} />

      {/* Desktop collage: right half only */}
      <div className="absolute inset-y-0 right-0 hidden w-[50%] items-center justify-center p-8 lg:flex xl:w-[48%] xl:p-12">
        <div className="grid w-full max-w-[32rem] grid-cols-2 gap-4">
          {primary ? (
            <ProductShot
              slug={primary}
              priority
              className="col-span-2 aspect-[5/4]"
              sizes="(max-width: 1280px) 40vw, 28rem"
            />
          ) : null}
          {secondary ? (
            <ProductShot slug={secondary} className="aspect-square" sizes="(max-width: 1280px) 18vw, 14rem" />
          ) : null}
          {tertiary ? (
            <ProductShot slug={tertiary} className="aspect-square" sizes="(max-width: 1280px) 18vw, 14rem" />
          ) : null}
        </div>
      </div>

      {/* Tablet: stacked shots on the right */}
      <div className="absolute inset-y-0 right-0 hidden w-[46%] items-center justify-center p-6 md:flex lg:hidden">
        <div className="flex w-full max-w-sm flex-col gap-3">
          {primary ? (
            <ProductShot slug={primary} priority className="aspect-[4/3] w-full" sizes="40vw" />
          ) : null}
          <div className="grid grid-cols-2 gap-3">
            {secondary ? (
              <ProductShot slug={secondary} className="aspect-square" sizes="20vw" />
            ) : null}
            {tertiary ? (
              <ProductShot slug={tertiary} className="aspect-square" sizes="20vw" />
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile: floating product strip above the fold copy */}
      <div className="absolute inset-x-0 top-16 flex justify-center gap-3 px-5 md:hidden">
        {primary ? (
          <ProductShot slug={primary} priority className="aspect-square w-[38%] max-w-[9.5rem]" sizes="38vw" />
        ) : null}
        {secondary ? (
          <ProductShot slug={secondary} className="mt-6 aspect-square w-[30%] max-w-[7.5rem]" sizes="30vw" />
        ) : null}
        {tertiary ? (
          <ProductShot slug={tertiary} className="mt-2 aspect-square w-[28%] max-w-[7rem]" sizes="28vw" />
        ) : null}
      </div>
    </div>
  );
}

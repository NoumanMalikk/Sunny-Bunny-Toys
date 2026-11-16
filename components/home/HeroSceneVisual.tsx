import Image from "next/image";
import { cn } from "@/lib/utilities/cn";

export type HeroSceneVisualProps = {
  variant: "imagine" | "build" | "together";
  productSlugs: string[];
  className?: string;
};

const scenes = {
  imagine: {
    wash: "from-[#FBF8F2] via-[#F8E7C4] to-[#F6F3EC]",
  },
  build: {
    wash: "from-[#F4F7FA] via-[#E7EEF4] to-[#F6F3EC]",
  },
  together: {
    wash: "from-[#FBF6F4] via-[#F6E4E1] to-[#F6F3EC]",
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
        "relative overflow-hidden rounded-[12px] bg-white shadow-[0_18px_40px_rgba(23,50,77,0.16)] ring-1 ring-black/5",
        className,
      )}
    >
      <Image
        src={`/products/${slug}/main.webp`}
        alt=""
        fill
        priority={priority}
        className="object-contain p-2"
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

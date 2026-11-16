import { cn } from "@/lib/utilities/cn";

type StaticImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

/**
 * Plain img tag. Catalog files are already compressed WebP in /public,
 * so this never calls Vercel's image optimizer.
 */
export function Image({
  src,
  alt,
  className,
  fill = false,
  width,
  height,
  priority = false,
  "aria-hidden": ariaHidden,
}: StaticImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      aria-hidden={ariaHidden}
    />
  );
}

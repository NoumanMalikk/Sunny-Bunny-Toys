import { Skeleton } from "@/components/ui/Skeleton";

export default function StoreLoading() {
  return (
    <div className="container-store py-12 md:py-16" aria-busy="true" aria-label="Loading page">
      <div className="mx-auto max-w-3xl space-y-4">
        <Skeleton className="h-4 w-24" rounded="sm" />
        <Skeleton className="h-10 w-2/3 max-w-md" rounded="md" />
        <Skeleton className="h-5 w-full max-w-xl" rounded="md" />
        <Skeleton className="h-5 w-4/5 max-w-lg" rounded="md" />
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-4">
        <Skeleton className="h-4 w-full" rounded="md" />
        <Skeleton className="h-4 w-full" rounded="md" />
        <Skeleton className="h-4 w-11/12" rounded="md" />
        <Skeleton className="h-4 w-full" rounded="md" />
        <Skeleton className="h-4 w-10/12" rounded="md" />
        <Skeleton className="h-32 w-full" rounded="lg" />
      </div>
    </div>
  );
}

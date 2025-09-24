import { Skeleton } from "@/shared/shadcn/components/ui/skeleton";

export const ProductCardCollapsedSkeleton = () => {
  return (
    <div className="w-full max-w-xl md:w-3/5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Image Skeleton */}
          <Skeleton className="h-16 w-16 rounded-lg sm:h-24 sm:w-24" />
          <div className="min-w-0 space-y-2">
            {/* Title Skeleton */}
            <Skeleton className="h-5 w-48 rounded" />
            <Skeleton className="h-5 w-32 rounded" />
          </div>
        </div>
        <div>
          <div className="flex flex-col items-end gap-1">
            {/* Calories Skeleton */}
            <Skeleton className="h-6 w-12 rounded" />
            {/* "kcal/100g" Skeleton */}
            <Skeleton className="h-4 w-16 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

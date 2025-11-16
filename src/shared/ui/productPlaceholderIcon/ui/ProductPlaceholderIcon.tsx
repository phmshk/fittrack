import { cn } from "@/shared/shadcn/lib/utils";
import { UtensilsCrossed } from "lucide-react";

interface ProductPlaceholderIconProps {
  className?: string;
}

export const ProductPlaceholderIcon = ({
  className,
}: ProductPlaceholderIconProps) => {
  return (
    <div
      className={cn(
        "text-primary flex flex-shrink-0 items-center justify-center rounded-lg bg-[#e9f1ea]",
        className,
      )}
    >
      <UtensilsCrossed className="size-8 sm:size-12" />
    </div>
  );
};

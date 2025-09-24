import type { FoodLog } from "@/entities/day";
import { cn } from "@/shared/shadcn/lib/utils";

interface FoodItemProps {
  food: FoodLog;
  actions?: React.ReactNode;
  className?: string;
}

export const FoodItem = (props: FoodItemProps) => {
  const { food, className, actions } = props;

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-md px-1 py-2",
        className,
      )}
    >
      <div className="flex flex-col">
        <span className="font-medium">{food.name}</span>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm text-secondary-foreground">
            {food.calories} kcal
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
};

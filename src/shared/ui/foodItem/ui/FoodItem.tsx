import type { FoodLog } from "@/entities/day";
import { cn } from "@/shared/shadcn/lib/utils";
import { useTranslation } from "react-i18next";

interface FoodItemProps {
  food: FoodLog;
  actions?: React.ReactNode;
  className?: string;
}

export const FoodItem = (props: FoodItemProps) => {
  const { t } = useTranslation("nutrition");
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
          <span className="text-secondary-foreground text-sm">
            {t("nutrition:units.totalCalories", { count: food.calories })}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
};

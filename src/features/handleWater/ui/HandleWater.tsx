import { Minus, Plus } from "lucide-react";
import { Button } from "@/shared/shadcn/components/ui/button";
import { useTranslation } from "react-i18next";
import { WATER_PORTION_ML } from "@/widgets/waterTracker/ui/WaterTracker";

interface HandleWaterProps {
  currentAmount: number;
  onUpdate: (newAmount: number) => void;
  isPending: boolean;
  waterPortion: number;
  target: number;
}

export const HandleWater = (props: HandleWaterProps) => {
  const { t } = useTranslation(["dashboard", "common", "nutrition"]);

  const { currentAmount, onUpdate, isPending, waterPortion, target } = props;

  const handleUpdate = (newAmount: number) => {
    const finalAmount = Math.max(0, newAmount);
    onUpdate(finalAmount);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          handleUpdate(currentAmount - waterPortion);
        }}
        disabled={isPending || currentAmount <= 0}
        aria-label={t("nutrition:water.decreaseAmount")}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="text-muted-foreground text-sm">
        {currentAmount < target &&
          WATER_PORTION_ML + "" + t("nutrition:units.ml")}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          handleUpdate(currentAmount + waterPortion);
        }}
        disabled={isPending || currentAmount >= target}
        aria-label={t("nutrition:water.increaseAmount")}
      >
        <Plus className="h-4 w-4" />
      </Button>
      <span className="text-muted-foreground text-sm">
        {currentAmount < target
          ? t("dashboard:waterTracker.mlToGo", {
              count: target - currentAmount,
            })
          : t("dashboard:waterTracker.goalReached")}
      </span>
    </div>
  );
};

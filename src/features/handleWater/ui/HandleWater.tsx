import { Minus, Plus } from "lucide-react";
import { formatDateForApi } from "@/shared/lib/utils";
import { useSetWaterLog, type WaterLog } from "@/entities/water";
import { Button } from "@/shared/shadcn/components/ui/button";
import { useTranslation } from "react-i18next";
import { WATER_PORTION_ML } from "@/widgets/waterTracker/ui/WaterTracker";

interface HandleWaterProps {
  waterLog: WaterLog | null | undefined;
  date: Date;
  waterPortion: number;
  target: number;
}

export const HandleWater = (props: HandleWaterProps) => {
  const { t } = useTranslation(["dashboard", "common"]);

  const { waterLog, date, waterPortion, target } = props;
  const { mutate, isPending } = useSetWaterLog();

  const handleUpdate = (newAmount: number) => {
    const finalAmount = Math.max(0, newAmount);
    mutate({
      date: formatDateForApi(date),
      amount: finalAmount,
    });
  };

  const currentAmount = waterLog?.amount || 0;

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          handleUpdate(currentAmount - waterPortion);
        }}
        disabled={isPending || currentAmount <= 0}
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

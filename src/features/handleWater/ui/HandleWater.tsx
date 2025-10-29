import { useAddWaterLog, useUpdateWaterLog } from "@/entities/water";
import { Minus, Plus } from "lucide-react";
import { formatDateForApi } from "@/shared/lib/utils";
import type { WaterLog } from "@/entities/water";
import { Button } from "@/shared/shadcn/components/ui/button";
import { useTranslation } from "react-i18next";

interface HandleWaterProps {
  waterLog: WaterLog | null | undefined;
  date: Date;
  waterPortion: number;
  target: number;
  onClick: (value: React.SetStateAction<number>) => void;
}

export const HandleWater = (props: HandleWaterProps) => {
  const { t } = useTranslation(["dashboard", "common"]);

  const { waterLog, date, waterPortion, target, onClick } = props;
  const addMutation = useAddWaterLog();
  const updateMutation = useUpdateWaterLog();
  const isPending = addMutation.isPending || updateMutation.isPending;

  const handleUpdate = (newAmount: number) => {
    if (waterLog) {
      updateMutation.mutate({
        id: waterLog.id,
        amount: newAmount,
        date: formatDateForApi(date),
      });
    } else {
      addMutation.mutate({
        date: formatDateForApi(date),
        amount: newAmount,
      });
    }
  };

  const currentAmount = waterLog?.amount || 0;

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          handleUpdate(currentAmount - waterPortion);
          onClick((prev) => prev - 1);
        }}
        disabled={isPending || currentAmount <= 0}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          handleUpdate(currentAmount + waterPortion);
          onClick((prev) => prev + 1);
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

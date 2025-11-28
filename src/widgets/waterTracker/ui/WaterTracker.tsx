import { useGetWaterByDate, useSetWaterLog } from "@/entities/water";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { Spinner } from "@/shared/ui/spinner";
import { WaterWithIcons } from "./WaterWithIcons";
import { HandleWater } from "@/features/handleWater";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/lib";
import { formatDateForApi } from "@/shared/lib/utils";

interface WaterTrackerProps {
  date: Date;
  targetWaterIntake: number;
}

export const WATER_PORTION_ML = 250;

export const WaterTracker = (props: WaterTrackerProps) => {
  const { t } = useTranslation("dashboard");
  const { date, targetWaterIntake } = props;

  const { data: waterLog, isLoading: isLoadingWaterLog } =
    useGetWaterByDate(date);

  const { mutate, isPending } = useSetWaterLog();

  const [localAmount, setLocalAmount] = useState<number | null>(null);
  const debouncedAmount = useDebounce(localAmount, 5000);

  // Sync local amount with fetched data
  useEffect(() => {
    if (!isLoadingWaterLog) {
      setLocalAmount(waterLog?.amount ?? 0);
    }
  }, [waterLog, isLoadingWaterLog]);

  // Update water log when debounced amount changes
  useEffect(() => {
    if (debouncedAmount === null || isLoadingWaterLog) return;

    const serverAmount = waterLog?.amount ?? 0;

    if (debouncedAmount === serverAmount) {
      return;
    }
    mutate({ date: formatDateForApi(date), amount: debouncedAmount });
  }, [debouncedAmount, date, mutate, waterLog, isLoadingWaterLog]);

  const targetWater = targetWaterIntake;
  const safeLocalAmount = localAmount ?? 0;
  const currentAmountForIcons = safeLocalAmount / WATER_PORTION_ML;

  const handleUpdate = (newAmount: number) => {
    const finalAmount = Math.max(0, newAmount);
    setLocalAmount(finalAmount);
  };

  if (isLoadingWaterLog) {
    return (
      <Card className="border-none">
        <CardContent className="flex h-48 items-center justify-center">
          <Spinner />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>{t("dashboard:waterTracker.title")}</CardTitle>
        <CardDescription>
          {t("dashboard:waterTracker.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col justify-center gap-2 pt-2">
          <WaterWithIcons
            target={targetWater}
            numberOfItems={currentAmountForIcons}
          />

          <div className="mt-4 flex items-center justify-center gap-4">
            <HandleWater
              currentAmount={safeLocalAmount}
              onUpdate={handleUpdate}
              isPending={isPending}
              waterPortion={WATER_PORTION_ML}
              target={targetWater}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

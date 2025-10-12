import { useGetUserData } from "@/entities/user";
import { useGetWaterByDate } from "@/entities/water";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { Spinner } from "@/shared/ui/spinner";
import { useState } from "react";
import { WaterWithIcons } from "./WaterWithIcons";
import { HandleWater } from "@/features/handleWater";

interface WaterTrackerProps {
  date: Date;
}

const WATER_PORTION_ML = 250;

export const WaterTracker = ({ date }: WaterTrackerProps) => {
  const { data: user, isLoading: isLoadingUser } = useGetUserData();
  const { data: waterLog, isLoading: isLoadingWater } = useGetWaterByDate(date);

  const isLoading = isLoadingUser || isLoadingWater;

  const targetWater = user?.dailyTargets?.targetWaterIntake || 2000;
  const currentWater = waterLog?.amount || 0;
  const [currentAmount, setCurrentAmount] = useState(currentWater / 250);

  if (isLoading) {
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
        <CardTitle>Water Intake</CardTitle>
        <CardDescription>
          Stay hydrated to support your health and fitness goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col justify-center gap-2 pt-2">
          <WaterWithIcons
            target={targetWater}
            numberOfItems={currentAmount}
            setIconsAmount={setCurrentAmount}
          />

          <div className="mt-4 flex items-center justify-center gap-4">
            <HandleWater
              waterLog={waterLog}
              date={date}
              waterPortion={WATER_PORTION_ML}
              target={targetWater}
              onClick={setCurrentAmount}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

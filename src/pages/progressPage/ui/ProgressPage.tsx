import { useGetFoodsByDate } from "@/entities/day";
import { useGetUserData } from "@/entities/user";
import { useDaySummary } from "@/features/getDaySummary";
import { useDateStore } from "@/shared/model";
import { Container } from "@/shared/ui/container";
import { H1 } from "@/shared/ui/headings";
import { Spinner } from "@/shared/ui/spinner";
import { DayNavigator } from "@/widgets/dayNavigator";
import { MacronutrientsChart } from "@/widgets/macronutrientsSummary";
import { WeightHistory } from "@/widgets/weightHistory";

export const ProgressPage = () => {
  const { data: user, isLoading: isLoadingUser } = useGetUserData();
  const weightHistory = user?.weightHistory || [];
  const selectedDate = useDateStore((state) => state.selectedDate);
  const setSelectedDate = useDateStore((state) => state.setSelectedDate);
  const { data: foodLogs, isLoading: isLoadingLogs } =
    useGetFoodsByDate(selectedDate);
  const summary = useDaySummary(foodLogs, user?.dailyTargets);

  const isLoading = isLoadingUser || isLoadingLogs;

  if (isLoading || !user) {
    return (
      <Container className="items-center justify-center">
        <Spinner text="Loading your progress..." />
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-6">
        <H1>Progress</H1>
        <p className="text-muted-foreground">
          Track and manage your weight and nutrition over time.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WeightHistory weightHistory={weightHistory} />
        <div>
          <DayNavigator date={selectedDate} onDateChange={setSelectedDate} />
          <div className="mt-6">
            <MacronutrientsChart daySummary={summary} />
          </div>
        </div>
      </div>
    </Container>
  );
};

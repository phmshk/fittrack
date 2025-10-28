import { DayNavigator } from "@/widgets/dayNavigator";
import { H1 } from "@/shared/ui/headings";
import { H2 } from "@/shared/ui/headings";
import { Meals } from "@/widgets/meals";
import { MacronutrientsSummary } from "@/widgets/macronutrientsSummary";
import { useGetFoodsByDate } from "@/entities/day";
import { ProgressBar } from "@/shared/ui/progressBar";
import { useDaySummary } from "@/features/getDaySummary";
import { useDateStore } from "@/shared/model";
import { Container } from "@/shared/ui/container";
import { useGetUserData } from "@/entities/user";
import { Spinner } from "@/shared/ui/spinner";

export const DiaryPage = () => {
  const selectedDate = useDateStore((state) => state.selectedDate);
  const setSelectedDate = useDateStore((state) => state.setSelectedDate);

  const { data: foodLogs, isLoading: isLoadingLogs } =
    useGetFoodsByDate(selectedDate);
  const { data: userData, isLoading: isLoadingGoals } = useGetUserData();
  const summary = useDaySummary(foodLogs, userData?.dailyTargets);
  const dailyTargets = userData?.dailyTargets;
  const isLoading = isLoadingLogs || isLoadingGoals;

  if (isLoading) {
    return <Spinner text="Loading data..." />;
  }

  return (
    <Container>
      <div className="mb-6">
        <H1>Diary</H1>
        <p className="text-muted-foreground">
          Track your nutrition and calories.
        </p>
      </div>
      <DayNavigator date={selectedDate} onDateChange={setSelectedDate} />

      <H2>Calories</H2>
      <ProgressBar
        currentValue={summary.consumedCalories}
        goalValue={userData?.dailyTargets?.targetCalories || 0}
        label="Calories"
        units="kcal"
      />

      {dailyTargets ? (
        <MacronutrientsSummary
          userGoals={dailyTargets}
          summary={summary}
          isLoading={isLoading}
        />
      ) : (
        <div>No macronutrient summary available</div>
      )}

      {foodLogs ? (
        <Meals
          foodLogs={foodLogs}
          isLoading={isLoading}
          date={selectedDate}
          variant="full"
        />
      ) : (
        <div>No food logs available</div>
      )}
    </Container>
  );
};

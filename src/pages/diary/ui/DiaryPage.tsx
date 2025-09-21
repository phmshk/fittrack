import { DayNavigator } from "@/widgets/dayNavigator";
import { H1 } from "@/shared/ui/headings";
import { useState } from "react";
import { H2 } from "@/shared/ui/headings";
import { Meals } from "@/widgets/meals";
import { MacronutrientsSummary } from "@/widgets/macronutrientsSummary";
import { useGetFoodsByDate, useDaySummary } from "@/entities/day";
import { useGetUserGoals } from "@/entities/user";
import { ProgressBar } from "@/shared/ui/progressBar";

export const DiaryPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data: foodLogs, isLoading: isLoadingLogs } =
    useGetFoodsByDate(currentDate);
  const { data: userGoals, isLoading: isLoadingGoals } = useGetUserGoals();
  const summary = useDaySummary(foodLogs, userGoals);
  const isLoading = isLoadingLogs || isLoadingGoals;

  return (
    <section className="container mx-auto flex max-w-6xl flex-col gap-4 p-4 md:gap-6">
      <H1>Diary</H1>
      <span className="text-secondary-foreground">
        Track your nutrition and calories.
      </span>
      <DayNavigator date={currentDate} onDateChange={setCurrentDate} />

      <H2>Calories</H2>
      <ProgressBar
        currentValue={summary.consumedCalories}
        goalValue={userGoals?.targetCalories || 0}
        label="Calories"
        units="kcal"
      />

      <MacronutrientsSummary
        userGoals={userGoals!}
        summary={summary}
        isLoading={isLoading}
      />

      <Meals foodLogs={foodLogs} isLoading={isLoading} date={currentDate} />
    </section>
  );
};

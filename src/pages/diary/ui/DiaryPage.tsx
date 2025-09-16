import { DayNavigator } from "@/widgets/dayNavigator";
import { H1 } from "@/shared/ui/headings";
import { useState } from "react";
import { H2 } from "@/shared/ui/headings";
import { MacronutrientsSummary } from "@/widgets/macronutrientsSummary";
import { ProgressBar } from "@/shared/ui/progressBar";
import { selectCaloriesProgress, useDayStore } from "@/entities/day";
import { Meals } from "@/widgets/meals";

export const DiaryPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const calorieGoal = useDayStore(selectCaloriesProgress);

  return (
    <section className="container mx-auto flex max-w-6xl flex-col gap-4 p-4 md:gap-6">
      <H1>Diary</H1>
      <span className="text-secondary-foreground">
        Track your nutrition and calories.
      </span>
      <DayNavigator date={currentDate} onDateChange={setCurrentDate} />
      <H2>Calories</H2>
      <ProgressBar
        label="Calories"
        currentValue={calorieGoal.current}
        goalValue={calorieGoal.goal}
        units="kcal"
      />
      <MacronutrientsSummary />
      <Meals date={currentDate} />
    </section>
  );
};

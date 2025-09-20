import { DayNavigator } from "@/widgets/dayNavigator";
import { H1 } from "@/shared/ui/headings";
import { useState } from "react";
import { H2 } from "@/shared/ui/headings";
import { Meals } from "@/widgets/meals";
import { MacronutrientsSummary } from "@/widgets/macronutrientsSummary";

export const DiaryPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <section className="container mx-auto flex max-w-6xl flex-col gap-4 p-4 md:gap-6">
      <H1>Diary</H1>
      <span className="text-secondary-foreground">
        Track your nutrition and calories.
      </span>
      <MacronutrientsSummary date={currentDate} />
      <DayNavigator date={currentDate} onDateChange={setCurrentDate} />
      <H2>Calories</H2>
      <Meals date={currentDate} />
    </section>
  );
};

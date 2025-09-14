import { AddFood } from "@/features/addFood";
import { CaloriesCard } from "@/widgets/caloriesCard";
import { H1 } from "@/shared/ui/headings";
import { MacronutrientsSummary } from "@/widgets/macronutrientsSummary";
import { Meals } from "@/widgets/meals";
import { useState } from "react";

export const Dashboard = () => {
  const locale = "en-US";
  const [date] = useState(new Date());

  return (
    <section className="flex flex-col gap-4 p-4 md:gap-6">
      {/* Page heading. Date display */}
      <H1>
        Today,{" "}
        {date.toLocaleDateString(locale, { day: "numeric", month: "long" })}
      </H1>
      {/* Calories summary card */}
      <CaloriesCard />

      {/* Macronutrients summary */}
      <MacronutrientsSummary />

      {/* Meals summary */}
      <Meals />

      {/* Add food form */}
      <AddFood triggerButtonProps={{ children: "Add Food" }} />
    </section>
  );
};

import { AddFood } from "@/features/addFood";
import { CaloriesCard } from "@/widgets/caloriesCard";
import { H1 } from "@/shared/ui/headings";
import { MacronutrientsSummary } from "@/widgets/macronutrientsSummary";
import { Meals } from "@/widgets/meals";
import { useDayStore } from "@/entities/day";

export const DashboardPage = () => {
  const date = useDayStore((state) => state.date);

  return (
    <section className="container mx-auto flex max-w-6xl flex-col gap-4 p-4 md:gap-6">
      {/* Page heading. Date display */}
      <H1>Today, {date}</H1>
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

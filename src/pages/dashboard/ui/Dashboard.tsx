import { CaloriesCard } from "@/shared/ui/caloriesCard";
import { H1 } from "@/shared/ui/headings";
import { ProgressBar } from "@/shared/ui/progressBar";
import { MacronutrientsSummary } from "@/widgets/macronutrientsSummary";
import { Meals } from "@/widgets/meals";
import { useState } from "react";

export const Dashboard = () => {
  const locale = "en-US";
  const [date] = useState(new Date());

  const macronutrientsData = [
    { name: "Proteins", current: 50, goal: 150, units: "g" },
    { name: "Carbohydrates", current: 200, goal: 300, units: "g" },
    { name: "Fats", current: 70, goal: 80, units: "g" },
  ];

  // Example static data for meals and foods
  const mealsData = [
    {
      name: "Breakfast",
      foods: [
        { id: 1, name: "Oatmeal", grams: 150, calories: 210 },
        { id: 2, name: "Apple", grams: 100, calories: 52 },
      ],
    },
    {
      name: "Lunch",
      foods: [
        { id: 3, name: "Chicken Breast", grams: 200, calories: 330 },
        { id: 4, name: "Buckwheat", grams: 100, calories: 130 },
        { id: 5, name: "Vegetable Salad", grams: 150, calories: 80 },
      ],
    },
    {
      name: "Dinner",
      foods: [],
    },
    {
      name: "Snacks",
      foods: [{ id: 6, name: "Walnuts", grams: 30, calories: 200 }],
    },
  ];

  return (
    <section className="flex flex-col gap-4 p-4 md:gap-6">
      {/* Page heading. Date display */}
      <H1>
        Today,{" "}
        {date.toLocaleDateString(locale, { day: "numeric", month: "long" })}
      </H1>
      <CaloriesCard />
      <ProgressBar
        currentValue={20}
        goalValue={100}
        label="Remaining Calories"
        units="kcal"
      />

      {/* Macronutrients summary */}
      <MacronutrientsSummary macronutrients={macronutrientsData} />

      {/* Meals summary */}
      <Meals mealsData={mealsData} />
    </section>
  );
};

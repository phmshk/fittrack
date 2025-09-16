import { useDayStore, type MealType } from "@/entities/day";
import { H2 } from "@/shared/ui/headings";
import { useMemo } from "react";
import { MealCard } from "@/entities/mealCard";
import { MEAL_IMAGES, MEAL_ORDER } from "../model/types";

export const Meals = () => {
  const mealsData = useDayStore((state) => state.meals);

  const mealsArray = useMemo(() => {
    return MEAL_ORDER.map((mealName) => {
      const foods = mealsData[mealName] || [];
      const totalCalories = foods.reduce((acc, food) => acc + food.calories, 0);

      return {
        name: mealName.charAt(0).toUpperCase() + mealName.slice(1),
        foods,
        totalCalories,
      };
    });
  }, [mealsData]);

  return (
    <div>
      <H2>Meals</H2>
      <div className="mt-6 grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2">
        {mealsArray.map((meal) => (
          <MealCard
            key={meal.name}
            mealType={meal.name}
            foods={meal.foods}
            totalCalories={meal.totalCalories}
            imageUrl={MEAL_IMAGES[meal.name.toLowerCase() as MealType]}
          />
        ))}
      </div>
    </div>
  );
};

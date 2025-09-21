import { type FoodLog, type MealType } from "@/entities/day";
import { H2 } from "@/shared/ui/headings";
import { useMemo } from "react";
import { MealCard } from "@/entities/mealCard";
import { MEAL_IMAGES, MEAL_ORDER, MEAL_TITLES } from "../model/types";
import { Spinner } from "@/shared/ui/spinner";

interface MealsProps {
  foodLogs: FoodLog[] | undefined;
  isLoading: boolean;
  date: Date;
}

export const Meals = (props: MealsProps) => {
  const { foodLogs, isLoading, date } = props;

  const mealsData = useMemo(() => {
    if (!foodLogs || foodLogs.length === 0) {
      return MEAL_ORDER.map((mealType) => ({
        mealType,
        foods: [],
        totalCalories: 0,
      }));
    }
    return MEAL_ORDER.map((mealType) => {
      const foodsForMeal = foodLogs.filter((log) => log.mealType === mealType);
      const totalCalories = foodsForMeal.reduce(
        (acc, food) => acc + food.calories,
        0,
      );
      return {
        mealType,
        foods: foodsForMeal,
        totalCalories,
      };
    });
  }, [foodLogs]);

  if (isLoading) {
    return <Spinner text="Loading..." className="h-64" />;
  }

  return (
    <div>
      <H2>Meals</H2>
      <div className="mt-6 grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2">
        {mealsData.map((meal) => (
          <MealCard
            date={date}
            key={meal.mealType}
            mealType={MEAL_TITLES[meal.mealType]}
            foods={meal.foods}
            totalCalories={meal.totalCalories}
            imageUrl={MEAL_IMAGES[meal.mealType.toLowerCase() as MealType]}
          />
        ))}
      </div>
    </div>
  );
};

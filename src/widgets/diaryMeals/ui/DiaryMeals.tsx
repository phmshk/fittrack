import { useDayStore, type MealType } from "@/entities/day";
import { H2 } from "@/shared/ui/headings";
import { useMemo } from "react";

import breakfastImg from "@/shared/assets/img/breakfast_img.png";
import lunchImg from "@/shared/assets/img/lunch_img.png";
import dinnerImg from "@/shared/assets/img/dinner_img.png";
import snacksImg from "@/shared/assets/img/snacks_img.png";
import { MealCard } from "@/entities/mealCard";

const MEAL_IMAGES: Record<MealType, string> = {
  breakfast: breakfastImg,
  lunch: lunchImg,
  dinner: dinnerImg,
  snacks: snacksImg,
};

export const DiaryMeals = () => {
  const mealsData = useDayStore((state) => state.meals);
  const mealsArray = useMemo(() => {
    return Object.entries(mealsData).map(([mealName, foods]) => {
      const totalCalories = foods.reduce((acc, food) => acc + food.calories, 0);

      return {
        name: mealName.charAt(0).toUpperCase() + mealName.slice(1),
        foods,
        totalCalories,
      };
    });
  }, [mealsData]);

  return (
    <div className="flex flex-col gap-4">
      <H2>Meals</H2>
      <div className="mx-auto grid grid-cols-1 gap-4 md:mx-0 md:grid-cols-2">
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

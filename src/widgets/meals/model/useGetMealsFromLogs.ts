import type { FoodLog } from "@/entities/day";
import { useMemo } from "react";
import { MEAL_ORDER } from "./types";

export const useGetMealsFromLogs = (foodLogs: FoodLog[]) => {
  return useMemo(() => {
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
};

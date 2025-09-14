import { memoize } from "@/shared/utils";
import type { DayState } from "./types";

/**
 * Selects the total nutrients consumed for the day.
 * @param state The current state of the day.
 * @returns An object containing the total calories, proteins, carbs, and fats consumed.
 */
const calculateEatenNutrients = (state: DayState) => {
  const allMeals = Object.values(state.meals).flat();
  return allMeals.reduce(
    (acc, food) => {
      acc.calories += food.calories;
      acc.proteins += food.proteins;
      acc.carbs += food.carbs;
      acc.fats += food.fats;
      return acc;
    },
    { calories: 0, proteins: 0, carbs: 0, fats: 0 },
  );
};

// Memoized version to avoid unnecessary recalculations
export const selectEatenNutrients = memoize(calculateEatenNutrients);

/**
 * Selects the remaining calories for the day.
 * @param state The current state of the day.
 * @returns The remaining calories for the day.
 */
export const selectRemainingCalories = (state: DayState) => {
  const eaten = selectEatenNutrients(state).calories;
  return state.userGoals.calorieGoal - eaten + state.exerciseCalories;
};

/**
 * Selects the protein progress for the day.
 * Memoized to prevent unnecessary recalculations.
 * @param state The current state of the day.
 * @returns An object containing the current, goal, and remaining protein values.
 */
export const selectProteinsProgress = memoize((state: DayState) => {
  const eaten = selectEatenNutrients(state).proteins;
  return {
    current: eaten,
    goal: state.userGoals.proteinGoal,
    remaining: state.userGoals.proteinGoal - eaten,
  };
});

/**
 * Selects the fat progress for the day.
 * Memoized to prevent unnecessary recalculations.
 * @param state The current state of the day.
 * @returns An object containing the current, goal, and remaining fat values.
 */
export const selectFatsProgress = memoize((state: DayState) => {
  const eaten = selectEatenNutrients(state).fats;
  return {
    current: eaten,
    goal: state.userGoals.fatGoal,
    remaining: state.userGoals.fatGoal - eaten,
  };
});

/**
 * Selects the carb progress for the day.
 * Memoized to prevent unnecessary recalculations.
 * @param state The current state of the day.
 * @returns An object containing the current, goal, and remaining carb values.
 */
export const selectCarbsProgress = memoize((state: DayState) => {
  const eaten = selectEatenNutrients(state).carbs;
  return {
    current: eaten,
    goal: state.userGoals.carbGoal,
    remaining: state.userGoals.carbGoal - eaten,
  };
});

/**
 * Selects the calorie progress for the day.
 * Memoized to prevent unnecessary recalculations.
 * @param state The current state of the day.
 * @returns An object containing the current, goal, and remaining calorie values.
 */
export const selectCaloriesProgress = memoize((state: DayState) => {
  const eaten = selectEatenNutrients(state).calories;
  return {
    current: eaten,
    goal: state.userGoals.calorieGoal,
    remaining: state.userGoals.calorieGoal - eaten + state.exerciseCalories,
  };
});

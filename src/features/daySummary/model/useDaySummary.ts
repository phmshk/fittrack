import { useMemo } from "react";
import type { UserGoals } from "@/entities/user";
import type { DaySummary, FoodLog } from "@/entities/day";

/**
 * Custom hook for calculating daily summary of food intake against user goals.
 * @param foodLogs - Array of food logs for the day.
 * @param goals - User goals for calories and macronutrients.
 * @returns {DaySummary} - Object with calculated values.
 */
export const useDaySummary = (
  foodLogs: FoodLog[] | undefined,
  goals: UserGoals | undefined,
): DaySummary => {
  const summary = useMemo(() => {
    //Initial values for the summary
    const initialSummary = {
      consumedCalories: 0,
      consumedProteins: 0,
      consumedFats: 0,
      consumedCarbs: 0,
    };

    if (!foodLogs) {
      return initialSummary;
    }
    // Summing up the consumed values from food logs
    return foodLogs.reduce((acc, log) => {
      acc.consumedCalories += log.calories || 0;
      acc.consumedProteins += log.proteins || 0;
      acc.consumedFats += log.fats || 0;
      acc.consumedCarbs += log.carbs || 0;
      return acc;
    }, initialSummary);
  }, [foodLogs]);

  return useMemo(() => {
    const { consumedCalories, consumedProteins, consumedFats, consumedCarbs } =
      summary;

    // Values from user goals
    const targetCalories = goals?.targetCalories || 0;
    const targetProteins = goals?.targetProteins || 0;
    const targetFats = goals?.targetFats || 0;
    const targetCarbs = goals?.targetCarbs || 0;

    return {
      ...summary,
      remainingCalories: targetCalories - consumedCalories,
      remainingProteins: targetProteins - consumedProteins,
      remainingFats: targetFats - consumedFats,
      remainingCarbs: targetCarbs - consumedCarbs,

      caloriesProgress:
        targetCalories > 0
          ? Number(((consumedCalories / targetCalories) * 100).toFixed(1))
          : consumedCalories,
      proteinsProgress:
        targetProteins > 0
          ? Number(((consumedProteins / targetProteins) * 100).toFixed(1))
          : consumedProteins,
      fatsProgress:
        targetFats > 0
          ? Number(((consumedFats / targetFats) * 100).toFixed(1))
          : consumedFats,
      carbsProgress:
        targetCarbs > 0
          ? Number(((consumedCarbs / targetCarbs) * 100).toFixed(1))
          : consumedCarbs,
    };
  }, [summary, goals]);
};

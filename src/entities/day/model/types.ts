import type { ApiComponents } from "@/shared/api/schema";

export type MealType = ApiComponents["schemas"]["FoodLog"]["mealType"];
export type FoodLog = ApiComponents["schemas"]["FoodLog"];
export type FoodLogInput = ApiComponents["schemas"]["FoodLogInput"];

export const MEALS: Record<string, MealType> = {
  Breakfast: "breakfast",
  Lunch: "lunch",
  Dinner: "dinner",
  Snacks: "snacks",
} as const;

export interface DaySummary {
  consumedCalories: number;
  consumedProteins: number;
  consumedFats: number;
  consumedSaturatedFats?: number;
  consumedCarbs: number;
  consumedSugars?: number;
  remainingCalories: number;
  remainingProteins: number;
  remainingFats: number;
  remainingCarbs: number;
  caloriesProgress: number;
  proteinsProgress: number;
  fatsProgress: number;
  carbsProgress: number;
}

import type { FoodLog, FoodLogInput } from "../model/types";
import type { FormOutput } from "../model/zodFoodSchema";

export const zodInputToFoodLogInput = (data: FormOutput): FoodLogInput => ({
  date: data.date,
  mealType: data.mealType,
  name: data.name,
  calories: Number(data.calories),
  proteins: Number(data.proteins) || 0,
  carbs: Number(data.carbs) || 0,
  fats: Number(data.fats) || 0,
  grams: Number(data.grams) || 100,
});

export const foodLogToZodInput = (data: FoodLog): FormOutput => ({
  date: data.date,
  mealType: data.mealType,
  name: data.name,
  calories: data.calories.toString(),
  proteins: data.proteins.toString(),
  carbs: data.carbs.toString(),
  fats: data.fats.toString(),
  grams: data.grams.toString(),
});

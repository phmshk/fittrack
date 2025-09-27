import type { FoodLog, FoodLogInput } from "../model/types";
import type { FormOutput } from "../model/zodFoodSchema";

export const zodInputToFoodLogInput = (data: FormOutput): FoodLogInput => ({
  date: data.date,
  mealType: data.mealType,
  name: data.name,
  calories: Number(data.calories),
  proteins: Number(data.proteins) || 0,
  carbs: Number(data.carbs) || 0,
  sugars: Number(data.sugars) || 0,
  fats: Number(data.fats) || 0,
  saturatedFats: Number(data.saturatedFats) || 0,
  grams: Number(data.grams) || 100,
});

export const foodLogToZodInput = (data: FoodLog): FormOutput => ({
  date: data.date,
  mealType: data.mealType,
  name: data.name,
  calories: data.calories.toString(),
  proteins: data.proteins.toString(),
  carbs: data.carbs.toString(),
  sugars: data.sugars.toString(),
  fats: data.fats.toString(),
  saturatedFats: data.saturatedFats.toString(),
  grams: data.grams.toString(),
});

export const calculateFinalNutrientsValues = (
  data: FormOutput,
): FoodLogInput => {
  const convertedData = zodInputToFoodLogInput(data);

  const factor = convertedData.grams / 100;

  return {
    ...convertedData,
    calories: Math.round(convertedData.calories * factor),
    proteins: Number((convertedData.proteins * factor).toFixed(1)),
    carbs: Number((convertedData.carbs * factor).toFixed(1)),
    fats: Number((convertedData.fats * factor).toFixed(1)),
    saturatedFats: Number((convertedData.saturatedFats * factor).toFixed(1)),
    sugars: Number((convertedData.sugars * factor).toFixed(1)),
  };
};

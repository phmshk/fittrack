import type { BaseFormProps } from "./formTypes";
import type { FormOutput } from "./zodSchema";

export const FORM_INPUT_ITEMS: Omit<BaseFormProps<FormOutput>, "control">[] = [
  {
    name: "name",
    label: "Food Name",
    placeholder: "e.g., Apple",
    srOnly: "Enter the name of the food item.",
  },
  {
    name: "calories",
    label: "Calories (kcal) in 100g serving",
    placeholder: "Mandatory field",
    srOnly: "Enter the number of calories.",
  },
  {
    name: "proteins",
    label: "Proteins (g) in 100g serving",
    placeholder: "Default is 0g",
    srOnly: "Enter the amount of proteins in grams.",
  },
  {
    name: "carbs",
    label: "Carbohydrates (g) in 100g serving",
    placeholder: "Default is 0g",
    srOnly: "Enter the amount of carbohydrates in grams.",
  },
  {
    name: "fats",
    label: "Fats (g) in 100g serving",
    placeholder: "Default is 0g",
    srOnly: "Enter the amount of fats in grams.",
  },
  {
    name: "grams",
    label: "Grams (g)",
    placeholder: "Default is 100g",
    srOnly: "Enter the weight of food in grams.",
  },
];

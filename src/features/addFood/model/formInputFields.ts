import type { FormInputProps } from "../ui/FormInput";
import type { FormOutput } from "./zodSchema";

type FormInputItem = Omit<FormInputProps<FormOutput>, "control">;

export const FORM_INPUT_ITEMS: FormInputItem[] = [
  {
    name: "foodName",
    label: "Food Name",
    placeholder: "e.g., Apple",
    srOnly: "Enter the name of the food item.",
  },
  {
    name: "calories",
    label: "Calories (kcal)",
    placeholder: "Mandatory field",
    srOnly: "Enter the number of calories.",
  },
  {
    name: "proteins",
    label: "Proteins (g)",
    placeholder: "0",
    srOnly: "Enter the amount of proteins in grams.",
  },
  {
    name: "carbs",
    label: "Carbohydrates (g)",
    placeholder: "0",
    srOnly: "Enter the amount of carbohydrates in grams.",
  },
  {
    name: "fats",
    label: "Fats (g)",
    placeholder: "0",
    srOnly: "Enter the amount of fats in grams.",
  },
  {
    name: "grams",
    label: "Grams (g)",
    placeholder: "100",
    srOnly: "Enter the weight of food in grams.",
  },
];

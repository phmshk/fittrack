import { z } from "zod";

const numericString = (errorMessage: string) =>
  z
    .string()
    .min(1, { message: errorMessage })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Must be a positive number",
    });

export const nutriGoalsSchema = z.object({
  calories: numericString("Calories goal is required."),
  proteins: numericString("Proteins goal is required."),
  fats: numericString("Fats goal is required."),
  carbohydrates: numericString("Carbohydrates goal is required."),
  water: numericString("Water intake goal is required."),
});

export type NutriGoalsFormValues = z.infer<typeof nutriGoalsSchema>;

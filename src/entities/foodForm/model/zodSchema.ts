import { MEALS } from "@/entities/day";
import { z } from "zod";

const positiveNumberCheck = (fieldName: string) =>
  z.string().refine(
    (val) => {
      const parsed = Number(val);
      return !isNaN(parsed) && parsed >= 0;
    },
    {
      message: `${fieldName} must be a positive number.`,
    },
  );

export const formSchema = z
  .object({
    mealType: z.enum(Object.values(MEALS), {
      error: "Please select a meal type.",
    }),
    name: z.string().min(1, {
      message: "Name of food can not be empty.",
    }),
    calories: z
      .string()
      .min(1, {
        message: "Calories is a mandatory field.",
      })
      .pipe(positiveNumberCheck("Calories")),
    proteins: z.string().pipe(positiveNumberCheck("Proteins")),
    carbs: z.string().pipe(positiveNumberCheck("Carbs")),
    fats: z.string().pipe(positiveNumberCheck("Fats")),
    grams: z.string().pipe(positiveNumberCheck("Grams")),
    date: z.string(),
  })
  .refine((data) => !!data.mealType, {
    message: "Please select a meal type.",
    path: ["mealType"],
  });

export type FormOutput = z.infer<typeof formSchema>;

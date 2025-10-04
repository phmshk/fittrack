import z from "zod";
import { activityLevels, goals } from "./types";

const numericString = (errorMessage: string) =>
  z
    .string()
    .min(1, { message: errorMessage })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Must be a positive number",
    });

export const formSchema = z.object({
  // Step 1
  gender: z.enum(["male", "female"], {
    error: "Gender is required for correct calculation.",
  }),
  age: numericString("Age is required."),
  height: numericString("Height is required."),
  weight: numericString("Weight is required."),

  // Step 2
  activityLevel: z.enum(
    activityLevels.map((level) => level.value) as [string, ...string[]],
    {
      error: "Activity level is required for correct calculation.",
    },
  ),

  // Step 3
  goal: z.enum(
    goals.map((goal) => goal.value),
    {
      error: "Goal is required for correct calculation.",
    },
  ),

  // Step 4 - Readonly fields to display results
  targetCalories: numericString("Target calories is required."),
  targetProteins: numericString("Target proteins is required."),
  targetCarbs: numericString("Target carbs is required."),
  targetFats: numericString("Target fats is required."),
  targetWaterIntake: numericString("Target water intake is required."),
});

export type UserProfileFormValues = z.infer<typeof formSchema>;

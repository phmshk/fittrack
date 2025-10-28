import { ACTIVITY_LEVELS_IDS, GOALS_IDS, type Gender } from "@/entities/user";
import z from "zod";

const numericString = (errorMessage: string) =>
  z
    .string()
    .min(1, { message: errorMessage })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Must be a positive number",
    });

export const formSchema = z.object({
  // Step 1
  gender: z
    .union([z.enum(["male", "female"]), z.literal("")])
    .refine((val) => val !== "", { error: "Gender is required" })
    .transform((val) => val as Gender),
  age: numericString("Age is required."),
  height: numericString("Height is required."),
  weight: numericString("Weight is required."),

  // Step 2
  activityLevel: z
    .union([z.enum(ACTIVITY_LEVELS_IDS), z.literal("")])
    .refine((val) => val !== "", { error: "Activity level is required" })
    .transform((val) => val as (typeof ACTIVITY_LEVELS_IDS)[number]),

  // Step 3
  goal: z
    .union([z.enum(GOALS_IDS), z.literal("")])
    .refine((val) => val !== "", { error: "Goal is required" })
    .transform((val) => val as (typeof GOALS_IDS)[number]),
});

export type UserProfileFormValuesOutput = z.output<typeof formSchema>;
export type UserProfileFormValuesInput = z.input<typeof formSchema>;

export type UserProfileFormValues = z.infer<typeof formSchema>;

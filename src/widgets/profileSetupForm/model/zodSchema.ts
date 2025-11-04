import { ACTIVITY_LEVELS_IDS, GOALS_IDS, type Gender } from "@/entities/user";
import * as z from "zod";
import { t } from "i18next";

const numericString = (errorMessage: string) =>
  z
    .string()
    .min(1, { message: errorMessage })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: t("forms:errors.positiveNumber"),
    });

export const formSchema = z.object({
  // Step 1
  gender: z
    .union([z.enum(["male", "female"]), z.literal("")])
    .refine((val) => val !== "", { error: t("forms:errors.genericRequired") })
    .transform((val) => val as Gender),
  age: numericString(t("forms:errors.genericRequired")),
  height: numericString(t("forms:errors.genericRequired")),
  weight: numericString(t("forms:errors.genericRequired")),

  // Step 2
  activityLevel: z
    .union([z.enum(ACTIVITY_LEVELS_IDS), z.literal("")])
    .refine((val) => val !== "", {
      error: t("forms:errors.activityLevelRequired"),
    })
    .transform((val) => val as (typeof ACTIVITY_LEVELS_IDS)[number]),

  // Step 3
  goal: z
    .union([z.enum(GOALS_IDS), z.literal("")])
    .refine((val) => val !== "", { error: t("forms:errors.selectGoal") })
    .transform((val) => val as (typeof GOALS_IDS)[number]),
});

export type UserProfileFormValuesOutput = z.output<typeof formSchema>;
export type UserProfileFormValuesInput = z.input<typeof formSchema>;

export type UserProfileFormValues = z.infer<typeof formSchema>;

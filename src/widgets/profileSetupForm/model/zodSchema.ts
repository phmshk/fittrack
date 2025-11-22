import { ACTIVITY_LEVELS_IDS, GOALS_IDS, type Gender } from "@/entities/user";
import type { TFunction } from "i18next";
import * as z from "zod";

export const getPersonalInfoSchema = (t: TFunction) => {
  const coercedIntInRange = (min: number, max: number, errorMessage: string) =>
    z.coerce
      .number({ message: t("forms:errors.positiveNumber") })
      .min(min, { message: errorMessage })
      .max(max, { message: errorMessage });

  return z.object({
    // Step 1
    gender: z
      .union([z.enum(["male", "female"]), z.literal("")])
      .refine((val) => val !== "", { error: t("forms:errors.genericRequired") })
      .transform((val) => val as Gender),
    age: coercedIntInRange(14, 120, t("forms:errors.ageRange")),
    height: coercedIntInRange(100, 250, t("forms:errors.heightRange")),
    weight: coercedIntInRange(30, 300, t("forms:errors.weightRange")),

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
};
export type UserProfileFormValuesOutput = z.output<
  ReturnType<typeof getPersonalInfoSchema>
>;
export type UserProfileFormValuesInput = z.input<
  ReturnType<typeof getPersonalInfoSchema>
>;

export type UserProfileFormValues = z.infer<
  ReturnType<typeof getPersonalInfoSchema>
>;

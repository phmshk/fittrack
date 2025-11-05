import type { TFunction } from "i18next";
import * as z from "zod";

export const getNutriGoalsSchema = (t: TFunction) => {
  const numericString = (errorMessage: string) =>
    z
      .string()
      .min(1, { message: errorMessage })
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: t("forms:errors.positiveNumber"),
      });

  return z.object({
    calories: numericString(t("forms:errors.genericRequired")),
    proteins: numericString(t("forms:errors.genericRequired")),
    fats: numericString(t("forms:errors.genericRequired")),
    carbohydrates: numericString(t("forms:errors.genericRequired")),
    water: numericString(t("forms:errors.genericRequired")),
  });
};

export type NutriGoalsFormValues = z.infer<
  ReturnType<typeof getNutriGoalsSchema>
>;

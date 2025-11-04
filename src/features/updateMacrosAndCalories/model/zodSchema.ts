import * as z from "zod";
import { t } from "i18next";

const numericString = (errorMessage: string) =>
  z
    .string()
    .min(1, { message: errorMessage })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: t("forms:errors.positiveNumber"),
    });

export const nutriGoalsSchema = z.object({
  calories: numericString(t("forms:errors.genericRequired")),
  proteins: numericString(t("forms:errors.genericRequired")),
  fats: numericString(t("forms:errors.genericRequired")),
  carbohydrates: numericString(t("forms:errors.genericRequired")),
  water: numericString(t("forms:errors.genericRequired")),
});

export type NutriGoalsFormValues = z.infer<typeof nutriGoalsSchema>;

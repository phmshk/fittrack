import { z } from "zod";
import { MEALS } from "./types";
import { t } from "i18next";

const positiveNumberCheck = () =>
  z.string().refine(
    (val) => {
      const parsed = Number(val);
      return !isNaN(parsed) && parsed >= 0;
    },
    {
      message: t("forms:errors.positiveNumber"),
    },
  );

export const formSchema = z
  .object({
    mealType: z.enum(Object.values(MEALS), {
      error: t("forms:errors.selectMeal"),
    }),
    name: z.string().min(1, {
      message: t("forms:errors.genericNotEmpty"),
    }),
    calories: z
      .string()
      .min(1, {
        message: t("forms:errors.genericMandatory"),
      })
      .pipe(positiveNumberCheck()),
    proteins: z.string().pipe(positiveNumberCheck()),
    carbs: z.string().pipe(positiveNumberCheck()),
    sugars: z.string().pipe(positiveNumberCheck()),
    fats: z.string().pipe(positiveNumberCheck()),
    saturatedFats: z.string().pipe(positiveNumberCheck()),
    grams: z.string().pipe(positiveNumberCheck()),
    date: z.string(),
  })
  .refine((data) => !!data.mealType, {
    message: t("forms:errors.selectMeal"),
    path: ["mealType"],
  });

export type FormOutput = z.infer<typeof formSchema>;

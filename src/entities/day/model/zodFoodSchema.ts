import * as z from "zod";
import { MEALS } from "./types";
import type { TFunction } from "i18next";

export const getFormSchema = (t: TFunction) => {
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

  return z.object({
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
    proteins: z
      .string()
      .min(1, {
        message: t("forms:errors.genericMandatory"),
      })
      .pipe(positiveNumberCheck()),
    carbs: z
      .string()
      .min(1, {
        message: t("forms:errors.genericMandatory"),
      })
      .pipe(positiveNumberCheck()),
    sugars: z.string().pipe(positiveNumberCheck()),
    fats: z
      .string()
      .min(1, {
        message: t("forms:errors.genericMandatory"),
      })
      .pipe(positiveNumberCheck()),
    saturatedFats: z.string().pipe(positiveNumberCheck()),
    grams: z.string().pipe(positiveNumberCheck()),
    date: z.string(),
  });
  // .refine((data) => !!data.mealType, {
  //     message: t("forms:errors.selectMeal"),
  //     path: ["mealType"],
  //   });
};

export type FormOutput = z.infer<ReturnType<typeof getFormSchema>>;

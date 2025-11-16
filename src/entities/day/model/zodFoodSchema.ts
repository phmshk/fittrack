import * as z from "zod";
import { MEALS } from "./types";
import type { TFunction } from "i18next";

export const getFormSchema = (t: TFunction) => {
  const atLeastZeroCheck = () =>
    z.string().refine(
      (val) => {
        const parsed = Number(val);
        return !isNaN(parsed) && parsed >= 0;
      },
      {
        message: t("forms:errors.positiveNumber"),
      },
    );
  const greaterThanZeroCheck = () =>
    z.string().refine(
      (val) => {
        const parsed = Number(val);
        return !isNaN(parsed) && parsed > 0;
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

      .pipe(greaterThanZeroCheck()),
    proteins: z
      .string()
      .min(1, {
        message: t("forms:errors.genericMandatory"),
      })
      .pipe(greaterThanZeroCheck()),
    carbs: z
      .string()
      .min(1, {
        message: t("forms:errors.genericMandatory"),
      })
      .pipe(greaterThanZeroCheck()),
    sugars: z.string().pipe(atLeastZeroCheck()),
    fats: z
      .string()
      .min(1, {
        message: t("forms:errors.genericMandatory"),
      })
      .pipe(greaterThanZeroCheck()),
    saturatedFats: z.string().pipe(atLeastZeroCheck()),
    grams: z.string().pipe(atLeastZeroCheck()),
    date: z.string(),
    code: z.string().optional(),
    image_url: z.string().optional(),
  });
  // .refine((data) => !!data.mealType, {
  //     message: t("forms:errors.selectMeal"),
  //     path: ["mealType"],
  //   });
};

export type FormOutput = z.infer<ReturnType<typeof getFormSchema>>;

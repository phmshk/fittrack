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
  date: z.string().min(1, { message: t("forms:errors.genericRequired") }),
  weight: numericString(t("forms:errors.genericRequired")),
});

export type WeightLogFormValues = z.infer<typeof formSchema>;

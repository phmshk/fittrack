import * as z from "zod";
import { t } from "i18next";
const numericString = (errorMessage: string) =>
  z
    .string()
    .min(1, { message: errorMessage })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: t("forms:errors.positiveNumber"),
    });

export const personalInfoSchema = z.object({
  name: z
    .string()
    .min(1, { message: t("forms:errors.genericRequired") })
    .min(2, { message: t("forms:errors.nameMin") }),
  gender: z
    .union([z.enum(["male", "female"]), z.literal("")])
    .refine((val) => val !== "", { error: t("forms:errors.genericRequired") }),
  age: numericString(t("forms:errors.genericRequired")),
  height: numericString(t("forms:errors.genericRequired")),
  weight: numericString(t("forms:errors.genericRequired")),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

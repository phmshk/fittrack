import * as z from "zod";
import { t } from "i18next";
export const profileSchema = z.object({
  name: z.string().min(2, { message: t("forms:errors.nameMin") }),
  weight: z.number().positive({ message: t("forms:errors.positiveNumber") }),
  age: z.number().min(0, { message: t("forms:errors.positiveNumber") }),
  height: z.number().positive({ message: t("forms:errors.positiveNumber") }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

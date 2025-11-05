import type { TFunction } from "i18next";
import * as z from "zod";

export const getFormSchema = (t: TFunction) =>
  z.object({
    email: z.email({ message: t("forms:errors.invalidEmail") }),
    password: z.string().min(1, { message: t("forms:errors.genericRequired") }),
  });

export type LoginFormValues = z.infer<ReturnType<typeof getFormSchema>>;

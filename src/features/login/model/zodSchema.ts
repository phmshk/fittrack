import z from "zod";
import { t } from "i18next";

export const formSchema = z.object({
  email: z.email({ message: t("forms:errors.invalidEmail") }),
  password: z.string().min(1, { message: t("forms:errors.genericRequired") }),
});

export type LoginFormValues = z.infer<typeof formSchema>;

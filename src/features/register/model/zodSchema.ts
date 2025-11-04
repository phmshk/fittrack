import * as z from "zod";
import { t } from "i18next";

export const formSchema = z.object({
  name: z.string().min(2, { message: t("forms:errors.nameMin") }),
  email: z.email({ message: t("forms:errors.invalidEmail") }),
  password: z.string().min(8, { message: t("forms:errors.passwordMin") }),
});

export type RegisterFormValues = z.infer<typeof formSchema>;

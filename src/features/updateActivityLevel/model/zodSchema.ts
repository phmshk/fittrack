import { ACTIVITY_LEVELS_IDS } from "@/entities/user";
import z from "zod";
import { t } from "i18next";

export const activityFormSchema = z.object({
  activityLevel: z.enum(ACTIVITY_LEVELS_IDS, {
    error: t("forms:errors.activityLevelRequired"),
  }),
});

export type ActivityFormValues = z.infer<typeof activityFormSchema>;

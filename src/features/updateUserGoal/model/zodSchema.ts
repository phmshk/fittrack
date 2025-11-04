import { GOALS_IDS } from "@/entities/user";
import * as z from "zod";
import { t } from "i18next";

export const goalFormSchema = z.object({
  goal: z.enum(GOALS_IDS, {
    error: t("forms:errors.selectGoal"),
  }),
});

export type GoalFormValues = z.infer<typeof goalFormSchema>;

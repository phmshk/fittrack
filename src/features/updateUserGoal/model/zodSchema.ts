import { GOALS_IDS } from "@/entities/user";
import type { TFunction } from "i18next";
import * as z from "zod";

export const getGoalFormSchema = (t: TFunction) =>
  z.object({
    goal: z.enum(GOALS_IDS, {
      error: t("forms:errors.selectGoal"),
    }),
  });

export type GoalFormValues = z.infer<ReturnType<typeof getGoalFormSchema>>;

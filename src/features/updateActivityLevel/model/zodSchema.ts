import { ACTIVITY_LEVELS_IDS } from "@/entities/user";
import type { TFunction } from "i18next";
import * as z from "zod";

export const getActivityFormSchema = (t: TFunction) =>
  z.object({
    activityLevel: z.enum(ACTIVITY_LEVELS_IDS, {
      error: t("forms:errors.activityLevelRequired"),
    }),
  });

export type ActivityFormValues = z.infer<
  ReturnType<typeof getActivityFormSchema>
>;

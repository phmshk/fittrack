import { GOALS_IDS } from "@/entities/user";
import { z } from "zod";

export const goalFormSchema = z.object({
  goal: z.enum(GOALS_IDS, {
    error: "Please select a goal",
  }),
});

export type GoalFormValues = z.infer<typeof goalFormSchema>;

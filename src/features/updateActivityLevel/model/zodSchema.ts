import { ACTIVITY_LEVELS_IDS } from "@/entities/user";
import z from "zod";

export const activityFormSchema = z.object({
  activityLevel: z.enum(ACTIVITY_LEVELS_IDS, {
    error: "Activity level is required for correct calculation.",
  }),
});

export type ActivityFormValues = z.infer<typeof activityFormSchema>;

import * as z from "zod";

export const profileSchema = z.object({
  tab: z.enum(["goals", "personal-info", "settings"]).catch("personal-info"),
});

export type ProfileSearchSchema = z.infer<typeof profileSchema>;

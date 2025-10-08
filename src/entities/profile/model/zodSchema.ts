import z from "zod";

export const profileSchema = z.object({
  tab: z
    .enum(["overview", "goals", "personal-info", "settings"])
    .catch("overview"),
});

export type ProfileSearchSchema = z.infer<typeof profileSchema>;

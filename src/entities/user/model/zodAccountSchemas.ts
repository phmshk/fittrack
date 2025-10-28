import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  weight: z.number().positive("Weight must be a positive number"),
  age: z.number().min(0, "Age must be a non-negative number"),
  height: z.number().positive("Height must be a positive number"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

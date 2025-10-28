import { z } from "zod";

const numericString = (errorMessage: string) =>
  z
    .string()
    .min(1, { message: errorMessage })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Must be a positive number",
    });

export const personalInfoSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  gender: z
    .union([z.enum(["male", "female"]), z.literal("")])
    .refine((val) => val !== "", { error: "Gender is required" }),
  age: numericString("Age is required."),
  height: numericString("Height is required."),
  weight: numericString("Weight is required."),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

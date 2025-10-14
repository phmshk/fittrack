import { z } from "zod";

const numericString = (errorMessage: string) =>
  z
    .string()
    .min(1, { message: errorMessage })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Must be a positive number",
    });

export const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required." }),
  weight: numericString("Weight is required."),
});

export type WeightLogFormValues = z.infer<typeof formSchema>;

import z from "zod";

export const formSchema = z.object({
  email: z.email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export type LoginFormValues = z.infer<typeof formSchema>;

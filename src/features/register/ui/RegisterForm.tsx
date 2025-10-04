import { useForm } from "react-hook-form";
import { useRegister } from "../api/useRegister";
import { formSchema, type RegisterFormValues } from "../model/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterCredentials } from "../model/types";
import { Button } from "@/shared/shadcn/components/ui/button";
import { FormInput } from "@/shared/ui/form";
import { Form } from "@/shared/shadcn/components/ui/form";

export const RegisterForm = () => {
  const registerMutation = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    const credentials: RegisterCredentials = values;
    registerMutation.mutate(credentials);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          name="name"
          placeholder="John Doe"
          control={form.control}
          label="Name"
          srOnly={"Name input"}
        />
        <FormInput
          name="email"
          placeholder="name@example.com"
          control={form.control}
          label="Email"
          type="email"
          srOnly={"Email input"}
        />
        {registerMutation.error && (
          <p className="text-destructive text-sm">
            {registerMutation.error.message}
          </p>
        )}
        <FormInput
          name="password"
          placeholder="********"
          control={form.control}
          label="Password"
          type="password"
          srOnly={"Password input"}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending
            ? "Creating account..."
            : "Create Account"}
        </Button>
      </form>
    </Form>
  );
};

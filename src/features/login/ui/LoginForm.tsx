import { useLogin } from "../api/useLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/shadcn/components/ui/form";
import { Button } from "@/shared/shadcn/components/ui/button";
import { formSchema, type LoginFormValues } from "../model/zodSchema";
import type { LoginCredentials } from "../model/types";
import { FormInput } from "@/shared/ui/form";

export const LoginForm = () => {
  const loginMutation = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    const credentials: LoginCredentials = values;
    loginMutation.mutate(credentials);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          name="email"
          placeholder="name@example.com"
          control={form.control}
          label="Email"
          srOnly={"Email address input"}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="********"
          control={form.control}
          label="Password"
          srOnly={"Password input"}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};

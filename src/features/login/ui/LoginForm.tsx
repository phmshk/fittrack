import { useLogin } from "../api/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/shadcn/components/ui/button";
import { getFormSchema, type LoginFormValues } from "../model/zodSchema";
import type { LoginCredentials } from "../model/types";
import { FormInput } from "@/shared/ui/form";
import { useTranslation } from "react-i18next";
import { FieldGroup } from "@/shared/shadcn/components/ui/field";
import { useForm } from "react-hook-form";
import { useMemo } from "react";

export const LoginForm = () => {
  const loginMutation = useLogin();
  const { t } = useTranslation(["auth", "forms"]);
  const formSchema = useMemo(() => getFormSchema(t), [t]);

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
    <form
      id="login-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <FieldGroup>
        <FormInput
          name="email"
          placeholder="name@example.com"
          control={form.control}
          label={t("auth:emailLabel")}
          srOnly={t("auth:emailSrOnly")}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="********"
          control={form.control}
          label={t("auth:passwordLabel")}
          srOnly={t("auth:passwordSrOnly")}
        />
        {loginMutation.isError && (
          <p className="text-destructive text-sm">
            {loginMutation.error?.message || "An error occurred during login."}
          </p>
        )}
      </FieldGroup>
      <Button
        type="submit"
        className="w-full"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending
          ? t("auth:pendingLogin")
          : t("auth:loginButton")}
      </Button>
    </form>
  );
};

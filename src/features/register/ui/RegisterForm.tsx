import { useForm } from "react-hook-form";
import { useRegister } from "../api/useRegister";
import { getFormSchema, type RegisterFormValues } from "../model/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterCredentials } from "../model/types";
import { Button } from "@/shared/shadcn/components/ui/button";
import { FormInput } from "@/shared/ui/form";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { getFirebaseAuthErrorMessage } from "@/entities/user";
import { PasswordCriteria } from "@/shared/ui/passwordCriteria/ui/PasswordCriteria";

export const RegisterForm = () => {
  const registerMutation = useRegister();
  const { t } = useTranslation(["auth", "forms"]);
  const formSchema = useMemo(() => getFormSchema(t), [t]);
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
    <form
      id="register-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <FormInput
        name="name"
        placeholder={t("auth:namePlaceholder")}
        control={form.control}
        label={t("auth:nameLabel")}
        srOnly={t("auth:nameSrOnly")}
      />
      <FormInput
        name="email"
        placeholder="name@example.com"
        control={form.control}
        label={t("auth:emailLabel")}
        type="email"
        srOnly={t("auth:emailSrOnly")}
      />
      <FormInput
        name="password"
        placeholder="********"
        control={form.control}
        label={t("auth:passwordLabel")}
        type="password"
        srOnly={t("auth:passwordSrOnly")}
      />
      <PasswordCriteria password={form.watch("password")} />
      {registerMutation.error && (
        <p className="text-destructive text-sm">
          {getFirebaseAuthErrorMessage(registerMutation.error)}
        </p>
      )}
      <Button
        type="submit"
        className="w-full"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending
          ? t("auth:pendingRegister")
          : t("auth:registerButton")}
      </Button>
    </form>
  );
};

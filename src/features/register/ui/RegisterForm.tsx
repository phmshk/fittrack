import { useForm } from "react-hook-form";
import { useRegister } from "../api/useRegister";
import { formSchema, type RegisterFormValues } from "../model/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterCredentials } from "../model/types";
import { Button } from "@/shared/shadcn/components/ui/button";
import { FormInput } from "@/shared/ui/form";
import { useTranslation } from "react-i18next";

export const RegisterForm = () => {
  const registerMutation = useRegister();
  const { t } = useTranslation("auth");

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
      {registerMutation.error && (
        <p className="text-destructive text-sm">
          {registerMutation.error.message}
        </p>
      )}
      <FormInput
        name="password"
        placeholder="********"
        control={form.control}
        label={t("auth:passwordLabel")}
        type="password"
        srOnly={t("auth:passwordSrOnly")}
      />
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

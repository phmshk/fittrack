import { LoginForm } from "@/features/login";
import { RegisterForm } from "@/features/register";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/shadcn/components/ui/tabs";
import { Link, useSearch } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const AuthForm = () => {
  const { tab } = useSearch({ from: "/auth" });
  const currentTab = tab ?? "login";
  const { t } = useTranslation("auth");

  return (
    <Tabs value={currentTab} className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login" asChild>
          <Link to="/auth" search={{ tab: "login" }}>
            {t("auth:login")}
          </Link>
        </TabsTrigger>
        <TabsTrigger value="register" asChild>
          <Link to="/auth" search={{ tab: "register" }}>
            {t("auth:register")}
          </Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>{t("auth:signIn")}</CardTitle>
            <CardDescription>{t("auth:signInDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>{t("auth:signUp")}</CardTitle>
            <CardDescription>{t("auth:signUpDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

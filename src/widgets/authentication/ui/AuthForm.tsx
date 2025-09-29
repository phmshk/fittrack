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

export const AuthForm = () => {
  const { tab } = useSearch({ from: "/auth" });
  const currentTab = tab ?? "login";

  return (
    <Tabs value={currentTab} className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login" asChild>
          <Link to="/auth" search={{ tab: "login" }}>
            Login
          </Link>
        </TabsTrigger>
        <TabsTrigger value="register" asChild>
          <Link to="/auth" search={{ tab: "register" }}>
            Register
          </Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create a new account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

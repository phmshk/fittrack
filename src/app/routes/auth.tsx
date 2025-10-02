import { AuthPage } from "@/pages/authPage";
import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";

const authSearchSchema = z.object({
  tab: z.enum(["login", "register"]).catch("login"),
});

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  validateSearch: authSearchSchema,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: "/", replace: true });
    }
  },
});

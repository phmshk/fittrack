import { AuthPage } from "@/pages/authPage";
import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";

const authSearchSchema = z.object({
  tab: z.enum(["login", "register"]).catch("login"),
});

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  validateSearch: authSearchSchema,
  staticData: {
    showHeader: false,
    title: "",
    showBackButton: false,
    isNavRoute: false,
    showFooter: false,
  },
});

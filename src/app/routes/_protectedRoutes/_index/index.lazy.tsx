import { DashboardPage } from "@/pages/dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_protectedRoutes/_index/")({
  component: DashboardPage,
});

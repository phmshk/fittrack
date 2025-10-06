import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/pages/dashboard";

export const Route = createFileRoute("/_protectedRoutes/")({
  component: DashboardPage,
  staticData: {
    showHeader: true,
    title: "Dashboard",
    showBackButton: false,
    isNavRoute: true,
  },
});

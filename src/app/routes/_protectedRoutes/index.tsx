import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/pages/dashboard";
import { LayoutDashboard } from "lucide-react";

export const Route = createFileRoute("/_protectedRoutes/")({
  component: DashboardPage,
  staticData: {
    showHeader: true,
    title: "Dashboard",
    showBackButton: false,
    isNavRoute: true,
    icon: LayoutDashboard,
    showFooter: true,
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard } from "lucide-react";

export const Route = createFileRoute("/_protectedRoutes/_index/")({
  staticData: {
    showHeader: true,
    title: "Dashboard",
    showBackButton: false,
    isNavRoute: true,
    icon: LayoutDashboard,
    showFooter: true,
  },
});

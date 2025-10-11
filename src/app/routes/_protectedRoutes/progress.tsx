import { ProgressPage } from "@/pages/progressPage";
import { createFileRoute } from "@tanstack/react-router";
import { ChartColumnIncreasing } from "lucide-react";

export const Route = createFileRoute("/_protectedRoutes/progress")({
  component: ProgressPage,
  staticData: {
    title: "Progress",
    showHeader: true,
    showFooter: true,
    showBackButton: false,
    isNavRoute: true,
    icon: ChartColumnIncreasing,
  },
});

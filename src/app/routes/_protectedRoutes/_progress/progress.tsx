import { createFileRoute } from "@tanstack/react-router";
import { ChartColumnIncreasing } from "lucide-react";

export const Route = createFileRoute("/_protectedRoutes/_progress/progress")({
  staticData: {
    key: "progress",
    showHeader: true,
    showFooter: true,
    showBackButton: false,
    isNavRoute: true,
    icon: ChartColumnIncreasing,
  },
});

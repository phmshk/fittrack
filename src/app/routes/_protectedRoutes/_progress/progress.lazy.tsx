import { ProgressPage } from "@/pages/progressPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/_protectedRoutes/_progress/progress",
)({
  component: ProgressPage,
});

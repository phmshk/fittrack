import { DiaryPage } from "@/pages/diary";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_protectedRoutes/_diary/diary")({
  component: DiaryPage,
});

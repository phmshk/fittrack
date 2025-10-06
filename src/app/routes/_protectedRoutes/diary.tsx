import { createFileRoute } from "@tanstack/react-router";
import { DiaryPage } from "@/pages/diary";

export const Route = createFileRoute("/_protectedRoutes/diary")({
  component: DiaryPage,
  staticData: {
    showHeader: true,
    title: "Diary",
    showBackButton: false,
    isNavRoute: true,
  },
});

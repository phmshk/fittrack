import { createFileRoute } from "@tanstack/react-router";
import { DiaryPage } from "@/pages/diary";

export const Route = createFileRoute("/diary")({
  component: DiaryPage,
});

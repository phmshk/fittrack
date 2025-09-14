import { createFileRoute } from "@tanstack/react-router";
import { Diary } from "@/pages/diary";

export const Route = createFileRoute("/diary")({
  component: Diary,
});

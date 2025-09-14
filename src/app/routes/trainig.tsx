import { createFileRoute } from "@tanstack/react-router";
import { Training } from "@/pages/training";

export const Route = createFileRoute("/trainig")({
  component: Training,
});

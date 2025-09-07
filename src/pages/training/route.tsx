import { createFileRoute } from "@tanstack/react-router";
import { Training } from "./ui/Training";

export const Route = createFileRoute("/training")({
  component: Training,
});

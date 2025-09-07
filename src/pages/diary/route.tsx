import { createFileRoute } from "@tanstack/react-router";
import Diary from "./ui/Dairy";

export const Route = createFileRoute("/diary")({
  component: Diary,
});

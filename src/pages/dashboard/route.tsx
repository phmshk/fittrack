import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "./ui/Dashboard";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

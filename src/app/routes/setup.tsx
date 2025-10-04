import { ProfileSetupPage } from "@/pages/profileSetupPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/setup")({
  component: ProfileSetupPage,
});

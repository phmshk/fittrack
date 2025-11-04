import { ProfilePage } from "@/pages/profilePage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_protectedRoutes/_profile/profile")({
  component: ProfilePage,
});

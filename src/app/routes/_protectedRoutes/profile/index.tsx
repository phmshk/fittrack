import { ProfilePage, profileSchema } from "@/pages/profilePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protectedRoutes/profile/")({
  component: ProfilePage,
  validateSearch: profileSchema,
});

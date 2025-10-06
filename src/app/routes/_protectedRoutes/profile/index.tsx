import { ProfilePage, profileSchema } from "@/pages/profilePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protectedRoutes/profile/")({
  component: ProfilePage,
  validateSearch: profileSchema,

  staticData: {
    title: "Profile",
    showHeader: true,
    showBackButton: true,
    isNavRoute: false,
  },
});

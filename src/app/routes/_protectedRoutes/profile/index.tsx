import { ProfilePage, profileSchema } from "@/pages/profilePage";
import { createFileRoute } from "@tanstack/react-router";
import { User2Icon } from "lucide-react";

export const Route = createFileRoute("/_protectedRoutes/profile/")({
  component: ProfilePage,
  validateSearch: profileSchema,

  staticData: {
    title: "Profile",
    showHeader: true,
    showFooter: false,
    showBackButton: true,
    isNavRoute: false,
    icon: User2Icon,
  },
});

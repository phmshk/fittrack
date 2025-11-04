import { profileSchema, profileTabs } from "@/entities/profile";
import { createFileRoute } from "@tanstack/react-router";
import { User2Icon } from "lucide-react";

export const Route = createFileRoute("/_protectedRoutes/_profile/profile")({
  validateSearch: profileSchema,

  staticData: {
    title: "Profile",
    showHeader: true,
    showMobileHeaderNav: true,
    showFooter: false,
    showBackButton: true,
    isNavRoute: false,
    icon: User2Icon,
    navTabs: Object.values(profileTabs),
  },
});

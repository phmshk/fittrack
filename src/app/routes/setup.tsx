import { ProfileSetupPage } from "@/pages/profileSetupPage";
import { createFileRoute, isRedirect, redirect } from "@tanstack/react-router";
import { queryClient } from "../providers/queryClient";
import { userQueryOptions } from "@/entities/user";

export const Route = createFileRoute("/setup")({
  component: ProfileSetupPage,
  beforeLoad: async () => {
    try {
      const user = await queryClient.fetchQuery(userQueryOptions);

      if (user?.hasCompletedSetup) {
        throw redirect({
          to: "/profile",
          search: { tab: "personal-info" },
          replace: true,
        });
      }
    } catch (error) {
      if (isRedirect(error)) throw error;
      console.error("Error fetching user in /setup route:", error);
      throw redirect({
        to: "/auth",
        search: { tab: "login" },
        replace: true,
      });
    }
  },
  staticData: {
    showHeader: false,
    key: "",
    showBackButton: false,
    isNavRoute: false,
    showFooter: false,
  },
});

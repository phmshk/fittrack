import { AddFromDatabase } from "@/pages/addFoodPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protectedRoutes/addFood")({
  component: AddFromDatabase,
  staticData: {
    title: "Add Food",
    showHeader: true,
    showBackButton: true,
    isNavRoute: false,
    showFooter: false,
  },
  // Ensure this route can only be accessed when navigated from a link which sets state { from: "allowedToAddFood" }
  beforeLoad: ({ location }) => {
    const fromLink = location.state?.from;
    // If the navigation did not come from a link which sets state { from: "allowedToAddFood" }, redirect to /diary
    if (fromLink !== "allowedToAddFood") {
      throw redirect({ to: "/diary" });
    }
  },
});

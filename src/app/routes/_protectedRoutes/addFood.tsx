import { AddFromDatabase } from "@/pages/addFoodPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protectedRoutes/addFood")({
  component: AddFromDatabase,
  staticData: {
    title: "Add Food",
    showHeader: true,
    showBackButton: true,
    isNavRoute: false,
  },
  // Ensure this route can only be accessed when navigated from mealCard
  beforeLoad: ({ location }) => {
    const fromPage = location.state?.from;
    // If the navigation did not come from mealCard, redirect to /diary
    if (fromPage !== "mealCard") {
      throw redirect({ to: "/diary" });
    }
  },
});

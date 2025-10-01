import { AddFromDatabase } from "@/pages/addFoodPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protectedRoutes/addFood")({
  component: AddFromDatabase,

  beforeLoad: ({ location }) => {
    const fromPage = location.state?.from;
    // If the navigation did not come from mealCard, redirect to /diary
    if (fromPage !== "mealCard") {
      throw redirect({ to: "/diary" });
    }
  },
});

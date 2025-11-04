import { AddFromDatabase } from "@/pages/addFoodPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_protectedRoutes/_addFood/addFood")({
  component: AddFromDatabase,
});

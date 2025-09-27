import { AddFromDatabase } from "@/pages/addFoodPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/addFood")({
  component: AddFromDatabase,
});

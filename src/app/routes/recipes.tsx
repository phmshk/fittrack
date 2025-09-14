import { createFileRoute } from "@tanstack/react-router";
import { Recipes } from "@/pages/recipes";

export const Route = createFileRoute("/recipes")({
  component: Recipes,
});

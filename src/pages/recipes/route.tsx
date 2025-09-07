import { createFileRoute } from "@tanstack/react-router";
import Recipes from "./ui/Recipes";

export const Route = createFileRoute("/recipes")({
  component: Recipes,
});

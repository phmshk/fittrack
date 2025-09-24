import type { ApiComponents } from "@/shared/api/schema";
import type { ApiPaths } from "@/shared/api/schema";

export type Product = ApiComponents["schemas"]["Product"];
export type Nutriments = ApiComponents["schemas"]["Nutriments"];

export type SearchParams =
  ApiPaths["/cgi/search.pl"]["get"]["parameters"]["query"];
export type SearchResponse = ApiComponents["schemas"]["SearchResponse"];
export type ProductResponse = ApiComponents["schemas"]["ProductResponse"];

export const NUTRIMENTS_LABELS: Record<keyof Nutriments, string> = {
  "energy-kcal_100g": "Calories",
  fat_100g: "Fats",
  "saturated-fat_100g": "Saturated Fats",
  carbohydrates_100g: "Carbohydrates",
  sugars_100g: "Sugars",
  proteins_100g: "Proteins",
} as const;

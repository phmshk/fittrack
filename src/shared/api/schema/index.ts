import type { paths } from "./generated";
import type { components } from "./generated";

export type ApiPaths = paths;
export type ApiComponents = components;

export type FoodLog = ApiComponents["schemas"]["FoodLog"];
export type FoodLogInput = ApiComponents["schemas"]["FoodLogInput"];

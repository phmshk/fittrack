import type { ApiComponents } from "@/shared/api/schema";

// --- User Types ---
export type User = ApiComponents["schemas"]["User"];

// --- User Goals Types ---
export type UserGoals = ApiComponents["schemas"]["UserGoals"];
export type UserGoalsInput = ApiComponents["schemas"]["UserGoalsInput"];

// --- User Session Types ---
export type UserSession = ApiComponents["schemas"]["AuthResponse"];

import type { ApiComponents } from "@/shared/api/schema";

// --- User Types ---
export type User = ApiComponents["schemas"]["User"];
export type UserInput = ApiComponents["schemas"]["UserInput"];

// --- User Goals Types ---
export type PersonalData = ApiComponents["schemas"]["PersonalData"];
export type DailyTargets = ApiComponents["schemas"]["DailyTargets"];

// --- User Session Types ---
export type UserSession = ApiComponents["schemas"]["AuthResponse"];

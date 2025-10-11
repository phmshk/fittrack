import type { ApiComponents } from "@/shared/api/schema";

// --- User Types ---
export type User = ApiComponents["schemas"]["User"];
export type UserInput = ApiComponents["schemas"]["UserInput"];
export type BaseUser = Pick<User, "id" | "email" | "name"> & {
  hasCompletedSetup?: boolean;
};

// --- User Goals Types ---
export type PersonalData = ApiComponents["schemas"]["PersonalData"];
export type DailyTargets = ApiComponents["schemas"]["DailyTargets"];

// --- User Session Types ---
export type UserSession = ApiComponents["schemas"]["AuthResponse"];

// --- User Progress Types ---
export type WeightLog = ApiComponents["schemas"]["WeightLog"];
export type WeightLogInput = ApiComponents["schemas"]["WeightLogInput"];

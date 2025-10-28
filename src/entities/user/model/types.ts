import type { ApiComponents } from "@/shared/api/schema";

// --- User Types ---
export type User = ApiComponents["schemas"]["User"];
export type UserInput = ApiComponents["schemas"]["UserInput"];
export type BaseUser = Pick<User, "id" | "email" | "name"> & {
  hasCompletedSetup?: boolean;
};

// --- User Goals Types ---
export type GoalOptions = ApiComponents["schemas"]["User"]["goal"];
export type ActivityLevels = ApiComponents["schemas"]["User"]["activityLevel"];
export type PersonalData = ApiComponents["schemas"]["PersonalData"];
export type DailyTargets = ApiComponents["schemas"]["DailyTargets"];

// --- User Session Types ---
export type UserSession = ApiComponents["schemas"]["AuthResponse"];

// --- User Progress Types ---
export type WeightLog = ApiComponents["schemas"]["WeightLog"];
export type WeightLogInput = ApiComponents["schemas"]["WeightLogInput"];

export const goals = [
  {
    id: "lose_weight",
    title: "Lose Weight",
  },
  {
    id: "maintain_weight",
    title: "Maintain Weight",
  },
  {
    id: "gain_weight",
    title: "Gain Weight",
  },
] as const;

export const GOALS_IDS = [
  "lose_weight",
  "maintain_weight",
  "gain_weight",
] as const;

export const activityLevels = [
  {
    id: "sedentary",
    title: "Sedentary",
    description: "Little to no exercise",
  },
  {
    id: "light",
    title: "Lightly Active",
    description: "Light exercise/sports 1-3 days/week",
  },
  {
    id: "moderate",
    title: "Moderately Active",
    description: "Moderate exercise/sports 3-5 days/week",
  },
  {
    id: "active",
    title: "Very Active",
    description: "Hard exercise/sports 6-7 days a week",
  },
  {
    id: "extra_active",
    title: "Extra Active",
    description: "Very hard exercise & physical job",
  },
] as const;

export const ACTIVITY_LEVELS_IDS = [
  "sedentary",
  "light",
  "moderate",
  "active",
  "extra_active",
] as const;

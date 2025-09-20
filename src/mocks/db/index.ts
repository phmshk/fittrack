// src/mocks/db.ts

import type { FoodLog } from "@/entities/day";

// --- Type Definitions for our Fitness App ---

export type Gender = "male" | "female";
export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";
export type ActivityType = "weightlifting" | "running" | "yoga" | "cycling";

export interface ActivityLog {
  id: string;
  date: string; // Format: "YYYY-MM-DD"
  activityType: ActivityType;
  durationMinutes: number;
  caloriesBurned: number;
  notes?: string; // Optional notes
}

export interface WeightEntry {
  date: string; // Format: "YYYY-MM-DD"
  weightKg: number;
}

export interface UserProfile {
  name: string;
  gender: Gender;
  birthDate: string; // Format: "YYYY-MM-DD"
  heightCm: number;
  activityLevel: ActivityLevel;
}

export interface UserGoals {
  targetCalories: number;
  targetProteins: number;
  targetCarbs: number;
  targetFats: number;
}

// --- "Tables" for our in-memory database ---
let foodLogs: Map<string, FoodLog> = new Map();
let activityLogs: Map<string, ActivityLog> = new Map();
let weightHistory: Map<string, WeightEntry> = new Map();
let userProfile: UserProfile | null = null;
let userGoals: UserGoals | null = null;

// --- Initial seed data for development ---
const seedData = {
  userProfile: {
    name: "Alex Doe",
    gender: "male",
    birthDate: "1995-05-15",
    heightCm: 180,
    activityLevel: "moderate",
  } as UserProfile,

  userGoals: {
    targetCalories: 2500,
    targetProteins: 180,
    targetCarbs: 250,
    targetFats: 80,
  } as UserGoals,

  foodLogs: [
    {
      id: crypto.randomUUID(),
      date: "2025-09-19",
      mealType: "breakfast",
      name: "Scrambled Eggs",
      calories: 220,
      proteins: 15,
      carbs: 1,
      fats: 18,
      grams: 120,
    },
    {
      id: crypto.randomUUID(),
      date: "2025-09-20",
      mealType: "lunch",
      name: "Grilled Chicken Breast",
      calories: 220,
      proteins: 43,
      carbs: 0,
      fats: 5,
      grams: 150,
    },
    {
      id: crypto.randomUUID(),
      date: "2025-09-21",
      mealType: "dinner",
      name: "Steak and Sweet Potato",
      calories: 700,
      proteins: 50,
      carbs: 45,
      fats: 35,
      grams: 400,
    },
  ] as FoodLog[],

  activityLogs: [
    {
      id: crypto.randomUUID(),
      date: "2025-09-19",
      activityType: "weightlifting",
      durationMinutes: 60,
      caloriesBurned: 450,
      notes: "Chest and Triceps day",
    },
    {
      id: crypto.randomUUID(),
      date: "2025-09-20",
      activityType: "running",
      durationMinutes: 30,
      caloriesBurned: 350,
      notes: "5k run in the park",
    },
  ] as ActivityLog[],

  weightHistory: [
    { date: "2025-09-01", weightKg: 85.5 },
    { date: "2025-09-15", weightKg: 84.8 },
  ] as WeightEntry[],
};

// --- Function to populate and reset the database ---
const seed = (): void => {
  foodLogs = new Map(seedData.foodLogs.map((log) => [log.id, log]));
  activityLogs = new Map(seedData.activityLogs.map((log) => [log.id, log]));
  weightHistory = new Map(
    seedData.weightHistory.map((entry) => [entry.date, entry]),
  );
  userProfile = { ...seedData.userProfile };
  userGoals = { ...seedData.userGoals };
};

// Initial seeding of the database
seed();

// --- Exported object with methods to manage the DB ---
export const db = {
  // --- FoodLog Methods ---
  getFoodLogsByDate: (date: string): FoodLog[] =>
    Array.from(foodLogs.values()).filter((log) => log.date === date),
  addFoodLog: (logData: Omit<FoodLog, "id">): FoodLog => {
    const newLog = { id: crypto.randomUUID(), ...logData };
    foodLogs.set(newLog.id, newLog);
    return newLog;
  },
  deleteFoodLog: (id: string): boolean => foodLogs.delete(id),
  updateFoodLog: (id: string, updates: Omit<FoodLog, "id">): FoodLog | null => {
    if (!foodLogs.has(id)) {
      return null;
    }
    const existingLog = foodLogs.get(id)!; // We know it exists
    const updatedLog = { ...existingLog, ...updates };
    foodLogs.set(id, updatedLog);
    return updatedLog;
  },

  // --- ActivityLog Methods ---
  getActivitiesByDate: (date: string): ActivityLog[] =>
    Array.from(activityLogs.values()).filter((log) => log.date === date),
  addActivity: (activityData: Omit<ActivityLog, "id">): ActivityLog => {
    const newActivity = { id: crypto.randomUUID(), ...activityData };
    activityLogs.set(newActivity.id, newActivity);
    return newActivity;
  },

  // --- WeightHistory Methods ---
  getWeightHistory: (): WeightEntry[] =>
    Array.from(weightHistory.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    ),
  addWeightEntry: (entry: WeightEntry): WeightEntry => {
    weightHistory.set(entry.date, entry);
    return entry;
  },

  // --- UserProfile Methods ---
  getProfile: (): UserProfile | null => userProfile,
  updateProfile: (newProfileData: Partial<UserProfile>): UserProfile | null => {
    if (userProfile) {
      userProfile = { ...userProfile, ...newProfileData };
    }
    return userProfile;
  },

  // --- UserGoals Methods ---
  getGoals: (): UserGoals | null => userGoals,
  updateGoals: (newGoalsData: Partial<UserGoals>): UserGoals | null => {
    if (userGoals) {
      userGoals = { ...userGoals, ...newGoalsData };
    }
    return userGoals;
  },

  // --- Reset Method (useful for testing) ---
  reset: (): void => seed(),
};

import { create } from "zustand";
import type { DayState, DayStore, FoodEntry } from "./types";

const initialState: DayState = {
  date: new Date().toISOString().split("T")[0],
  userGoals: {
    calorieGoal: 2000,
    proteinGoal: 150,
    carbGoal: 250,
    fatGoal: 70,
  },
  meals: {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  },
  exerciseCalories: 0,
};

export const useDayStore = create<DayStore>()((set) => ({
  ...initialState,
  addFoodEntry: (mealType, foodEntry) =>
    set((state) => {
      const newFoodEntry: FoodEntry = {
        id: crypto.randomUUID(),
        ...foodEntry,
      };

      return {
        meals: {
          ...state.meals,
          [mealType]: [...state.meals[mealType], newFoodEntry],
        },
      };
    }),
}));

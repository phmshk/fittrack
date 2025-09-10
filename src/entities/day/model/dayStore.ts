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
    breakfast: [
      {
        id: "1",
        name: "Oatmeal",
        grams: 150,
        calories: 210,
        carbs: 40,
        proteins: 6,
        fats: 4,
      },
      {
        id: "2",
        name: "Apple",
        grams: 100,
        calories: 52,
        carbs: 14,
        proteins: 0,
        fats: 0,
      },
    ],
    lunch: [
      {
        id: "3",
        name: "Chicken Breast",
        grams: 200,
        calories: 330,
        carbs: 0,
        proteins: 62,
        fats: 7,
      },
      {
        id: "4",
        name: "Buckwheat",
        grams: 100,
        calories: 130,
        carbs: 28,
        proteins: 5,
        fats: 1,
      },
      {
        id: "5",
        name: "Vegetable Salad",
        grams: 150,
        calories: 80,
        carbs: 12,
        proteins: 3,
        fats: 2,
      },
    ],
    dinner: [],
    snacks: [],
  },
  exerciseCalories: 324,
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

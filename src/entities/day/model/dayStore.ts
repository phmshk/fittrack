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
        mealType: "breakfast",
        name: "Oatmeal",
        grams: 150,
        calories: 300,
        proteins: 10,
        carbs: 54,
        fats: 5,
      },
      {
        id: "2",
        mealType: "breakfast",
        name: "Banana",
        grams: 100,
        calories: 89,
        proteins: 1,
        carbs: 23,
        fats: 0.3,
      },
      {
        id: "3",
        mealType: "breakfast",
        name: "Eggs",
        grams: 100,
        calories: 155,
        proteins: 13,
        carbs: 1,
        fats: 11,
      },
      {
        id: "4",
        mealType: "breakfast",
        name: "Chicken Breast",
        grams: 200,
        calories: 330,
        proteins: 62,
        carbs: 0,
        fats: 7.4,
      },
      {
        id: "5",
        mealType: "breakfast",
        name: "Broccoli",
        grams: 100,
        calories: 55,
        proteins: 3.7,
        carbs: 11,
        fats: 0.6,
      },
    ],
    lunch: [],
    dinner: [],
    snacks: [
      {
        id: "6",
        mealType: "snacks",
        name: "Almonds",
        grams: 28,
        calories: 164,
        proteins: 6,
        carbs: 6,
        fats: 14,
      },
      {
        id: "7",
        mealType: "snacks",
        name: "Apple",
        grams: 182,
        calories: 95,
        proteins: 0.5,
        carbs: 25,
        fats: 0.3,
      },
      {
        id: "8",
        mealType: "snacks",
        name: "Yogurt",
        grams: 245,
        calories: 150,
        proteins: 8,
        carbs: 12,
        fats: 8,
      },
    ],
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

  removeFoodEntry: (mealType, entryId) =>
    set((state) => ({
      meals: {
        ...state.meals,
        [mealType]: state.meals[mealType].filter(
          (entry) => entry.id !== entryId,
        ),
      },
    })),

  editFoodEntry: (mealType, updatedEntry) =>
    set((state) => {
      const mealTypeChanged = mealType !== updatedEntry.mealType;

      if (mealTypeChanged) {
        // Remove from original meal
        const mealLogs = state.meals[mealType].filter(
          (entry) => entry.id !== updatedEntry.id,
        );

        // Add to new meal
        const updatedMeal =
          state.meals[updatedEntry.mealType!].concat(updatedEntry);

        return {
          meals: {
            ...state.meals,
            [mealType]: mealLogs,
            [updatedEntry.mealType!]: updatedMeal,
          },
        };
      } else {
        // Update within the same meal
        return {
          meals: {
            ...state.meals,
            [mealType]: state.meals[mealType].map((entry) =>
              entry.id === updatedEntry.id ? updatedEntry : entry,
            ),
          },
        };
      }
    }),
}));

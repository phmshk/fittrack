export type MealType = "breakfast" | "lunch" | "dinner" | "snacks";

export const MEAL_TYPE = ["breakfast", "lunch", "dinner", "snacks"] as const;

export interface FoodEntry {
  id: string;
  mealType: MealType;
  name: string;
  grams: number;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

export interface UserGoals {
  calorieGoal: number;
  proteinGoal: number;
  carbGoal: number;
  fatGoal: number;
}

export interface DayActions {
  addFoodEntry: (mealType: MealType, entry: Omit<FoodEntry, "id">) => void;
  removeFoodEntry: (mealType: MealType, entryId: string) => void;
  editFoodEntry: (originalMealType: MealType, updatedEntry: FoodEntry) => void;
}
export type MealsDto = Record<MealType, FoodEntry[]>;

export interface DayState {
  date: string; // ISO date string
  userGoals: UserGoals;
  meals: MealsDto;
  exerciseCalories: number;
}

export type DayStore = DayState & DayActions;

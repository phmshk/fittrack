export type MealType = "breakfast" | "lunch" | "dinner" | "snacks";

export interface FoodEntry {
  id: string;
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
}
export type MealsDto = Record<MealType, FoodEntry[]>;

export interface DayState {
  date: string; // ISO date string
  userGoals: UserGoals;
  meals: MealsDto;
  exerciseCalories: number;
}

export type DayStore = DayState & DayActions;

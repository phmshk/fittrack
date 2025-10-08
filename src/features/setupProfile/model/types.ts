import type { ApiComponents } from "@/shared/api/schema";

export type Gender = "male" | "female";
export type ActivityLevel = ApiComponents["schemas"]["User"]["activityLevel"];
export type Goal = ApiComponents["schemas"]["User"]["goal"];

export interface UserData {
  gender: Gender;
  age: number; // Age in years
  weight: number; // Weight in kilograms
  height: number; // Height in centimeters
  activityLevel: ActivityLevel;
  goal: Goal;
}

/**
 * Interface for storing the calculated macronutrient ratio in grams.
 */
export interface Macronutrients {
  proteins: number; // Protein in grams
  fats: number; // Fat in grams
  carbs: number; // Carbohydrates in grams
}

/**
 * Interface for the final calculation result.
 * Contains all key metrics.
 */
export interface CalculationResult {
  bmr: number; // Basal Metabolic Rate
  tdee: number; // Total Daily Energy Expenditure for weight maintenance
  caloriesForGoal: number; // Recommended calorie intake to achieve the goal
  macronutrients: Macronutrients; // Macronutrient distribution in grams
  waterIntake: WaterIntakeResult; // Recommended daily water intake
}

/**
 * Physical Activity Coefficients.
 * This object maps the string representation of an activity level
 * to its numerical coefficient.
 */
export const activityCoefficients: Record<
  NonNullable<ActivityLevel>,
  number
> = {
  sedentary: 1.2, // Sedentary job, no workouts
  light: 1.375, // Workouts 1-3 times a week
  moderate: 1.55, // Workouts 3-5 times a week
  active: 1.725, // Workouts 6-7 times a week
  extra_active: 1.9, // Professional athletes, heavy physical labor
};

/**
 * Macronutrient distribution (in percentage) depending on the goal.
 * For example, a higher protein share is recommended for weight loss.
 */
export const macroDistribution: Record<
  NonNullable<Goal>,
  { proteins: number; fats: number; carbs: number }
> = {
  lose_weight: { proteins: 0.35, fats: 0.3, carbs: 0.35 }, // 35% protein, 30% fat, 35% carbs
  maintain_weight: { proteins: 0.2, fats: 0.3, carbs: 0.5 }, // 20% protein, 30% fat, 50% carbs
  gain_weight: { proteins: 0.3, fats: 0.25, carbs: 0.45 }, // 30% protein, 25% fat, 45% carbs
};

/**
 * Caloric value of macronutrients per 1 gram.
 */
export const caloriesPerGram = {
  proteins: 4,
  fats: 9,
  carbs: 4,
};

/**
 * Interface for the input parameters required for the calculation.
 * Optional parameters allow for a more precise recommendation.
 */
export interface WaterIntakeParams {
  weight: number; // User's body weight in kilograms (kg)
  activityLevel: ActivityLevel; // User's physical activity level
}

/**
 * Interface for the final result of the calculation.
 * Provides results in both milliliters and liters for user convenience,
 * along with contextual recommendations.
 */
export interface WaterIntakeResult {
  baseIntakeMl: number; // The base recommendation in milliliters (ml)
  totalIntakeMl: number; // The final recommendation after adjustments (ml)
  totalIntakeLiters: number; // The final recommendation in liters (L)
  recommendations: string[]; // An array of contextual advice messages
}

/**
 * Defines the water intake multiplier (in ml per kg of body weight)
 * based on the user's activity level. More active individuals need more water.
 */
export const waterMultiplierPerKg: Record<
  NonNullable<ActivityLevel>,
  number
> = {
  sedentary: 30, // 30 ml/kg for low activity
  light: 35,
  moderate: 35,
  active: 40,
  extra_active: 40, // 40 ml/kg for high activity
};

export type ActivityLevels = {
  value: ActivityLevel;
  label: string;
  description: string;
};

export const activityLevels: ActivityLevels[] = [
  {
    value: "sedentary",
    label: "Sedentary",
    description: "Little to no exercise",
  },
  {
    value: "light",
    label: "Lightly Active",
    description: "Light exercise/sports 1-3 days/week",
  },
  {
    value: "moderate",
    label: "Moderately Active",
    description: "Moderate exercise/sports 3-5 days/week",
  },
  {
    value: "active",
    label: "Very Active",
    description: "Hard exercise/sports 6-7 days a week",
  },
  {
    value: "extra_active",
    label: "Extra Active",
    description: "Very hard exercise & physical job",
  },
] as const;

export const goals: { value: Goal; label: string }[] = [
  {
    value: "lose_weight",
    label: "Lose Weight",
  },
  {
    value: "maintain_weight",
    label: "Maintain Weight",
  },
  {
    value: "gain_weight",
    label: "Gain Weight",
  },
] as const;

/**
 * =============================================================================
 * DAILY NUTRITION GOAL CALCULATOR
 * =============================================================================
 *
 * This script calculates the daily calorie requirement and the distribution
 * of macronutrients (protein, fat, and carbohydrates) based on individual
 * user parameters such as gender, age, weight, height, physical activity
 * level, and a set goal (lose weight, maintain, or gain muscle).
 *
 * The calculations are based on the Mifflin-St Jeor equation, which is
 * currently considered one of the most accurate formulas for determining
 * Basal Metabolic Rate (BMR).
 *
 * =============================================================================
 */

import type { ActivityLevels, GoalOptions } from "../model/types";

export type Gender = "male" | "female";

export interface UserData {
  gender: Gender;
  age: number; // Age in years
  weight: number; // Weight in kilograms
  height: number; // Height in centimeters
  activityLevel: ActivityLevels;
  goal: GoalOptions;
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
  NonNullable<ActivityLevels>,
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
  NonNullable<GoalOptions>,
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
  activityLevel: ActivityLevels; // User's physical activity level
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
  NonNullable<ActivityLevels>,
  number
> = {
  sedentary: 30, // 30 ml/kg for low activity
  light: 35,
  moderate: 35,
  active: 40,
  extra_active: 40, // 40 ml/kg for high activity
};

// =============================================================================
//      CORE CALCULATION FUNCTIONS
// =============================================================================

/**
 * Calculates Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation.
 * BMR is the number of calories the body burns at rest over 24 hours
 * to maintain basic life-sustaining functions.
 *
 * @param data - User data object (weight, height, age, gender).
 * @returns - BMR value in kcal.
 */
export function calculateBMR(
  data: Pick<UserData, "weight" | "height" | "age" | "gender">,
): number {
  const { weight, height, age, gender } = data;

  // The main part of the formula, common for both men and women
  const baseFormula = 10 * weight + 6.25 * height - 5 * age;

  if (gender === "male") {
    // For men: (10 * weight) + (6.25 * height) - (5 * age) + 5
    return baseFormula + 5;
  } else {
    // For women: (10 * weight) + (6.25 * height) - (5 * age) - 161
    return baseFormula - 161;
  }
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE).
 * TDEE is the BMR multiplied by the physical activity coefficient.
 * This is the number of calories needed to maintain the current weight.
 *
 * @param bmr - The calculated Basal Metabolic Rate.
 * @param activityLevel - The user's physical activity level.
 * @returns - TDEE value in kcal.
 */
export function calculateTDEE(
  bmr: number,
  activityLevel: ActivityLevels,
): number {
  const coefficient = activityCoefficients[activityLevel!];
  return bmr * coefficient;
}

/**
 * Adjusts the daily calorie intake based on the goal.
 * A deficit is created for weight loss, and a surplus for muscle gain.
 *
 * @param tdee - Total Daily Energy Expenditure for weight maintenance.
 * @param goal - The user's goal.
 * @returns - Recommended number of calories to achieve the goal.
 */
export function adjustCaloriesForGoal(tdee: number, goal: GoalOptions): number {
  switch (goal) {
    case "lose_weight":
      // Create a 15% deficit for safe weight loss
      return tdee * 0.85;
    case "gain_weight":
      // Create a 15% surplus for muscle gain
      return tdee * 1.15;
    case "maintain_weight":
    default:
      // For weight maintenance, the calorie count remains unchanged
      return tdee;
  }
}

/**
 * Calculates the macronutrient distribution in grams based on the target calorie intake.
 *
 * @param caloriesForGoal - The recommended daily calorie intake.
 * @param goal - The user's goal (to select the macro percentage ratio).
 * @returns - An object with the amount of protein, fat, and carbs in grams.
 */
export function calculateMacronutrients(
  caloriesForGoal: number,
  goal: GoalOptions,
): Macronutrients {
  const distribution = macroDistribution[goal!];

  const proteinCalories = caloriesForGoal * distribution.proteins;
  const fatsCalories = caloriesForGoal * distribution.fats;
  const carbsCalories = caloriesForGoal * distribution.carbs;

  return {
    proteins: Math.round(proteinCalories / caloriesPerGram.proteins),
    fats: Math.round(fatsCalories / caloriesPerGram.fats),
    carbs: Math.round(carbsCalories / caloriesPerGram.carbs),
  };
}

export function calculateWaterIntake(
  params: WaterIntakeParams,
): WaterIntakeResult {
  const { weight, activityLevel } = params;

  // Step 1: Calculate the base water intake based on weight and activity level.
  const multiplier = waterMultiplierPerKg[activityLevel!];
  const baseIntakeMl = weight * multiplier;

  const totalIntakeMl = baseIntakeMl;
  const recommendations: string[] = [
    `For your weight and activity level, a base intake of ${Math.round(baseIntakeMl / 100) * 100} ml is a good starting point.`,
  ];

  const totalIntakeLiters = totalIntakeMl / 1000;

  return {
    baseIntakeMl: Math.round(baseIntakeMl),
    totalIntakeMl: Math.round(totalIntakeMl),
    totalIntakeLiters: parseFloat(totalIntakeLiters.toFixed(1)), // Round to one decimal place
    recommendations,
  };
}

// =============================================================================
//      MAIN FUNCTION
// =============================================================================

/**
 * The main function that combines all calculation steps.
 * Function to calculate daily calorie needs and macronutrient distribution
 * based on user data.
 *
 * @param userData - Complete data about the user.
 * @returns - A CalculationResult object with all the final data.
 */
export function calculateDailyNeeds(userData: UserData): CalculationResult {
  // Step 1: Calculate Basal Metabolic Rate (BMR)
  const bmr = calculateBMR(userData);

  // Step 2: Calculate Total Daily Energy Expenditure (TDEE)
  const tdee = calculateTDEE(bmr, userData.activityLevel);

  // Step 3: Adjust calories for the goal
  const caloriesForGoal = adjustCaloriesForGoal(tdee, userData.goal);

  // Step 4: Calculate macronutrients
  const macronutrients = calculateMacronutrients(
    caloriesForGoal,
    userData.goal,
  );

  // Step 5: Calculate water intake
  const waterIntake = calculateWaterIntake({
    weight: userData.weight,
    activityLevel: userData.activityLevel,
  });
  // Return the final object, rounding values for convenience
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    caloriesForGoal: Math.round(caloriesForGoal),
    macronutrients,
    waterIntake,
  };
}

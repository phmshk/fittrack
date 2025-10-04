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

import {
  type UserData,
  type ActivityLevel,
  activityCoefficients,
  type Goal,
  type Macronutrients,
  macroDistribution,
  caloriesPerGram,
  type CalculationResult,
  type WaterIntakeParams,
  type WaterIntakeResult,
  waterMultiplierPerKg,
} from "../model/types";

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
function calculateBMR(
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
function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
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
function adjustCaloriesForGoal(tdee: number, goal: Goal): number {
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
function calculateMacronutrients(
  caloriesForGoal: number,
  goal: Goal,
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

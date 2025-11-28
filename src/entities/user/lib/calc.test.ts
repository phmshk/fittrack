import { describe, it, expect } from "vitest";
import {
  calculateBMR,
  calculateTDEE,
  calculateWaterIntake,
  calculateMacronutrients,
  calculateDailyNeeds,
  type UserData,
  adjustCaloriesForGoal,
} from "./calc";
import type { ActivityLevels } from "../model/types";

describe("User Calculations (Unit)", () => {
  // --- 1. BMR (уже было) ---
  describe("calculateBMR", () => {
    it("calculates correctly for a male", () => {
      const input: UserData = {
        gender: "male",
        weight: 80,
        height: 180,
        age: 30,
        activityLevel: "sedentary",
        goal: "maintain_weight",
      };
      expect(calculateBMR(input)).toBeCloseTo(1780, 0);
    });

    it("calculates correctly for a female", () => {
      const input: UserData = {
        gender: "female",
        weight: 60,
        height: 165,
        age: 25,
        activityLevel: "sedentary",
        goal: "maintain_weight",
      };
      expect(calculateBMR(input)).toBeCloseTo(1345.25, 1);
    });
  });

  describe("calculateTDEE", () => {
    const mockBmr = 2000;
    const testCases = [
      { activity: "sedentary", expected: 2000 * 1.2 },
      { activity: "light", expected: 2000 * 1.375 },
      { activity: "moderate", expected: 2000 * 1.55 },
      { activity: "active", expected: 2000 * 1.725 },
      { activity: "extra_active", expected: 2000 * 1.9 },
    ];

    it.each(testCases)(
      "applies correct multiplier for $activity activity",
      ({ activity, expected }) => {
        const result = calculateTDEE(mockBmr, activity as ActivityLevels);
        expect(result).toBeCloseTo(expected, 0);
      },
    );
  });

  describe("calculateDailyCalories (Goal Adjustment)", () => {
    const mockTdee = 2500;

    it("subtracts calories for weight loss", () => {
      const result = adjustCaloriesForGoal(mockTdee, "lose_weight", "male");
      expect(result).toBeLessThan(mockTdee);
      expect(result).toBeCloseTo(mockTdee * 0.85, -1);
    });

    it("adds calories for weight gain", () => {
      const result = adjustCaloriesForGoal(mockTdee, "gain_weight", "male");
      expect(result).toBeGreaterThan(mockTdee * 1.15 - 1);
    });
  });

  describe("calculateWaterIntake", () => {
    it("calculates base water intake based on weight", () => {
      const weight = 80;

      const result = calculateWaterIntake({
        weight,
        activityLevel: "sedentary",
      });

      expect(result.baseIntakeMl).toBe(weight * 30);
    });

    it("increases water intake for high activity", () => {
      const weight = 80;
      const lowActivity = calculateWaterIntake({
        weight,
        activityLevel: "sedentary",
      });
      const highActivity = calculateWaterIntake({
        weight,
        activityLevel: "extra_active",
      });

      expect(highActivity.baseIntakeMl).toBeGreaterThan(
        lowActivity.baseIntakeMl,
      );
    });
  });

  describe("calculateMacronutrients", () => {
    const dailyCalories = 2000;

    it("splits macros correctly for maintenance (Balanced)", () => {
      const result = calculateMacronutrients(dailyCalories, "maintain_weight");

      const proteinCals = result.proteins * 4;
      const fatCals = result.fats * 9;
      const carbCals = result.carbs * 4;

      const total = proteinCals + fatCals + carbCals;

      expect(total).toBeCloseTo(dailyCalories, -1);
    });
  });

  describe("calculateDailyNeeds (Full Flow)", () => {
    it("returns complete object with all calculated fields", () => {
      const input: UserData = {
        gender: "male",
        weight: 70,
        height: 175,
        age: 25,
        activityLevel: "moderate",
        goal: "lose_weight",
      };

      const result = calculateDailyNeeds(input);

      expect(result).toHaveProperty("bmr");
      expect(result).toHaveProperty("tdee");
      expect(result).toHaveProperty("caloriesForGoal");
      expect(result).toHaveProperty("macronutrients");
      expect(result).toHaveProperty("waterIntake");
    });
  });
});

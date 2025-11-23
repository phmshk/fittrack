import { renderHook } from "@testing-library/react";
import { useDaySummary } from "./useDaySummary";
import { describe, it, expect } from "vitest";
import type { FoodLog } from "@/entities/day";
import type { DailyTargets } from "@/entities/user";

const mockGoals: DailyTargets = {
  targetCalories: 2000,
  targetProteins: 150,
  targetCarbs: 250,
  targetFats: 70,
  targetWaterIntake: 2000,
};

const mockFoodLogs: FoodLog[] = [
  {
    id: "1",
    date: "2023-01-01",
    mealType: "breakfast",
    name: "Oatmeal",
    calories: 150,
    proteins: 5,
    carbs: 27,
    fats: 3,
    saturatedFats: 0,
    sugars: 1,
    grams: 100,
  },
  {
    id: "2",
    date: "2023-01-01",
    mealType: "lunch",
    name: "Chicken Breast",
    calories: 165,
    proteins: 31,
    carbs: 0,
    fats: 3.6,
    saturatedFats: 1,
    sugars: 0,
    grams: 100,
  },
];

describe("useDaySummary Hook", () => {
  it("correctly calculates consumed and remaining nutrients", () => {
    const { result } = renderHook(() => useDaySummary(mockFoodLogs, mockGoals));

    expect(result.current.consumedCalories).toBe(315);
    expect(result.current.consumedProteins).toBe(36);
    expect(result.current.consumedFats).toBe(6.6);
    expect(result.current.remainingCalories).toBe(1685);
    expect(result.current.remainingProteins).toBe(114);
    expect(result.current.caloriesProgress).toBe(15.8);
  });

  it("handles empty food logs correctly", () => {
    const { result } = renderHook(() => useDaySummary([], mockGoals));

    expect(result.current.consumedCalories).toBe(0);
    expect(result.current.remainingCalories).toBe(2000);
    expect(result.current.caloriesProgress).toBe(0);
  });

  it("handles undefined goals gracefully", () => {
    const { result } = renderHook(() => useDaySummary(mockFoodLogs, undefined));

    expect(result.current.consumedCalories).toBe(315);
    expect(result.current.remainingCalories).toBe(-315);
  });
});

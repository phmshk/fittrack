import type { DaySummary } from "@/entities/day";
import type { DailyTargets } from "@/entities/user";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CaloriesCard } from "./CaloriesCard";
import "@testing-library/jest-dom";

const MockTargets: DailyTargets = {
  targetCalories: 2000,
  targetProteins: 150,
  targetCarbs: 250,
  targetFats: 70,
  targetWaterIntake: 2000,
};

describe("CaloriesCard", () => {
  it("displays data when under goal correctly", () => {
    const underGoalSummary: DaySummary = {
      consumedCalories: 1500,
      consumedProteins: 100,
      consumedFats: 50,
      consumedSaturatedFats: 10,
      consumedCarbs: 200,
      consumedSugars: 30,
      remainingCalories: 500,
      remainingProteins: 50,
      remainingFats: 20,
      remainingCarbs: 50,
      caloriesProgress: 75,
      proteinsProgress: 66.67,
      fatsProgress: 71.43,
      carbsProgress: 80,
    };

    render(<CaloriesCard userGoals={MockTargets} summary={underGoalSummary} />);

    const remainingText = screen.getAllByText("caloriesRemaining");
    const detailsText = screen.getByText("goal: 2000 | eaten: 1500");
    expect(remainingText[0]).toBeInTheDocument();
    expect(remainingText[0]).not.toHaveClass("text-destructive");
    expect(detailsText).toBeInTheDocument();
  });

  it("displays over goal calories correctly", () => {
    const overGoalSummary: DaySummary = {
      consumedCalories: 2200,
      consumedProteins: 160,
      consumedFats: 80,
      consumedSaturatedFats: 15,
      consumedCarbs: 260,
      consumedSugars: 40,
      remainingCalories: -200,
      remainingProteins: -10,
      remainingFats: -10,
      remainingCarbs: -10,
      caloriesProgress: 110,
      proteinsProgress: 106.67,
      fatsProgress: 114.29,
      carbsProgress: 104,
    };

    render(<CaloriesCard userGoals={MockTargets} summary={overGoalSummary} />);
    const overText = screen.getAllByText("caloriesOverGoal");
    expect(overText[0]).toBeInTheDocument();
    expect(overText[0]).toHaveClass("text-destructive");
  });
});

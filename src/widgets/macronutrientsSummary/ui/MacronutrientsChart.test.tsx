import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MacronutrientsChart } from "./MacronutrientsChart";
import type { DaySummary } from "@/entities/day";
import "@testing-library/jest-dom";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { count: number }) => {
      if (key.includes("proteins")) return "Proteins";
      if (key.includes("fats")) return "Fats";
      if (key.includes("carbs")) return "Carbs";
      if (key.includes("kcal")) return "kcal";

      if (key === "dashboard:macrosChart.noDataForChart")
        return "No data chart";
      if (key === "nutrition:units.totalGrams") return `${options?.count} g`;

      return key;
    },
  }),
}));

vi.mock("recharts", async (importOriginal) => {
  const Original = await importOriginal<typeof import("recharts")>();
  return {
    ...Original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div
        data-testid="responsive-container"
        style={{ width: 500, height: 500 }}
      >
        {children}
      </div>
    ),
    PieChart: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="pie-chart">{children}</div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Pie: ({ data }: { data: any[] }) => (
      <div data-testid="pie-component">
        {data.map((item) => (
          <div key={item.name} data-testid="pie-cell">
            {item.name}: {item.value}
          </div>
        ))}
      </div>
    ),
  };
});

describe("MacronutrientsChart", () => {
  it("renders chart and legend correctly when data is provided", () => {
    const mockData: DaySummary = {
      consumedCalories: 2000,
      consumedProteins: 100,
      consumedFats: 50,
      consumedCarbs: 200,
      remainingCalories: 0,
      remainingProteins: 0,
      remainingFats: 0,
      remainingCarbs: 0,
      caloriesProgress: 0,
      proteinsProgress: 0,
      fatsProgress: 0,
      carbsProgress: 0,
    };

    render(<MacronutrientsChart daySummary={mockData} />);

    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();

    expect(screen.getByText("Proteins: 100")).toBeInTheDocument();
    expect(screen.getByText("Fats: 50")).toBeInTheDocument();
    expect(screen.getByText("Carbs: 200")).toBeInTheDocument();

    expect(screen.getAllByText("Proteins").length).toBeGreaterThan(0);

    expect(screen.getByText(/100 g/)).toBeInTheDocument();
    expect(screen.getByText(/50 g/)).toBeInTheDocument();
    expect(screen.getByText(/200 g/)).toBeInTheDocument();
  });

  it("shows 'no data' message when consumed calories are 0", () => {
    const emptyData: DaySummary = {
      consumedCalories: 0,
      consumedProteins: 0,
      consumedFats: 0,
      consumedCarbs: 0,
      remainingCalories: 0,
      remainingProteins: 0,
      remainingFats: 0,
      remainingCarbs: 0,
      caloriesProgress: 0,
      proteinsProgress: 0,
      fatsProgress: 0,
      carbsProgress: 0,
    };

    render(<MacronutrientsChart daySummary={emptyData} />);

    expect(screen.queryByTestId("pie-chart")).not.toBeInTheDocument();

    expect(screen.getByText("No data chart")).toBeInTheDocument();
  });
});

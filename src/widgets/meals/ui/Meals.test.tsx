import { render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { Meals } from "./Meals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import type { FoodLog } from "@/entities/day";
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

const renderWithClient = (ui: React.ReactNode) => {
  const testQueryClient = createTestQueryClient();
  const rootRoute = createRootRoute({
    component: () => <>{ui}</>,
    staticData: {
      showHeader: false,
      key: "",
      showBackButton: false,
      isNavRoute: false,
      showFooter: false,
    },
  });

  const router = createRouter({
    routeTree: rootRoute,
  });

  return render(
    <QueryClientProvider client={testQueryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
};

describe("Meals Widget (Integration)", () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    window.HTMLElement.prototype.hasPointerCapture = vi.fn();
    window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  });

  it("shows loading spinner if isLoading", async () => {
    renderWithClient(
      <Meals
        isLoading={true}
        foodLogs={undefined}
        date={new Date()}
        variant="full"
      />,
    );
    expect(await screen.findByText(/loading/)).toBeInTheDocument();
  });

  it("renders meal cards when data is provided", async () => {
    const mockLogs: FoodLog[] = [
      {
        id: "1",
        date: "2025-05-10",
        mealType: "lunch",
        name: "Spicy Pasta",
        calories: 500,
        proteins: 20,
        fats: 10,
        carbs: 80,
        grams: 200,
        sugars: 5,
        saturatedFats: 2,
      },
    ];
    renderWithClient(
      <Meals
        isLoading={false}
        foodLogs={mockLogs}
        date={new Date("2025-05-10")}
        variant="full"
      />,
    );
    expect(await screen.findByText(/spicy pasta/i)).toBeInTheDocument();
    expect(await screen.findByText(/500/i)).toBeInTheDocument();
  });

  it("shows empty cards when no logs exist", async () => {
    renderWithClient(
      <Meals
        isLoading={false}
        foodLogs={undefined}
        date={new Date("2025-05-10")}
        variant="full"
      />,
    );
    expect(await screen.findByText(/lunch/i)).toBeInTheDocument();
    expect(await screen.findByText(/breakfast/i)).toBeInTheDocument();
    expect(await screen.findByText(/dinner/i)).toBeInTheDocument();
    expect(await screen.findByText(/snacks/i)).toBeInTheDocument();
    expect(await screen.findAllByText(/noFoodAdded/i)).toHaveLength(4);
  });
});

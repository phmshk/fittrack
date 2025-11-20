import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import { DeleteFood } from "./DeleteFood";
import type { FoodLog } from "@/entities/day";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockMutate = vi.fn();

vi.mock("@/entities/day", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/entities/day")>();
  return {
    ...actual,
    useDeleteFoodLog: () => ({
      mutate: mockMutate,
    }),
  };
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === "common:actions.cancel") return "Cancel";
      if (key === "food:deleteFoodModal.title") return "Are you sure?";
      if (key === "common:actions.delete") return "Delete";
      return key;
    },
  }),
}));

describe("DeleteFood Feature", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders delete food dialog", async () => {
    const food: FoodLog = {
      id: "1",
      mealType: "lunch",
      name: "Apple",
      calories: 100,
      proteins: 0.5,
      fats: 0.3,
      carbs: 25,
      saturatedFats: 0.1,
      sugars: 0.2,
      grams: 100,
      date: "2025-10-10",
    };
    const setIsOpen = vi.fn();

    render(<DeleteFood food={food} isOpen={true} setIsOpen={setIsOpen} />);
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("calls mutate on delete and closes the dialog", async () => {
    const user = userEvent.setup();
    const food: FoodLog = {
      id: "1",
      mealType: "lunch",
      name: "Apple",
      calories: 100,
      proteins: 0.5,
      fats: 0.3,
      carbs: 25,
      saturatedFats: 0.1,
      sugars: 0.2,
      grams: 100,
      date: "2025-10-10",
    };
    const setIsOpen = vi.fn();

    render(<DeleteFood food={food} isOpen={true} setIsOpen={setIsOpen} />);

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    await user.click(deleteButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledTimes(1);
      expect(mockMutate).toHaveBeenCalledWith({ id: "1", date: "2025-10-10" });
      expect(setIsOpen).toHaveBeenCalledWith(false);
    });
  });

  it("closes dialog on cancel", async () => {
    const user = userEvent.setup();
    const food: FoodLog = {
      id: "1",
      mealType: "lunch",
      name: "Apple",
      calories: 100,
      proteins: 0.5,
      fats: 0.3,
      carbs: 25,
      saturatedFats: 0.1,
      sugars: 0.2,
      grams: 100,
      date: "2025-10-10",
    };
    const setIsOpen = vi.fn();

    render(<DeleteFood food={food} isOpen={true} setIsOpen={setIsOpen} />);

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    await user.click(cancelButton);

    await waitFor(() => {
      expect(mockMutate).not.toHaveBeenCalled();
      expect(setIsOpen).toHaveBeenCalledWith(false);
    });
  });
});

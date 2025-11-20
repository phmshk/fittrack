import { render, screen, waitFor } from "@testing-library/react";
import { AddFood } from "./AddFood";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const mockMutate = vi.fn();

vi.mock("@/entities/day", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/entities/day")>();
  return {
    ...actual,
    useAddFoodLog: () => ({
      mutate: mockMutate,
    }),
  };
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === "common:actions.addEntry") return "Add Entry";
      if (key === "food:addFoodForm.title") return "Add Food";
      if (key === "food:addFoodFormFields.mealType") return "Meal Type";
      if (key === "food:addFoodFormFields.name") return "Name";
      if (key === "food:addFoodFormFields.calories") return "Calories";
      if (key === "food:addFoodFormFields.proteins") return "Proteins";
      if (key === "food:addFoodFormFields.fats") return "Fats";
      if (key === "food:addFoodFormFields.carbs") return "Carbohydrates";
      if (key === "nutrition:meals.lunch") return "Lunch";
      return key;
    },
  }),
}));

describe("AddFood Feature", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("opens modal", async () => {
    const user = userEvent.setup();
    const date = new Date();

    render(
      <AddFood triggerButtonProps={{ children: "Open Modal" }} date={date} />,
    );

    const openButton = screen.getByText("Open Modal");
    await user.click(openButton);

    expect(screen.getByText("Add Food")).toBeInTheDocument();
  });

  it("submits form if data is correct", async () => {
    const user = userEvent.setup();
    const date = new Date("2025-10-10");

    window.HTMLElement.prototype.hasPointerCapture = vi.fn();
    window.HTMLElement.prototype.releasePointerCapture = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();

    render(
      <AddFood triggerButtonProps={{ children: "Open Modal" }} date={date} />,
    );

    const openButton = screen.getByText("Open Modal");
    expect(openButton).toBeInTheDocument();
    await user.click(openButton);

    const nameInput = screen.getByLabelText("Name");
    const caloriesInput = screen.getByLabelText("Calories");
    const proteinsInput = screen.getByLabelText("Proteins");
    const fatsInput = screen.getByLabelText("Fats");
    const carbsInput = screen.getByLabelText("Carbohydrates");
    const submitButton = screen.getByText("Add Entry");

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    await user.click(select);

    const lunch = screen.getByRole("option", { name: "Lunch" });
    expect(lunch).toBeInTheDocument();
    await user.click(lunch);

    await user.type(nameInput, "Apple");
    await user.type(caloriesInput, "95");
    await user.type(proteinsInput, "0.5");
    await user.type(fatsInput, "0.3");
    await user.type(carbsInput, "25");

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledTimes(1);
      expect(mockMutate).toHaveBeenCalledWith({
        mealType: "lunch",
        name: "Apple",
        calories: "95",
        proteins: "0.5",
        fats: "0.3",
        carbs: "25",
        sugars: "",
        saturatedFats: "",
        grams: "",
        date: "2025-10-10",
      });
    });
  });

  it("does not submit form if data is incorrect", async () => {
    const user = userEvent.setup();
    const date = new Date("2025-10-10");

    render(
      <AddFood triggerButtonProps={{ children: "Open Modal" }} date={date} />,
    );

    const openButton = screen.getByText("Open Modal");
    expect(openButton).toBeInTheDocument();
    await user.click(openButton);

    const submitButton = screen.getByText("Add Entry");

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).not.toHaveBeenCalled();
    });
  });

  it("shows initial data in the form", async () => {
    const user = userEvent.setup();
    const date = new Date("2025-10-10");

    render(
      <AddFood
        triggerButtonProps={{ children: "Open Modal" }}
        date={date}
        initialData={{ mealType: "lunch", name: "Banana", calories: "105" }}
      />,
    );

    const openButton = screen.getByText("Open Modal");
    expect(openButton).toBeInTheDocument();
    await user.click(openButton);

    const select = screen.getByRole("combobox", {
      name: "Meal Type",
    }) as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent("Lunch");

    const nameInput = screen.getByLabelText("Name") as HTMLInputElement;
    expect(nameInput.value).toBe("Banana");

    const caloriesInput = screen.getByLabelText("Calories") as HTMLInputElement;
    expect(caloriesInput.value).toBe("105");
  });

  it("closes modal on form submission", async () => {
    const user = userEvent.setup();
    const date = new Date("2025-10-10");

    render(
      <AddFood triggerButtonProps={{ children: "Open Modal" }} date={date} />,
    );

    const openButton = screen.getByText("Open Modal");
    expect(openButton).toBeInTheDocument();
    await user.click(openButton);

    const nameInput = screen.getByLabelText("Name");
    const caloriesInput = screen.getByLabelText("Calories");
    const proteinsInput = screen.getByLabelText("Proteins");
    const fatsInput = screen.getByLabelText("Fats");
    const carbsInput = screen.getByLabelText("Carbohydrates");
    const submitButton = screen.getByText("Add Entry");

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    await user.click(select);

    const lunch = screen.getByRole("option", { name: "Lunch" });
    expect(lunch).toBeInTheDocument();
    await user.click(lunch);

    await user.type(nameInput, "Apple");
    await user.type(caloriesInput, "95");
    await user.type(proteinsInput, "0.5");
    await user.type(fatsInput, "0.3");
    await user.type(carbsInput, "25");

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledTimes(1);
      expect(screen.queryByText("Add Food")).not.toBeInTheDocument();
    });
  });
});

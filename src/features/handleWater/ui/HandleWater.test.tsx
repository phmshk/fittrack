import { render, screen, fireEvent } from "@testing-library/react";
import { HandleWater } from "./HandleWater";
import { vi, describe, it, expect } from "vitest";
import { WATER_PORTION_ML } from "@/widgets/waterTracker/ui/WaterTracker";
import "@testing-library/jest-dom";

// Mock translations
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { count: number }) => {
      if (key === "nutrition:units.ml") return "ml";
      if (key === "nutrition:water.decreaseAmount")
        return "Decrease water amount";
      if (key === "nutrition:water.increaseAmount")
        return "Increase water amount";
      if (key === "dashboard:waterTracker.mlToGo")
        return `${options?.count} ml to go`;
      if (key === "dashboard:waterTracker.goalReached") return "Goal reached";
      return key;
    },
  }),
}));

describe("HandleWater", () => {
  const defaultProps = {
    currentAmount: 500,
    onUpdate: vi.fn(),
    isPending: false,
    waterPortion: WATER_PORTION_ML,
    target: 2000,
  };

  it("renders correctly", () => {
    render(<HandleWater {...defaultProps} />);
    const decreaseButton = screen.getByLabelText("Decrease water amount");
    const increaseButton = screen.getByLabelText("Increase water amount");
    const amountText = screen.getByText("1500 ml to go");
    const portionText = screen.getByText(`${WATER_PORTION_ML}ml`);

    expect(decreaseButton).toBeInTheDocument();
    expect(increaseButton).toBeInTheDocument();

    expect(amountText).toBeInTheDocument();
    expect(portionText).toBeInTheDocument();
  });

  it("calls onUpdate with increased amount when Plus button is clicked", () => {
    render(<HandleWater {...defaultProps} />);
    const increaseButton = screen.getByLabelText("Increase water amount");

    fireEvent.click(increaseButton);
    expect(defaultProps.onUpdate).toHaveBeenCalledWith(500 + WATER_PORTION_ML);
  });

  it("calls onUpdate with decreased amount when Minus button is clicked", () => {
    render(<HandleWater {...defaultProps} />);
    const decreaseButton = screen.getByLabelText("Decrease water amount");
    fireEvent.click(decreaseButton);
    expect(defaultProps.onUpdate).toHaveBeenCalledWith(500 - WATER_PORTION_ML);
  });

  it("disables Minus button when currentAmount is 0", () => {
    render(<HandleWater {...defaultProps} currentAmount={0} />);
    const decreaseButton = screen.getByLabelText("Decrease water amount");
    expect(decreaseButton).toBeDisabled();
  });

  it("disables Plus button when currentAmount is equal to target", () => {
    render(<HandleWater {...defaultProps} currentAmount={2000} />);
    const increaseButton = screen.getByLabelText("Increase water amount");
    expect(increaseButton).toBeDisabled();
  });

  it("disables buttons when isPending is true", () => {
    render(<HandleWater {...defaultProps} isPending={true} />);
    const decreaseButton = screen.getByLabelText("Decrease water amount");
    const increaseButton = screen.getByLabelText("Increase water amount");
    expect(decreaseButton).toBeDisabled();
    expect(increaseButton).toBeDisabled();
  });

  it("shows 'Goal reached' when target is met", () => {
    render(<HandleWater {...defaultProps} currentAmount={2000} />);
    expect(screen.getByText("Goal reached")).toBeInTheDocument();
  });
});

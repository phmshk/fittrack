import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ScanBarcodeButton } from "./ScanBarcodeButton";
import { vi, describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

// Mock translations
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => defaultValue || key,
  }),
}));

// Mock UserCamera to avoid testing its internal logic here
vi.mock("../model/UserCamera", () => ({
  UserCamera: ({
    onScanSuccess,
  }: {
    onScanSuccess: (code: string) => void;
  }) => (
    <div data-testid="user-camera-mock">
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <button onClick={() => onScanSuccess("123456")}>Simulate Scan</button>
    </div>
  ),
}));

describe("ScanBarcodeButton", () => {
  const defaultProps = {
    onScanSuccess: vi.fn(),
  };

  it("renders the button correctly", () => {
    render(<ScanBarcodeButton {...defaultProps} />);
    expect(screen.getByLabelText("Scan barcode")).toBeInTheDocument();
  });

  it("opens the dialog when clicked", async () => {
    render(<ScanBarcodeButton {...defaultProps} />);
    const button = screen.getByLabelText("Scan barcode");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Scan Barcode")).toBeInTheDocument();
    });
  });

  it("renders UserCamera inside the dialog", async () => {
    render(<ScanBarcodeButton {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Scan barcode"));

    await waitFor(() => {
      expect(screen.getByTestId("user-camera-mock")).toBeInTheDocument();
    });
  });

  it("passes onScanSuccess to UserCamera", async () => {
    render(<ScanBarcodeButton {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Scan barcode"));

    await waitFor(() => {
      expect(screen.getByTestId("user-camera-mock")).toBeInTheDocument();
    });

    // Simulate scan in the mock
    fireEvent.click(screen.getByText("Simulate Scan"));

    expect(defaultProps.onScanSuccess).toHaveBeenCalledWith("123456");
  });
});

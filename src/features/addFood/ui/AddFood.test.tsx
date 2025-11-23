import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { AddFood } from "./AddFood";
import { userDb } from "@/mocks/db/user.db";
import { useSessionStore } from "@/entities/user";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithClient = (ui: ReactNode) => {
  const testQueryClient = createTestQueryClient();
  return {
    ...render(
      <QueryClientProvider client={testQueryClient}>
        {ui}
        <Toaster />
      </QueryClientProvider>,
    ),
    queryClient: testQueryClient,
  };
};

describe("AddFood Feature", () => {
  // Mock scrollIntoView and pointer capture methods for tests as they are not implemented in JSDOM
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    window.HTMLElement.prototype.hasPointerCapture = vi.fn();
    window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  });

  it("adds food entry via API successfully", async () => {
    const user = userEvent.setup();
    const date = new Date("2025-10-10");

    // Simulate user login by creating a session and setting the session store
    const { accessToken } = await userDb.createSession("test-user-id");

    useSessionStore.setState({
      user: {
        id: "test-user-id",
        name: "Test User",
        email: "test@example.com",
      },
      token: accessToken,
      isAuthenticated: true,
    });

    renderWithClient(
      <AddFood date={date} triggerButtonProps={{ children: "Open Modal" }} />,
    );

    await user.click(screen.getByRole("button", { name: /open modal/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const mealTypeSelect = screen.getByRole("combobox");
    await user.click(mealTypeSelect);

    const lunchOption = screen.getByRole("option", { name: /lunch/i });
    await user.click(lunchOption);

    await user.type(screen.getByLabelText(/name/i), "Apple");
    await user.type(screen.getByLabelText(/calories/i), "95");
    await user.type(screen.getByLabelText(/proteins/i), "0.5");
    await user.type(screen.getByLabelText(/carb/i), "25");
    await user.type(screen.getByLabelText(/^fats/i), "0.3");

    const submitButton = screen.getByRole("button", { name: /addEntry/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});

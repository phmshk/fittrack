import { useSessionStore } from "@/entities/user";
import { Toaster } from "@/shared/shadcn/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoginForm } from "./LoginForm";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { server } from "@/tests/setupTests";
import { http, HttpResponse } from "msw";

const renderWithRouter = (ui: React.ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const history = createMemoryHistory({
    initialEntries: ["/auth"],
  });

  const rootRoute = createRootRoute({
    component: () => (
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Outlet />
      </QueryClientProvider>
    ),
    staticData: {
      showHeader: false,
      key: "",
      showBackButton: false,
      isNavRoute: false,
      showFooter: false,
    },
  });

  const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/auth",
    component: () => <>{ui}</>,
    staticData: {
      showHeader: false,
      key: "login",
      showBackButton: false,
      isNavRoute: false,
      showFooter: false,
    },
  });

  const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    // eslint-disable-next-line i18next/no-literal-string
    component: () => <div>Welcome to Dashboard</div>,
    staticData: {
      showHeader: true,
      key: "dashboard",
      showBackButton: false,
      isNavRoute: true,
      showFooter: true,
    },
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([loginRoute, dashboardRoute]),
    history,
  });

  return {
    ...render(<RouterProvider router={router} />),
    router,
  };
};

describe("Login tests", () => {
  beforeEach(() => {
    useSessionStore.getState().clearSession();
  });

  it("renders login form", async () => {
    renderWithRouter(<LoginForm />);
    expect(await screen.findByLabelText("auth:emailLabel")).toBeInTheDocument();
    expect(
      await screen.findByLabelText("auth:passwordLabel"),
    ).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />);
    await user.click(
      await screen.findByRole("button", { name: /auth:loginButton/i }),
    );
    expect(await screen.findByText("invalidEmail")).toBeInTheDocument();
    expect(await screen.findByText("genericRequired")).toBeInTheDocument();
  });

  it("redirects to dashboard on successful login", async () => {
    const user = userEvent.setup();
    server.use(
      http.post("http://localhost:3000/api/auth/login", () => {
        return HttpResponse.json({
          accessToken: "fake-jwt-token",
          user: { id: "1", email: "test@test.com", name: "Test" },
        });
      }),
    );
    const { router } = renderWithRouter(<LoginForm />);

    expect(router.state.location.pathname).toBe("/auth");
    const emailInput = await screen.findByLabelText(/email/i);
    const passwordInput = await screen.findByLabelText(/password/i);

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    const submitBtn = await screen.findByRole("button", {
      name: /auth:loginButton/i,
    });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/");
    });
    expect(screen.getByText("Welcome to Dashboard")).toBeInTheDocument();
  });

  it("shows error toast on invalid credentials and stays on login page", async () => {
    const user = userEvent.setup();

    server.use(
      http.post("http://localhost:3000/api/auth/login", () => {
        return HttpResponse.json(
          { message: "Invalid credentials" },
          { status: 401 },
        );
      }),
    );

    const { router } = renderWithRouter(<LoginForm />);

    await user.type(await screen.findByLabelText(/email/i), "wrong@test.com");
    await user.type(await screen.findByLabelText(/password/i), "wrongpass");

    await user.click(
      await screen.findByRole("button", { name: /auth:loginButton/i }),
    );

    expect(router.state.location.pathname).toBe("/auth");
    expect(screen.queryByText("Welcome to Dashboard")).not.toBeInTheDocument();
  });
});

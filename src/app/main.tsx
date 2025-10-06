import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { routeTree } from "@/routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { QueryProvider } from "./providers/queryProvider";
import { App } from "./App";

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  // Define custom state for accessing the addFood route only from the mealCard
  interface HistoryState {
    // Optional state to track navigation source for /addFood route so it can only be accessed from mealCard
    from?: "mealCard";
  }

  // Define custom static data for routes
  interface StaticDataRouteOption {
    // Whether to show the header for this route
    showHeader: boolean;
    // Title to display in the header for this route empty string to show app logo
    title: string;
    // Whether to show a back button in the header for this route
    showBackButton: boolean;
    // Whether this route is part of the main navigation (e.g., Dashboard, Diary)
    isNavRoute: boolean;
  }
}

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("@/mocks/worker");

  return worker.start();
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);

  enableMocking().then(() => {
    root.render(
      <StrictMode>
        <QueryProvider>
          <App />
        </QueryProvider>
      </StrictMode>,
    );
  });
}

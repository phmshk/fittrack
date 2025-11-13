import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { routeTree } from "@/routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { QueryProvider } from "./providers/queryProvider";
import { App } from "./App";
import type { NavTab } from "@/shared/model";
import { ThemeEffect } from "@/entities/theme";
import { Spinner } from "@/shared/ui/spinner";
import "@/shared/config/i18n/i18nConfiguration";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.setup";
import { useSessionStore, type UserSession } from "@/entities/user";

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
  // Define custom state for history entries
  interface HistoryState {
    // Optional state to track navigation source for /addFood route so it can only be accessed from a link which sets state { from: "allowedToAddFood" }
    from?: "allowedToAddFood";
  }

  /**
   * Static data options for each route
   * This can be used to control layout and navigation behavior based on the route
   * for mobile layout
   */
  interface StaticDataRouteOption {
    // Whether to show the header for this route for mobile devices
    showHeader: boolean;
    // Whether to show the mobile header navigation (hamburger menu) for this route
    showMobileHeaderNav?: boolean;
    // Whether to show the profile link in the header for this route (mobile only)
    emptyHeader?: boolean;
    // Whether to show the footer for this route for mobile devices
    showFooter: boolean;
    // Key for this route to be shown on mobile devices. Empty string to show app logo.
    key: string;
    // Whether to show a back button in the header for this route on mobile devices
    showBackButton: boolean;
    // Whether this route is part of the main navigation (e.g., Dashboard, Diary)
    isNavRoute: boolean;
    // Optional icon for the navigation link
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    // Optional tabs for the navigation link
    navTabs?: Array<NavTab>;
  }
}

// App initialization either enable mocking or start the with firebase
async function startApp() {
  if (import.meta.env.VITE_USE_MOCKS === "true") {
    console.log("Starting app with mocks");
    const { worker } = await import("@/mocks/worker");

    return worker.start();
  } else {
    return new Promise<void>((resolve) => {
      let resolved = false;
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const token = await user.getIdToken();
            const session: UserSession = {
              accessToken: token,
              refreshToken: user.refreshToken,
              user: {
                id: user.uid,
                email: user.email!,
                name: user.displayName || "",
              },
            };
            useSessionStore.getState().setSession(session);
          } catch (error) {
            console.error("Error fetching user token:", error);
            useSessionStore.getState().clearSession();
          }
        } else {
          useSessionStore.getState().clearSession();
        }

        if (!resolved) {
          resolved = true;
          resolve();
        }
      });
    });
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);

  startApp().then(() => {
    root.render(
      <StrictMode>
        <QueryProvider>
          <Suspense
            fallback={
              <Spinner text="Loading..." className="h-screen w-screen" />
            }
          >
            <App />
            <ThemeEffect />
          </Suspense>
        </QueryProvider>
      </StrictMode>,
    );
  });
}

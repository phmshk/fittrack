import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserSession } from "./types";

interface SessionState {
  session: UserSession | null;
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setSession: (session: UserSession) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      user: null,
      token: null,
      isAuthenticated: false,
      setSession: (session) =>
        set({
          session,
          user: session.user,
          token: session.accessToken,
          isAuthenticated: true,
        }),
      clearSession: () =>
        set({ session: null, user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-session-storage",
    },
  ),
);

/**
 *  Hook to access current user data from the session store.
 * @returns {User | null} The current authenticated user or null if not authenticated.
 */
export const useCurrentUser = () => useSessionStore((state) => state.user);

/**
 *  Hook to access authentication status from the session store.
 * @returns {boolean} True if the user is authenticated, false otherwise.
 */

export const useIsAuthenticated = () =>
  useSessionStore((state) => state.isAuthenticated);

/**
 *  Hook to access the authentication token from the session store.
 * @returns {string | null} The current authentication token or null if not authenticated.
 */
export const useAuthToken = () => useSessionStore((state) => state.token);

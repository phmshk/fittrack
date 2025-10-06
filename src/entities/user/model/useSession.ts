import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BaseUser, UserSession } from "./types";

interface SessionState {
  user: BaseUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setSession: (session: UserSession) => void;
  updateUser: (user: Partial<BaseUser>) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setSession: (session) => {
        return set({
          user: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
          },
          token: session.accessToken,
          isAuthenticated: true,
        });
      },
      updateUser: (user) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...user } : null,
        })),
      clearSession: () =>
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-session-storage",
    },
  ),
);

export const useCurrentUser = () => useSessionStore((state) => state.user);

export const useIsAuthenticated = () =>
  useSessionStore((state) => state.isAuthenticated);

export const useAuthToken = () => useSessionStore((state) => state.token);

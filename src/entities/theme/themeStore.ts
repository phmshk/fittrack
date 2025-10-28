import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const STORAGE_KEY = "vite-ui-theme";

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system",

      setTheme: (newTheme) => set({ theme: newTheme }),
    }),
    {
      name: STORAGE_KEY,
    },
  ),
);

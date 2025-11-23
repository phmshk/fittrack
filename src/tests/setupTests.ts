import { setupServer } from "msw/node";
import { afterEach, beforeAll, vi } from "vitest";
import { handlers } from "@/mocks/handlers/mswHandlers";

export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});

afterAll(() => {
  server.close();
});

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const parts = key.split(".");
      return parts[parts.length - 1] || key;
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: "en",
    },
  }),
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}));

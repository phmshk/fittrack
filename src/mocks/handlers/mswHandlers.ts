import { http, passthrough } from "msw";
import { openFoodFactsHandlers } from "./openFoodFactsHandlers";
import { foodLogsHandlers } from "./foodLogsHandlers";
import { userGoalsHandlers } from "./userGoalsHandlers";
import { authHandlers } from "./authHandlers";

export const handlers = [
  // Allow passthrough for image requests to avoid blocking images
  http.get("https://placehold.co/*", () => {
    return passthrough();
  }),
  ...openFoodFactsHandlers,
  ...foodLogsHandlers,
  ...userGoalsHandlers,
  ...authHandlers,
];

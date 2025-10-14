import { http, passthrough } from "msw";
import { openFoodFactsHandlers } from "./openFoodFactsHandlers";
import { foodLogsHandlers } from "./foodLogsHandlers";
import { usersHandlers } from "./userHandlers";
import { authHandlers } from "./authHandlers";
import { weightLogHandlers } from "./weightLogsHandlers";
import { waterLogsHandlers } from "./waterLogsHandlers";

export const handlers = [
  // Allow passthrough for image requests to avoid blocking images
  http.get("https://placehold.co/*", () => {
    return passthrough();
  }),
  ...openFoodFactsHandlers,
  ...foodLogsHandlers,
  ...usersHandlers,
  ...authHandlers,
  ...weightLogHandlers,
  ...waterLogsHandlers,
];

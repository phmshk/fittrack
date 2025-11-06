import { http, passthrough } from "msw";
import { openFoodFactsHandlers } from "./openFoodFactsHandlers";
import { foodLogsHandlers } from "./foodLogsHandlers";
import { usersHandlers } from "./userHandlers";
import { authHandlers } from "./authHandlers";
import { weightLogHandlers } from "./weightLogsHandlers";
import { waterLogsHandlers } from "./waterLogsHandlers";
import { CONFIG } from "@/shared/model";

export const handlers = [
  // Allow passthrough for image requests to avoid blocking images
  http.get("https://placehold.co/*", () => {
    return passthrough();
  }),
  http.get(`${CONFIG.FOOD_API_BASE_URL}//api/v2/product/*`, () => {
    return passthrough();
  }),
  // ...openFoodFactsHandlers,
  ...foodLogsHandlers,
  ...usersHandlers,
  ...authHandlers,
  ...weightLogHandlers,
  ...waterLogsHandlers,
];

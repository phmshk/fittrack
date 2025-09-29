import { setupWorker } from "msw/browser";
import { handlers } from "./handlers/mswHandlers";

export const worker = setupWorker(...handlers);

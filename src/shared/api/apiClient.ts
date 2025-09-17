import createClient from "openapi-fetch";
import type { ApiPaths } from "./schema";
import { CONFIG } from "@/shared/model/config";

export const apiClient = createClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});

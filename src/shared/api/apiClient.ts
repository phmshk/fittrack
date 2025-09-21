import createClient from "openapi-fetch";
import type { ApiPaths } from "./schema";

export const apiClient = createClient<ApiPaths>({
  baseUrl: "/api",
});

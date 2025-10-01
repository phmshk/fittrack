import createClient from "openapi-fetch";
import type { ApiPaths } from "./schema";
import { useSessionStore } from "@/entities/user";

let refreshTokenPromise: Promise<string> | null = null;

const customFetch: typeof fetch = async (input, init) => {
  const { token } = useSessionStore.getState();
  const headers = new Headers(init?.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(input, {
    ...init,
    headers,
  });

  let requestUrl: string;
  if (typeof input === "string") {
    requestUrl = input;
  } else if (input instanceof Request) {
    requestUrl = input.url;
  } else {
    requestUrl = input.href;
  }

  if (response.status === 401 && !requestUrl.includes("/auth")) {
    console.log("[API Client] Access token expired, attempting to refresh...");

    if (!refreshTokenPromise) {
      console.log("[API Client] Initiating token refresh...");
      refreshTokenPromise = fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json() ?? null)
        .then((session) => {
          console.log("[API Client] Token refreshed successfully");
          const { accessToken: token, user } = session;
          useSessionStore.getState().setSession({ token, user });
          return token;
        })
        .catch((err) => {
          console.error("[API Client] Token refresh failed:", err);
          useSessionStore.getState().clearSession();
          throw err;
        })
        .finally(() => {
          refreshTokenPromise = null;
        });
    }

    const newToken = await refreshTokenPromise;

    if (newToken) {
      console.log("[API Client] Retrying original request with new token...");

      headers.set("Authorization", `Bearer ${newToken}`);
      const retryResponse = await fetch(input, {
        ...init,
        headers,
      });
      return retryResponse;
    } else {
      console.log(
        "[API Client] Redirecting to login due to failed token refresh",
      );
      useSessionStore.getState().clearSession();
    }
  }

  return response;
};

export const apiClient = createClient<ApiPaths>({
  baseUrl: "/api",
  fetch: customFetch,
});

export const publicApiClient = createClient<ApiPaths>({
  baseUrl: "/api",
});

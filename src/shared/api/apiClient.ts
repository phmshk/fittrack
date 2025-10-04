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
      refreshTokenPromise = fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to refresh token");
          }
          return res.json();
        })
        .then((session) => {
          console.log("[API Client] Token refreshed successfully");
          useSessionStore.getState().setSession(session);
          return session.accessToken;
        })
        .catch((err) => {
          console.error("[API Client] Token refresh failed:", err);
          useSessionStore.getState().clearSession();
          window.location.href = "/auth";
          throw err;
        })
        .finally(() => {
          refreshTokenPromise = null;
        });
    }

    try {
      const newToken = await refreshTokenPromise;
      if (newToken) {
        headers.set("Authorization", `Bearer ${newToken}`);
        return fetch(input, {
          ...init,
          headers,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return response;
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

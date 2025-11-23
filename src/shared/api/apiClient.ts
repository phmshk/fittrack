import createClient from "openapi-fetch";
import type { ApiPaths } from "./schema";
import { useSessionStore } from "@/entities/user/model/useSession";
import { auth } from "@/app/firebase/firebase.setup";

let refreshTokenPromise: Promise<string> | null = null;

const customFetch: typeof fetch = async (input, init) => {
  let token = useSessionStore.getState().token;
  const headers = new Headers(init?.headers);

  if (import.meta.env.VITE_USE_MOCKS !== "true" && auth.currentUser) {
    try {
      token = await auth.currentUser.getIdToken();
    } catch (error) {
      console.error("[API Client] Error fetching Firebase token:", error);
    }
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Determine the request URL for logging and retry purposes
  let requestUrl: string;
  // To retry the original request, we may need to clone it
  let originalRequestClone: Request | null = null;

  // Capture the request URL and clone the original request if needed
  if (input instanceof Request) {
    requestUrl = input.url;
    originalRequestClone = input.clone();
  } else if (typeof input === "string") {
    requestUrl = input;
  } else {
    requestUrl = input.href;
  }

  const response = await fetch(input, {
    ...init,
    headers,
  });

  // Handle 401 Unauthorized responses
  if (
    import.meta.env.VITE_USE_MOCKS === "true" &&
    response.status === 401 &&
    !requestUrl.includes("/auth")
  ) {
    // If no refresh token promise is active, start the token refresh process
    if (!refreshTokenPromise) {
      // Start the token refresh process
      // Self invoking async function to assign to refreshTokenPromise
      refreshTokenPromise = (async () => {
        try {
          const refreshResponse = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
          });

          if (!refreshResponse.ok) {
            throw new Error("Failed to refresh token");
          }

          const session = await refreshResponse.json();
          console.log("[API Client] Token refreshed successfully");
          useSessionStore.getState().setSession(session);
          return session.accessToken;
        } catch (err) {
          console.error("[API Client] Token refresh failed:", err);
          useSessionStore.getState().clearSession();
          throw err;
        } finally {
          refreshTokenPromise = null;
        }
      })();
    }

    // Wait for the token to be refreshed
    try {
      const newToken = await refreshTokenPromise;
      if (newToken) {
        // Retry the original request with the new token
        headers.set("Authorization", `Bearer ${newToken}`);
        console.log("[API Client] Retrying original request with new token...");

        // Reconstruct the original request
        let retryInput: Request | string;
        let retryInit: RequestInit | undefined = undefined;
        if (originalRequestClone) {
          retryInput = new Request(originalRequestClone, { headers });
          retryInit = undefined;
        } else {
          // input can be a string or a URL — ensure we pass a string to match the type
          retryInput = typeof input === "string" ? input : input.toString();
          retryInit = { ...init, headers };
        }

        const retryResponse = await fetch(retryInput, retryInit);
        // Handle the case where the retry also fails
        if (!retryResponse.ok && retryResponse.status === 401) {
          console.error("[API Client] Retry after token refresh also failed");
          throw new Error("Retry after token refresh failed");
        }
        return retryResponse;
      }
    } catch (err) {
      console.error("[API Client] Token refresh process failed:", err);
      throw err;
    }
  }
  // Return the original response if no refresh was needed
  return response;
};

const getBaseUrl = () => {
  if (import.meta.env.MODE === "test") {
    return "http://localhost:3000/api";
  }
  return "/api";
};

export const apiClient = createClient<ApiPaths>({
  baseUrl: getBaseUrl(),
  fetch: customFetch,
});

export const publicApiClient = createClient<ApiPaths>({
  baseUrl: getBaseUrl(),
});

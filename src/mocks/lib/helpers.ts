import type { JWTPayload } from "jose";
import { HttpResponse } from "msw";
import { userDb } from "../db/user.db";

/**
 * A utility function to verify the auth token for a request.
 * If the token is valid, it returns the decoded payload.
 * If the token is invalid or missing, it returns an HttpResponse error.
 */
export async function verifyAuth(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return {
      success: false,
      response: HttpResponse.json(
        { message: "Authorization token missing" },
        { status: 401 },
      ),
    };
  }

  const { valid, payload } = await userDb.verifyToken(token);
  if (!valid || !payload?.sub) {
    console.warn("[MSW] Invalid access token received");
    return {
      success: false,
      response: HttpResponse.json(
        { message: "Invalid token" },
        { status: 401 },
      ),
    };
  }

  return { success: true, payload: payload as JWTPayload & { sub: string } };
}

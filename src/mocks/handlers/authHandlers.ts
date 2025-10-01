import { http, HttpResponse } from "msw";
import { userDb } from "../db/user.db";
import type { ApiComponents } from "@/shared/api/schema";

export const authHandlers = [
  // --- Registration ---
  http.post("/api/auth/register", async ({ request }) => {
    const { email, password, name } =
      (await request.json()) as ApiComponents["schemas"]["RegisterRequest"];
    if (userDb.findUserByEmail(email)) {
      return HttpResponse.json(
        { message: "User with this email already exists" },
        { status: 409 },
      );
    }
    const user = userDb.createUser({ email, password, name });
    console.log("[MSW] POST /api/auth/register: User created", user);

    const { accessToken, refreshToken } = await userDb.createSession(user.id);

    return HttpResponse.json(
      {
        accessToken,
        user: { id: user.id, email: user.email, name: user.name },
      },
      {
        status: 201,
        headers: {
          "Set-Cookie": `refreshToken=${refreshToken}; HttpOnly; Path=/; SameSite=Strict; Max-Age=604800`,
        },
      },
    );
  }),

  // --- Login ---
  http.post("/api/auth/login", async ({ request }) => {
    const { email, password } =
      (await request.json()) as ApiComponents["schemas"]["LoginRequest"];
    const user = userDb.findUserByEmail(email);

    if (!user || user.password !== password) {
      return HttpResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const { accessToken, refreshToken } = await userDb.createSession(user.id);

    return HttpResponse.json(
      {
        accessToken,
        user: { id: user.id, email: user.email, name: user.name },
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `refreshToken=${refreshToken}; HttpOnly; Path=/; SameSite=Strict; Max-Age=604800`,
        },
      },
    );
  }),

  // --- Refresh Token ---
  http.post("/api/auth/refresh", async ({ cookies }) => {
    const { refreshToken: oldRefreshToken } = cookies;

    if (!oldRefreshToken) {
      return HttpResponse.json(
        { message: "Refresh token not found" },
        { status: 401 },
      );
    }

    const { valid, payload } = await userDb.verifyToken(oldRefreshToken);
    if (!valid || !payload?.sub) {
      return HttpResponse.json(
        { message: "Invalid refresh token" },
        { status: 401 },
      );
    }

    const user = userDb.findUserById(payload.sub);
    if (!user) {
      return HttpResponse.json({ message: "User not found" }, { status: 401 });
    }

    const { accessToken, refreshToken } = await userDb.createSession(user.id);

    console.log("[MSW] Tokens refreshed for:", user.email);

    const response = HttpResponse.json({ accessToken, user }, { status: 200 });
    response.headers.set(
      "Set-Cookie",
      `refreshToken=${refreshToken}; HttpOnly; Path=/; SameSite=Strict; Max-Age=604800`,
    );
    return response;
  }),
];

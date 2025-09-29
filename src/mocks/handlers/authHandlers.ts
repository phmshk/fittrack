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
        { status: 409 }, // 409 Conflict
      );
    }
    const user = userDb.createUser({ email, password, name });
    console.log("[MSW] POST /api/auth/register: User created", user);
    const session = userDb.createSession(user.id);
    return HttpResponse.json(
      {
        token: session.token,
        user: { id: user.id, email: user.email, name: user.name },
      },
      { status: 201 },
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
        { status: 401 }, // 401 Unauthorized
      );
    }

    const session = userDb.createSession(user.id);
    console.log(
      `[MSW] POST /api/auth/login: Session created for ${user.email}`,
    );
    return HttpResponse.json({
      token: session.token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  }),

  // --- Get current user (protected route) ---
  http.get("/api/auth/me", ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return HttpResponse.json(
        { message: "No token provided" },
        { status: 401 },
      );
    }

    const session = userDb.findSessionByToken(token);
    if (!session) {
      return HttpResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const user = userDb.findUserById(session.userId);
    console.log(`[MSW] GET /api/auth/me: User found for token`, user);

    if (!user) {
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }

    return HttpResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  }),
];

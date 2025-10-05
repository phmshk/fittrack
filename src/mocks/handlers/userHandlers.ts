import { http, HttpResponse } from "msw";
import { userDb } from "../db/user.db";
import { verifyAuth } from "../lib/helpers";
import type { User } from "@/entities/user";

export const usersHandlers = [
  // --- Handlers for user data ---
  // Get user data
  http.get("/api/user", async ({ request }) => {
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { sub: userId } = authResult.payload!;

    const user = userDb.findUserById(userId);
    if (user) {
      console.log("[MSW] GET /api/user: User retrieved", user);
      return HttpResponse.json(user);
    } else {
      console.error("[MSW] GET /api/user: User not found");
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }
  }),

  // Update user data
  http.put("/api/user", async ({ request }) => {
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { sub: userId } = authResult.payload!;

    const updatedUserData = (await request.json()) as Partial<User>;

    const updatedUser = userDb.updateUser(userId, updatedUserData);
    const updatedGoals = userDb.updateGoals(userId, updatedUserData);

    if (updatedUser && updatedGoals) {
      console.log("[MSW] PUT /api/user: User and goals updated", {
        user: updatedUser,
        goals: updatedGoals,
      });
      const fullUser = userDb.findUserById(userId);
      return HttpResponse.json(fullUser);
    } else {
      console.error("[MSW] PUT /api/user: User not found");
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }
  }),
];

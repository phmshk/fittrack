import { http, HttpResponse } from "msw";
import type { UserGoalsInput } from "@/entities/user";
import { userDb } from "../db/user.db";
import { verifyAuth } from "../lib/helpers";

export const userGoalsHandlers = [
  // --- Handlers for user goals ---
  // Get user goals
  http.get("/api/user-goals", async ({ request }) => {
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { sub: userId } = authResult.payload!;

    const goals = userDb.getGoals(userId);
    if (goals) {
      console.log("[MSW] GET /api/user-goals: Goals retrieved", goals);
      return HttpResponse.json(goals);
    } else {
      console.error("[MSW] GET /api/user-goals: Goals not found");
      return HttpResponse.json(
        { message: "User goals not found" },
        { status: 404 },
      );
    }
  }),

  // Update user goals
  http.put("/api/user-goals", async ({ request }) => {
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { sub: userId } = authResult.payload!;

    const updatedGoalsData = (await request.json()) as Partial<UserGoalsInput>;

    if (
      updatedGoalsData.targetCalories === undefined &&
      updatedGoalsData.targetProteins === undefined &&
      updatedGoalsData.targetFats === undefined &&
      updatedGoalsData.targetCarbs === undefined
    ) {
      console.error(
        "[MSW] PUT /api/user-goals: Validation error. At least one field must be provided",
        updatedGoalsData,
      );
      return HttpResponse.json(
        {
          message:
            "At least one field must be provided: dailyCalories, proteinRatio, fatRatio, carbRatio",
        },
        { status: 400 },
      );
    }

    const updatedGoals = userDb.updateGoals(userId, updatedGoalsData);

    if (updatedGoals) {
      console.log("[MSW] PUT /api/user-goals: Goals updated", updatedGoals);
      return HttpResponse.json(updatedGoals);
    } else {
      console.error("[MSW] PUT /api/user-goals: Goals not found");
      return HttpResponse.json(
        { message: "User goals not found" },
        { status: 404 },
      );
    }
  }),
];

import { http, HttpResponse } from "msw";
import type { UserGoalsInput } from "@/entities/user";
import { userDb } from "../db/user.db";

export const userGoalsHandlers = [
  // --- Handlers for user goals ---
  // Get user goals
  http.get("/api/user-goals", () => {
    const goals = userDb.getGoals();
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

    const updatedGoals = userDb.updateGoals(updatedGoalsData);

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

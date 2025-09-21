import type { FoodLog } from "@/entities/day";
import { http, HttpResponse } from "msw";
import { db } from "@/mocks/db";
import type { UserGoalsInput } from "@/entities/user";

export const handlers = [
  // --- Handlers for food logs ---
  http.get("/api/food-logs/:date", async ({ params }) => {
    const { date } = params as { date: string };
    const logs = db.getFoodLogsByDate(date);
    console.log(`[MSW] GET /api/food-logs/${date}: found ${logs.length} logs`);
    return HttpResponse.json(logs);
  }),

  http.post("/api/food-logs", async ({ request }) => {
    const newLogData = (await request.json()) as FoodLog;
    if (
      !newLogData.name ||
      !newLogData.calories ||
      !newLogData.date ||
      !newLogData.mealType
    ) {
      console.error(
        "[MSW] POST /api/food-logs: Validation error. Required fields are missing:",
        newLogData,
      );

      return HttpResponse.json(
        {
          message:
            "Required fields are missing: name, calories, date, mealType",
        },
        { status: 400 },
      );
    }
    const newLog = db.addFoodLog(newLogData);
    console.log("[MSW] POST /api/food-logs: Product added:", newLog);
    return HttpResponse.json(newLog, { status: 201 });
  }),

  http.put("/api/food-logs/:id", async ({ params, request }) => {
    const { id } = params as { id: string };
    const updatedData = (await request.json()) as FoodLog;
    if (
      !updatedData.name ||
      !updatedData.calories ||
      !updatedData.date ||
      !updatedData.mealType
    ) {
      console.error(
        `[MSW] PUT /api/food-logs/${id}: Validation error. Required fields are missing:`,
        updatedData,
      );
      return HttpResponse.json(
        {
          message:
            "Required fields are missing: name, calories, date, mealType",
        },
        { status: 400 },
      );
    }

    const updatedLog = db.updateFoodLog(id, updatedData);

    if (updatedLog) {
      console.log(`[MSW] PUT /api/food-logs/${id}: Log updated`, updatedLog);
      return HttpResponse.json(updatedLog);
    } else {
      console.error(`[MSW] PUT /api/food-logs/${id}: Log not found`);
      return HttpResponse.json(
        { message: `Log with id ${id} not found` },
        { status: 404 },
      );
    }
  }),

  http.delete("/api/food-logs/:id", ({ params }) => {
    const { id } = params as { id: string };
    const deleted = db.deleteFoodLog(id);

    if (deleted) {
      console.log(`[MSW] DELETE /api/food-logs/${id}: Log deleted`);
      return new HttpResponse(null, { status: 204 });
    } else {
      console.error(`[MSW] DELETE /api/food-logs/${id}: Log not found`);
      return HttpResponse.json(
        { message: `Log with id ${id} not found` },
        { status: 404 },
      );
    }
  }),
  // --- Handlers for user goals ---
  http.get("/api/user-goals", () => {
    const goals = db.getGoals();
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

    const updatedGoals = db.updateGoals(updatedGoalsData);

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

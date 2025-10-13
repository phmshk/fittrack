import type { FoodLog } from "@/entities/day";
import { http, HttpResponse } from "msw";
import { db } from "@/mocks/db/foodLogs.db";
import { verifyAuth } from "../lib/helpers";

export const foodLogsHandlers = [
  // --- Handlers for food logs ---

  // Get food logs for a date range
  http.get("/api/food-logs", async ({ request }) => {
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { sub: userId } = authResult.payload!;

    const url = new URL(request.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    if (!from || !to) {
      return HttpResponse.json(
        { message: "Missing 'from' or 'to' date parameters" },
        { status: 400 },
      );
    }

    const logs = db.getFoodLogsByDateRange(userId, from, to);
    // simulate network delay
    await new Promise((res) => setTimeout(res, 1000));
    console.log(
      `[MSW] GET /api/food-logs?from=${from}&to=${to}: found ${logs.length} logs`,
    );
    return HttpResponse.json(logs);
  }),

  // Get food logs for a specific date
  http.get("/api/food-logs/:date", async ({ params, request }) => {
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { sub: userId } = authResult.payload!;

    const { date } = params as { date: string };
    const logs = db.getFoodLogsByDate(userId, date);
    // simulate network delay
    await new Promise((res) => setTimeout(res, 1000));
    console.log(`[MSW] GET /api/food-logs/${date}: found ${logs.length} logs`);
    return HttpResponse.json(logs);
  }),

  // Add a new food log
  http.post("/api/food-logs", async ({ request }) => {
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }
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

    const { sub: userId } = authResult.payload!;
    const newLog = db.addFoodLog(userId, newLogData);
    console.log("[MSW] POST /api/food-logs: Product added:", newLog);
    return HttpResponse.json(newLog, { status: 201 });
  }),

  // Update an existing food log
  http.put("/api/food-logs/:id", async ({ params, request }) => {
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }
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

    const { sub: userId } = authResult.payload!;
    const updatedLog = db.updateFoodLog(userId, id, updatedData);

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

  // Delete a food log
  http.delete("/api/food-logs/:id", async ({ params, request }) => {
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { id } = params as { id: string };
    const { sub: userId } = authResult.payload!;

    const deleted = db.deleteFoodLog(userId, id);

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
];

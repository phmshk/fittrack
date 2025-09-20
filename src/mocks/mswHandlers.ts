import type { FoodLog, FoodLogInput } from "@/entities/day";
import { http, HttpResponse } from "msw";
import { db } from "@/mocks/db";

export const handlers = [
  http.get("/api/food-logs/:date", async ({ params }) => {
    const { date } = params;
    const logs = db.filter((log) => log.date === date);
    console.log(`[MSW] GET /api/food-logs/${date}: found ${logs.length} logs`);
    return HttpResponse.json(logs);
  }),

  http.post("/api/food-logs", async ({ request }) => {
    const newLogData = (await request.json()) as FoodLogInput;
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

    const newLog: FoodLog = {
      id: crypto.randomUUID(),
      name: newLogData.name,
      calories: newLogData.calories,
      proteins: newLogData.proteins || 0,
      fats: newLogData.fats || 0,
      carbs: newLogData.carbs || 0,
      date: newLogData.date,
      grams: newLogData.grams || 0,
      mealType: newLogData.mealType,
    };
    db.push(newLog);
    console.log("[MSW] POST /api/food-logs: Product added:", newLog);
    return HttpResponse.json(newLog, { status: 201 });
  }),

  http.put("/api/food-logs/:id", async ({ params, request }) => {
    const { id } = params;
    const updatedData = (await request.json()) as FoodLogInput;
    const index = db.findIndex((log) => log.id === id);

    if (index !== -1) {
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

      db[index] = {
        ...db[index],
        ...updatedData,
      };
      console.log(`[MSW] PUT /api/food-logs/${id}: Log updated`);
      return HttpResponse.json(db[index]);
    } else {
      console.error(`[MSW] PUT /api/food-logs/${id}: Log not found`);
      return HttpResponse.json(
        { message: `Log with id ${id} not found` },
        { status: 404 },
      );
    }
  }),

  http.delete("/api/food-logs/:id", ({ params }) => {
    const { id } = params;
    const index = db.findIndex((log) => log.id === id);

    if (index !== -1) {
      db.splice(index, 1);
      console.log(`[MSW] DELETE /api/food-logs/${id}: Log deleted`);
      return HttpResponse.json(null, { status: 204 });
    } else {
      console.error(`[MSW] DELETE /api/food-logs/${id}: Log not found`);
      return HttpResponse.json(
        { message: `Log with id ${id} not found` },
        { status: 404 },
      );
    }
  }),
];

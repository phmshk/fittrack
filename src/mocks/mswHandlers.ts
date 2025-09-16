import type { ApiComponents } from "@/shared/api/schema";
import { http, HttpResponse } from "msw";

type FoodLog = ApiComponents["schemas"]["FoodLog"];
type FoodLogInput = ApiComponents["schemas"]["FoodLogInput"];

// In-memory database
const db: FoodLog[] = [
  {
    id: crypto.randomUUID(),
    date: "2025-09-16",
    mealType: "breakfast",
    name: "Oatmeal",
    calories: 300,
    proteins: 10,
    carbs: 54,
    fats: 5,
    grams: 150,
  },
  {
    id: crypto.randomUUID(),
    date: "2025-09-16",
    mealType: "breakfast",
    name: "Banana",
    calories: 89,
    proteins: 1,
    carbs: 23,
    fats: 0.3,
    grams: 100,
  },
  {
    id: crypto.randomUUID(),
    date: "2025-09-16",
    mealType: "breakfast",
    name: "Eggs",
    calories: 155,
    proteins: 13,
    carbs: 1,
    fats: 11,
    grams: 100,
  },
  {
    id: crypto.randomUUID(),
    date: "2025-09-16",
    mealType: "lunch",
    name: "Chicken Breast",
    calories: 330,
    proteins: 62,
    carbs: 0,
    fats: 7.4,
    grams: 100,
  },
  {
    id: crypto.randomUUID(),
    date: "2025-09-16",
    mealType: "lunch",
    name: "Broccoli",
    calories: 55,
    proteins: 3.7,
    carbs: 11,
    fats: 0.6,
    grams: 80,
  },
  {
    id: crypto.randomUUID(),
    date: "2025-09-16",
    mealType: "breakfast",
    name: "Quinoa",
    calories: 222,
    proteins: 8,
    carbs: 39,
    fats: 3.6,
    grams: 100,
  },
  {
    id: crypto.randomUUID(),
    date: "2025-09-16",
    mealType: "dinner",
    name: "Salmon",
    calories: 206,
    proteins: 22,
    carbs: 0,
    fats: 12,
    grams: 100,
  },
  {
    id: crypto.randomUUID(),
    date: "2025-09-16",
    mealType: "dinner",
    name: "Sweet Potato",
    calories: 86,
    proteins: 1.6,
    carbs: 20,
    fats: 0.1,
    grams: 100,
  },
];

export const handlers = [
  http.get("/api/food-logs/:date", ({ params }) => {
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
          `[MSW] PUT /api/food-logs/${id}: Ошибка валидации.`,
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

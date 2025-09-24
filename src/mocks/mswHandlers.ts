import type { FoodLog } from "@/entities/day";
import { http, HttpResponse, passthrough } from "msw";
import { db } from "@/mocks/db/foodLogs.db";
import type { UserGoalsInput } from "@/entities/user";
import { mockResponses } from "./openFood/mockResponses";

const openFoodFactsHandlers = [
  http.get("https://placehold.co/*", () => {
    return passthrough();
  }),

  http.get(
    "https://world.openfoodfacts.org/cgi/search.pl",
    async ({ request }) => {
      const url = new URL(request.url);
      const searchTerm = url.searchParams.get("search_terms");
      console.log(
        `[MSW] Intercepted Open Food Facts search for: "${searchTerm}"`,
      );

      const filteredProducts = mockResponses?.products?.filter((product) =>
        product.product_name
          ?.toLowerCase()
          .includes(searchTerm?.toLowerCase() || ""),
      );

      const response = {
        count: filteredProducts?.length || 0,
        products: filteredProducts,
      };
      //simulate network delay
      await new Promise((res) => setTimeout(res, 1000));

      return HttpResponse.json(response);
    },
  ),

  http.get(
    "https://world.openfoodfacts.org/api/v2/product/:barcode",
    ({ params }) => {
      console.log(
        `[MSW] Intercepted Open Food Facts fetch for barcode: ${params.barcode}`,
      );

      const product = mockResponses?.products?.find(
        (p) => p.code === params.barcode,
      );
      return HttpResponse.json(
        product || { status: 404, message: "Product not found" },
      );
    },
  ),
];

export const handlers = [
  // --- Handlers for food logs ---
  http.get("/api/food-logs/:date", async ({ params }) => {
    const { date } = params as { date: string };
    const logs = db.getFoodLogsByDate(date);
    // simulate network delay
    await new Promise((res) => setTimeout(res, 1000));
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

  ...openFoodFactsHandlers,
];

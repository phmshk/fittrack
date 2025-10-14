import { http, HttpResponse } from "msw";
import { userDb } from "../db/user.db";
import { verifyAuth } from "../lib/helpers";
import type { WeightLogInput } from "@/entities/user";

// --- Handlers for weight logs ---

export const weightLogHandlers = [
  // Add a new weight log
  http.post("/api/user/weight", async ({ request }) => {
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { sub: userId } = authResult.payload!;
    const newLogData = (await request.json()) as WeightLogInput;

    const updatedUser = userDb.addWeightLog(userId, newLogData);

    if (updatedUser) {
      console.log("[MSW] POST /api/user/weight: Weight log added", newLogData);
      return HttpResponse.json(updatedUser, { status: 201 });
    }
    return HttpResponse.json({ message: "User not found" }, { status: 404 });
  }),

  // Update a weight log
  http.put("/api/user/weight/:id", async ({ request, params }) => {
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { sub: userId } = authResult.payload!;
    const { id } = params;
    const updatedLogData = (await request.json()) as WeightLogInput;

    const updatedUser = userDb.updateWeightLog(
      userId,
      id as string,
      updatedLogData,
    );

    if (updatedUser) {
      console.log(`[MSW] PUT /api/user/weight/${id}: Weight log updated`);
      return HttpResponse.json(updatedUser);
    }
    return HttpResponse.json({ message: "Log not found" }, { status: 404 });
  }),

  // Delete a weight log
  http.delete("/api/user/weight/:id", async ({ request, params }) => {
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { sub: userId } = authResult.payload!;
    const { id } = params;

    const success = userDb.deleteWeightLog(userId, id as string);

    if (success) {
      console.log(`[MSW] DELETE /api/user/weight/${id}: Weight log deleted`);
      const updatedUser = userDb.findUserById(userId);
      return HttpResponse.json(updatedUser);
    }
    return HttpResponse.json({ message: "Log not found" }, { status: 404 });
  }),
];

import { http, HttpResponse } from "msw";
import { db } from "@/mocks/db/waterLogs.db";
import { verifyAuth } from "../lib/helpers";
import type { WaterLogInput } from "@/entities/water";

export const waterLogsHandlers = [
  http.get("/api/water-logs/:date", async ({ params, request }) => {
    const authResult = await verifyAuth(request);
    if (!authResult.success) return authResult.response;
    const { sub: userId } = authResult.payload!;

    const { date } = params as { date: string };
    const log = db.getWaterLogByDate(userId, date);

    return HttpResponse.json(log);
  }),

  http.post("/api/water-logs", async ({ request }) => {
    const authResult = await verifyAuth(request);
    if (!authResult.success) return authResult.response;
    const { sub: userId } = authResult.payload!;

    const newLogData = (await request.json()) as WaterLogInput;
    const newLog = db.addWaterLog(userId, newLogData);
    return HttpResponse.json(newLog, { status: 201 });
  }),

  http.put("/api/water-logs/:id", async ({ params, request }) => {
    const authResult = await verifyAuth(request);
    if (!authResult.success) return authResult.response;
    const { sub: userId } = authResult.payload!;

    const { id } = params as { id: string };
    const { amount } = (await request.json()) as { amount: number };

    const updatedLog = db.updateWaterLog(userId, id, { amount });

    if (updatedLog) {
      return HttpResponse.json(updatedLog);
    }
    return HttpResponse.json({ message: "Log not found" }, { status: 404 });
  }),
];

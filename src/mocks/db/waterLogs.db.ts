import type { WaterLog, WaterLogInput } from "@/entities/water";

type StoredWaterLog = WaterLog & { userId: string };

let waterLogs: Map<string, StoredWaterLog> = new Map();
const MOCK_USER_ID = "a1b2-c3d4-e5f6-g7h8";

const seedData = [
  {
    id: crypto.randomUUID(),
    userId: MOCK_USER_ID,
    date: "2025-09-30",
    amount: 750,
  },
];

export const seed = (): void => {
  waterLogs = new Map(seedData.map((log) => [log.id, log]));
};

seed();

export const db = {
  getWaterLogByDate: (
    userId: string,
    date: string,
  ): StoredWaterLog | undefined =>
    Array.from(waterLogs.values()).find(
      (log) => log.userId === userId && log.date === date,
    ),

  addWaterLog: (userId: string, logData: WaterLogInput): StoredWaterLog => {
    const newLog = { id: crypto.randomUUID(), ...logData, userId };
    waterLogs.set(newLog.id, newLog);
    return newLog;
  },

  updateWaterLog: (
    userId: string,
    logId: string,
    updates: Partial<WaterLogInput>,
  ): StoredWaterLog | null => {
    const existingLog = waterLogs.get(logId);
    if (existingLog && existingLog.userId === userId) {
      const updatedLog = { ...existingLog, ...updates };
      waterLogs.set(logId, updatedLog);
      return updatedLog;
    }
    return null;
  },

  reset: (): void => seed(),
};

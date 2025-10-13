import type { FoodLog } from "@/entities/day";
import { foodLogs as twoMonthLogs } from "./foodLogsMonthEntries";
type StoredFoodLog = FoodLog & { userId: string };

// --- "Tables" for our in-memory database ---
let foodLogs: Map<string, StoredFoodLog> = new Map();

// --- Initial seed data for development ---
const seedData = {
  foodLogs: [...twoMonthLogs],
  // foodLogs: [
  //   {
  //     id: crypto.randomUUID(),
  //     userId: MOCK_USER_ID,
  //     date: "2025-09-30",
  //     mealType: "breakfast",
  //     name: "Scrambled Eggs",
  //     calories: 220,
  //     proteins: 15,
  //     carbs: 1,
  //     sugars: 0.4,
  //     fats: 18,
  //     saturatedFats: 6,
  //     grams: 100,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     userId: MOCK_USER_ID,
  //     date: "2025-09-30",
  //     mealType: "lunch",
  //     name: "Chicken Salad",
  //     calories: 350,
  //     proteins: 30.2,
  //     carbs: 10.5,
  //     sugars: 3.1,
  //     fats: 20.4,
  //     saturatedFats: 5.2,
  //     grams: 100,
  //   },
  //   {
  //     userId: MOCK_USER_ID,
  //     id: crypto.randomUUID(),
  //     date: "2025-09-30",
  //     mealType: "lunch",
  //     name: "Grilled Chicken Breast",
  //     calories: 220,
  //     proteins: 43,
  //     carbs: 0,
  //     sugars: 0,
  //     fats: 5,
  //     saturatedFats: 1,
  //     grams: 100,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     userId: MOCK_USER_ID,
  //     date: "2025-09-30",
  //     mealType: "dinner",
  //     name: "Steak and Sweet Potato",
  //     calories: 700,
  //     proteins: 50,
  //     carbs: 45,
  //     sugars: 8,
  //     fats: 35,
  //     saturatedFats: 10,
  //     grams: 100,
  //   },
  // ] as StoredFoodLog[],
};

// --- Function to populate and reset the database ---
const seed = (): void => {
  foodLogs = new Map(seedData.foodLogs.map((log) => [log.id, log]));
};

// Initial seeding of the database
seed();

// --- Exported object with methods to manage the DB ---
export const db = {
  // --- FoodLog Methods ---
  getFoodLogsByDate: (userId: string, date: string): StoredFoodLog[] =>
    Array.from(foodLogs.values()).filter(
      (log) => log.userId === userId && log.date === date,
    ),

  getFoodLogsByDateRange: (
    userId: string,
    from: string,
    to: string,
  ): StoredFoodLog[] => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    return Array.from(foodLogs.values()).filter((log) => {
      const logDate = new Date(log.date);
      return log.userId === userId && logDate >= fromDate && logDate <= toDate;
    });
  },

  addFoodLog: (userId: string, logData: Omit<FoodLog, "id">): StoredFoodLog => {
    const newLog = { id: crypto.randomUUID(), ...logData, userId };
    foodLogs.set(newLog.id, newLog);
    return newLog;
  },
  deleteFoodLog: (userId: string, logId: string): boolean => {
    if (foodLogs.has(logId) && foodLogs.get(logId)?.userId === userId) {
      return foodLogs.delete(logId);
    }
    return false;
  },
  updateFoodLog: (
    userId: string,
    logId: string,
    updates: Omit<FoodLog, "id">,
  ): StoredFoodLog | null => {
    const existingLog = foodLogs.get(logId);

    if (existingLog && existingLog.userId === userId) {
      const updatedLog = { ...existingLog, ...updates };
      foodLogs.set(logId, updatedLog);

      return updatedLog;
    }
    return null;
  },

  // --- Reset Method (useful for testing) ---
  reset: (): void => seed(),
};

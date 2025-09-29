import type { FoodLog } from "@/entities/day";

// --- "Tables" for our in-memory database ---
let foodLogs: Map<string, FoodLog> = new Map();

// --- Initial seed data for development ---
const seedData = {
  foodLogs: [
    {
      id: crypto.randomUUID(),
      date: "2025-09-19",
      mealType: "breakfast",
      name: "Scrambled Eggs",
      calories: 220,
      proteins: 15,
      carbs: 1,
      sugars: 0.4,
      fats: 18,
      saturatedFats: 6,
      grams: 100,
    },
    {
      id: crypto.randomUUID(),
      date: "2025-09-19",
      mealType: "lunch",
      name: "Chicken Salad",
      calories: 350,
      proteins: 30.2,
      carbs: 10.5,
      sugars: 3.1,
      fats: 20.4,
      saturatedFats: 5.2,
      grams: 100,
    },
    {
      id: crypto.randomUUID(),
      date: "2025-09-20",
      mealType: "lunch",
      name: "Grilled Chicken Breast",
      calories: 220,
      proteins: 43,
      carbs: 0,
      sugars: 0,
      fats: 5,
      saturatedFats: 1,
      grams: 100,
    },
    {
      id: crypto.randomUUID(),
      date: "2025-09-21",
      mealType: "dinner",
      name: "Steak and Sweet Potato",
      calories: 700,
      proteins: 50,
      carbs: 45,
      sugars: 8,
      fats: 35,
      saturatedFats: 10,
      grams: 100,
    },
  ] as FoodLog[],
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
  getFoodLogsByDate: (date: string): FoodLog[] =>
    Array.from(foodLogs.values()).filter((log) => log.date === date),
  addFoodLog: (logData: Omit<FoodLog, "id">): FoodLog => {
    const newLog = { id: crypto.randomUUID(), ...logData };
    foodLogs.set(newLog.id, newLog);
    return newLog;
  },
  deleteFoodLog: (id: string): boolean => foodLogs.delete(id),
  updateFoodLog: (id: string, updates: Omit<FoodLog, "id">): FoodLog | null => {
    if (!foodLogs.has(id)) {
      return null;
    }
    const existingLog = foodLogs.get(id)!; // We know it exists
    const updatedLog = { ...existingLog, ...updates };
    foodLogs.set(id, updatedLog);
    return updatedLog;
  },

  // --- Reset Method (useful for testing) ---
  reset: (): void => seed(),
};

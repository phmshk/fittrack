import type { FoodLog } from "@/entities/day";

type StoredFoodLog = FoodLog & { userId: string };
// Mock User ID
const MOCK_USER_ID = "a1b2-c3d4-e5f6-g7h8";

// --- Helper function to add slight variations to make data more realistic ---
function vary(value: number, percentage = 0.1) {
  const variation = 1 + (Math.random() - 0.5) * 2 * percentage;
  return Math.round(value * variation);
}

// --- Meal Templates ---
const meals = {
  healthyBreakfast: [
    {
      name: "Oatmeal with Berries",
      calories: 225,
      proteins: 8,
      carbs: 42,
      sugars: 18,
      fats: 5,
      saturatedFats: 1,
      grams: 150,
    },
    {
      name: "Greek Yogurt with Almonds",
      calories: 255,
      proteins: 23,
      carbs: 12,
      sugars: 8,
      fats: 14,
      saturatedFats: 2,
      grams: 180,
    },
    {
      name: "Scrambled Eggs with Spinach",
      calories: 280,
      proteins: 20,
      carbs: 3,
      sugars: 1,
      fats: 21,
      saturatedFats: 7,
      grams: 180,
    },
    {
      name: "Avocado Toast with Egg",
      calories: 380,
      proteins: 18,
      carbs: 30,
      sugars: 2,
      fats: 22,
      saturatedFats: 5,
      grams: 180,
    },
    {
      name: "Protein Smoothie",
      calories: 350,
      proteins: 30,
      carbs: 40,
      sugars: 25,
      fats: 8,
      saturatedFats: 2,
      grams: 400,
    },
  ],
  weekendBreakfast: [
    {
      name: "Pancakes with Maple Syrup",
      calories: 450,
      proteins: 10,
      carbs: 85,
      sugars: 40,
      fats: 8,
      saturatedFats: 3,
      grams: 250,
    },
    {
      name: "Bacon, Eggs, and Toast",
      calories: 550,
      proteins: 28,
      carbs: 35,
      sugars: 5,
      fats: 32,
      saturatedFats: 12,
      grams: 280,
    },
    {
      name: "Waffles with Whipped Cream",
      calories: 500,
      proteins: 9,
      carbs: 75,
      sugars: 35,
      fats: 18,
      saturatedFats: 9,
      grams: 220,
    },
  ],
  healthyLunch: [
    {
      name: "Grilled Chicken Salad",
      calories: 410,
      proteins: 45,
      carbs: 12,
      sugars: 5,
      fats: 20,
      saturatedFats: 5,
      grams: 250,
    },
    {
      name: "Lentil Soup",
      calories: 360,
      proteins: 20,
      carbs: 60,
      sugars: 6,
      fats: 4,
      saturatedFats: 1,
      grams: 400,
    },
    {
      name: "Quinoa Bowl with Veggies",
      calories: 520,
      proteins: 20,
      carbs: 75,
      sugars: 10,
      fats: 15,
      saturatedFats: 3,
      grams: 400,
    },
    {
      name: "Tuna Sandwich on Whole Wheat",
      calories: 420,
      proteins: 25,
      carbs: 40,
      sugars: 7,
      fats: 18,
      saturatedFats: 4,
      grams: 220,
    },
  ],
  weekendLunch: [
    {
      name: "Cheeseburger and Fries",
      calories: 850,
      proteins: 40,
      carbs: 70,
      sugars: 15,
      fats: 45,
      saturatedFats: 20,
      grams: 450,
    },
    {
      name: "Sushi Set (12 pieces)",
      calories: 550,
      proteins: 25,
      carbs: 80,
      sugars: 10,
      fats: 10,
      saturatedFats: 2,
      grams: 350,
    },
    {
      name: "Pepperoni Pizza (2 slices)",
      calories: 700,
      proteins: 30,
      carbs: 80,
      sugars: 12,
      fats: 30,
      saturatedFats: 14,
      grams: 400,
    },
  ],
  healthyDinner: [
    {
      name: "Salmon with Quinoa",
      calories: 650,
      proteins: 40,
      carbs: 45,
      sugars: 5,
      fats: 33,
      saturatedFats: 7,
      grams: 350,
    },
    {
      name: "Beef Stir-fry with Brown Rice",
      calories: 580,
      proteins: 40,
      carbs: 55,
      sugars: 10,
      fats: 22,
      saturatedFats: 8,
      grams: 380,
    },
    {
      name: "Cod with Sweet Potato Mash",
      calories: 550,
      proteins: 45,
      carbs: 50,
      sugars: 15,
      fats: 18,
      saturatedFats: 3,
      grams: 420,
    },
    {
      name: "Pasta with Pesto and Chicken",
      calories: 680,
      proteins: 40,
      carbs: 70,
      sugars: 6,
      fats: 28,
      saturatedFats: 6,
      grams: 400,
    },
  ],
  weekendDinner: [
    {
      name: "Steak with Mashed Potatoes",
      calories: 800,
      proteins: 55,
      carbs: 50,
      sugars: 8,
      fats: 45,
      saturatedFats: 18,
      grams: 500,
    },
    {
      name: "Roast Chicken with Veggies",
      calories: 750,
      proteins: 55,
      carbs: 60,
      sugars: 12,
      fats: 35,
      saturatedFats: 9,
      grams: 500,
    },
    {
      name: "Tacos (3)",
      calories: 650,
      proteins: 35,
      carbs: 50,
      sugars: 5,
      fats: 35,
      saturatedFats: 15,
      grams: 380,
    },
  ],
  snacks: [
    {
      name: "Apple",
      calories: 95,
      proteins: 1,
      carbs: 25,
      sugars: 19,
      fats: 0,
      saturatedFats: 0,
      grams: 180,
    },
    {
      name: "Protein Bar",
      calories: 210,
      proteins: 20,
      carbs: 22,
      sugars: 2,
      fats: 8,
      saturatedFats: 4,
      grams: 60,
    },
    {
      name: "Almonds (handful)",
      calories: 160,
      proteins: 6,
      carbs: 6,
      sugars: 1,
      fats: 14,
      saturatedFats: 1,
      grams: 28,
    },
    {
      name: "Dark Chocolate",
      calories: 170,
      proteins: 2,
      carbs: 13,
      sugars: 7,
      fats: 12,
      saturatedFats: 7,
      grams: 30,
    },
    {
      name: "Halloween Candy",
      calories: 350,
      proteins: 3,
      carbs: 60,
      sugars: 55,
      fats: 12,
      saturatedFats: 8,
      grams: 80,
    },
  ],
};

// --- Data Generation Logic ---
export const foodLogs: StoredFoodLog[] = [];
// Generate data for one month
// Two weeks before and two weeks after current date
const startDate = new Date();
startDate.setDate(startDate.getDate() - 14);
const endDate = new Date();
endDate.setDate(endDate.getDate() + 14);

const mealCounters = {
  healthyBreakfast: 0,
  weekendBreakfast: 0,
  healthyLunch: 0,
  weekendLunch: 0,
  healthyDinner: 0,
  weekendDinner: 0,
  snacks: 0,
};

function getNextMeal(mealType: keyof typeof meals) {
  const mealList = meals[mealType];
  const meal = mealList[mealCounters[mealType] % mealList.length];
  mealCounters[mealType]++;
  return { ...meal }; // Return a copy
}

for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
  const date = d.toISOString().split("T")[0];
  const dayOfWeek = d.getDay(); // 0 for Sunday, 6 for Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // --- Add meals ---
  const breakfastType = isWeekend ? "weekendBreakfast" : "healthyBreakfast";
  const lunchType = isWeekend ? "weekendLunch" : "healthyLunch";
  const dinnerType = isWeekend ? "weekendDinner" : "healthyDinner";

  // Handle leftovers for lunch on weekdays
  let lunch;
  if (!isWeekend && Math.random() < 0.25) {
    // 25% chance of leftovers
    const previousDinner = foodLogs[foodLogs.length - 1] || {};
    lunch = { ...previousDinner, name: `Leftover ${previousDinner.name}` };
  } else {
    lunch = getNextMeal(lunchType);
  }

  let snack;
  if (Math.random() < 0.3) {
    // 30% chance of a snack
    snack = getNextMeal("snacks");
  } else {
    snack = null;
  }

  const mealEntries = [
    { mealType: "breakfast", data: getNextMeal(breakfastType) },
    { mealType: "lunch", data: lunch },
    { mealType: "dinner", data: getNextMeal(dinnerType) },
    { mealType: "snacks", data: snack },
  ];

  // --- Add snack with some probability ---
  if (Math.random() < 0.6) {
    // 60% chance of a snack
    const snackData =
      date === "2025-10-31" ? meals.snacks[4] : getNextMeal("snacks");
    mealEntries.push({ mealType: "snacks", data: snackData });
  }

  // --- Create final log objects with variations ---
  mealEntries.forEach((entry) => {
    const mealData = entry.data;
    if (!mealData) return; // Skip if no data
    foodLogs.push({
      id: crypto.randomUUID(),
      userId: MOCK_USER_ID,
      date: date,
      mealType: entry.mealType as FoodLog["mealType"],
      name: mealData.name,
      calories: vary(mealData.calories),
      proteins: vary(mealData.proteins),
      carbs: vary(mealData.carbs),
      sugars: vary(mealData.sugars),
      fats: vary(mealData.fats),
      saturatedFats: vary(mealData.saturatedFats),
      grams: vary(mealData.grams),
    });
  });
}

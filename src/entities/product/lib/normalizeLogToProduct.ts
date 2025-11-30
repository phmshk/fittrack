import type { FoodLog } from "@/entities/day";
import type { Product } from "@/entities/product";

const DEFAULT_GRAMS = 100;
/**
 * Function to normalize food log, so that it displays macros for 100g.
 * @param food FoodLog to normalize of type FoodLog
 * @returns object of type Product with normalized values.
 * */
export const normalizeLogToProduct = (food: FoodLog): Product => {
  const ratio = DEFAULT_GRAMS / food.grams;
  return {
    product_name: food.name,
    code: food.code,
    nutriments: {
      "energy-kcal_100g": Math.round(food.calories * ratio),
      proteins_100g: Number((food.proteins * ratio).toFixed(1)),
      fat_100g: Number((food.fats * ratio).toFixed(1)),
      "saturated-fat_100g": Number((food.saturatedFats * ratio).toFixed(1)),
      carbohydrates_100g: Number((food.carbs * ratio).toFixed(1)),
      sugars_100g: Number((food.sugars * ratio).toFixed(1)),
    },
    image_url: food.image_url,
  };
};

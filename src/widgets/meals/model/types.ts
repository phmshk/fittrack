import type { MealType } from "@/entities/day";
import breakfastImg from "@/shared/assets/img/breakfast_img.webp";
import lunchImg from "@/shared/assets/img/lunch_img.webp";
import dinnerImg from "@/shared/assets/img/dinner_img.webp";
import snacksImg from "@/shared/assets/img/snacks_img.webp";

export const MEAL_IMAGES: Record<MealType, string> = {
  breakfast: breakfastImg,
  lunch: lunchImg,
  dinner: dinnerImg,
  snacks: snacksImg,
};

export const MEAL_ORDER: MealType[] = [
  "breakfast",
  "lunch",
  "dinner",
  "snacks",
];

export const MEAL_TITLES: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snacks: "Snacks",
};

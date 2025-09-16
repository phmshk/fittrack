import type { MealType } from "@/entities/day";
import breakfastImg from "@/shared/assets/img/breakfast_img.png";
import lunchImg from "@/shared/assets/img/lunch_img.png";
import dinnerImg from "@/shared/assets/img/dinner_img.png";
import snacksImg from "@/shared/assets/img/snacks_img.png";

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

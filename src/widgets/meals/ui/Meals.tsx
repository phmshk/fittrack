import { type FoodLog, type MealType } from "@/entities/day";
import { H2 } from "@/shared/ui/headings";
import { MealCard } from "@/widgets/mealCard";
import { MEAL_IMAGES, MEAL_TITLES } from "../model/types";
import { Spinner } from "@/shared/ui/spinner";
import { useGetMealsFromLogs } from "../model/useGetMealsFromLogs";
import { MealCardCollapsed } from "@/widgets/mealCard/ui/MealCardCollapsed";
import type { DailyTargets } from "@/entities/user";
import { useTranslation } from "react-i18next";

interface MealsProps {
  foodLogs: FoodLog[];
  isLoading: boolean;
  date: Date;
  variant: "full" | "collapsed";
  dailyTargets?: DailyTargets;
}

export const Meals = (props: MealsProps) => {
  const { t } = useTranslation(["dashboard", "common"]);

  const { foodLogs, isLoading, date, variant, dailyTargets } = props;

  const mealsData = useGetMealsFromLogs(foodLogs);

  if (isLoading) {
    return <Spinner text={t("common:loading")} className="h-64" />;
  }

  return (
    <div>
      <H2>{t("common:meals.title")}</H2>
      <div className="mt-6 grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2">
        {variant === "full"
          ? mealsData.map((meal) => (
              <MealCard
                date={date}
                key={meal.mealType}
                mealType={meal.mealType}
                foods={meal.foods}
                totalCalories={meal.totalCalories}
                imageUrl={MEAL_IMAGES[meal.mealType.toLowerCase() as MealType]}
              />
            ))
          : mealsData.map((meal) => (
              <MealCardCollapsed
                key={meal.mealType}
                mealType={meal.mealType}
                foods={meal.foods}
                totalCalories={meal.totalCalories}
                imageUrl={MEAL_IMAGES[meal.mealType.toLowerCase() as MealType]}
                dailyTargets={dailyTargets}
                date={date}
              />
            ))}
      </div>
    </div>
  );
};

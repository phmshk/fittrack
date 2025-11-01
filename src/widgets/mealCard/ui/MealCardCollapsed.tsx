import type { FoodLog, MealType } from "@/entities/day";
import type { DailyTargets } from "@/entities/user";
import { useDateStore } from "@/shared/model";
import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MealCardCollapsedProps {
  mealType: string;
  foods: FoodLog[];
  totalCalories: number;
  imageUrl: string;
  dailyTargets?: DailyTargets;
  date: Date;
}

const MEAL_CALORIE_PERCENTAGE: Record<MealType, number> = {
  breakfast: 0.25,
  lunch: 0.35,
  dinner: 0.25,
  snacks: 0.15,
};

export const MealCardCollapsed = (props: MealCardCollapsedProps) => {
  const { mealType, foods, totalCalories, imageUrl, dailyTargets, date } =
    props;
  const { t } = useTranslation(["dashboard", "common"]);
  const setSelectedDate = useDateStore((state) => state.setSelectedDate);
  const calorieEstimate = dailyTargets?.targetCalories
    ? Math.round(
        dailyTargets?.targetCalories *
          MEAL_CALORIE_PERCENTAGE[mealType.toLowerCase() as MealType],
      ) + t("common:units.kcal")
    : ` (${MEAL_CALORIE_PERCENTAGE[mealType.toLowerCase() as MealType] * 100}% ${t("common:ofDailyGoal")})`;

  return (
    <Card className="w-full max-w-xl flex-row items-center gap-2 border-none px-4">
      <img
        src={imageUrl}
        alt={t("common:mealCard.img.alt", { mealType })}
        className="w-1/4 rounded-full object-cover"
      />
      <div className="flex w-full flex-col">
        <CardHeader>
          <CardTitle>{t(`common:meals.${mealType}`)}</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          {foods.length > 0
            ? foods.map((food) => food.name).join(", ")
            : t("common:recommended") + " " + calorieEstimate}
        </CardContent>
        {/* Separator */}
        {totalCalories > 0 && (
          <div>
            <div className="border-muted m-4 border-t-2" />

            <CardFooter className="text-muted-foreground flex items-center justify-center text-sm">
              {t("common:units.totalCalories", { count: totalCalories })}
            </CardFooter>
          </div>
        )}
      </div>
      <Button
        variant="outline"
        className="size-10 rounded-full p-2"
        onClick={() => {
          setSelectedDate(date);
        }}
        asChild
      >
        <Link
          to="/addFood"
          search={{ tab: mealType.toLowerCase() as MealType }}
          state={{ from: "allowedToAddFood" }}
        >
          <PlusIcon className="size-6" />
        </Link>
      </Button>
    </Card>
  );
};

import type { DaySummary } from "@/entities/day";
import type { DailyTargets } from "@/entities/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { useTranslation } from "react-i18next";

interface CaloriesCardProps {
  userGoals: DailyTargets | undefined;
  summary: DaySummary;
  exercise?: number;
}

export const CaloriesCard = (props: CaloriesCardProps) => {
  const { t } = useTranslation(["dashboard", "common", "nutrition"]);

  const { userGoals, summary, exercise = 0 } = props;

  const isOverGoal =
    summary.remainingCalories < 0 && userGoals?.targetCalories !== undefined;

  const remainingText = isOverGoal
    ? t("dashboard:caloriesCard.caloriesOverGoal", {
        count: -1 * summary.remainingCalories,
      })
    : t("dashboard:caloriesCard.caloriesRemaining", {
        count: summary.remainingCalories,
      });

  const mobileCard = (
    <CardContent className="bg-secondary/80 flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl md:hidden">
      <div
        className={`text-2xl font-bold ${isOverGoal ? "text-destructive" : ""}`}
      >
        {remainingText}
      </div>
    </CardContent>
  );

  const desktopCard = (
    <CardContent className="hidden w-full gap-4 md:flex md:flex-row md:items-end md:justify-between">
      <div className="bg-secondary/80 rounded-xl p-6 md:w-auto">
        <CardTitle className="hidden text-2xl font-bold md:block">
          {t("nutrition:macronutrients.calories")}
        </CardTitle>
        <div className={`font-bold ${isOverGoal ? "text-destructive" : ""}`}>
          {remainingText}
        </div>
      </div>
      <div className="md:bg-secondary/80 hidden md:block md:rounded-xl md:px-3 md:py-2 md:font-bold">
        {t("dashboard:caloriesCard.goal")}: {userGoals?.targetCalories} |{" "}
        {t("dashboard:caloriesCard.eaten")}: {summary.consumedCalories} |{" "}
        {t("dashboard:caloriesCard.exercise")}:{" "}
        {exercise > 0 ? `-${exercise}` : 0}
      </div>
    </CardContent>
  );

  return (
    <>
      {/* Calories Summary Card */}
      <Card className="h-48 w-full justify-end gap-0 border-none bg-[url('@/shared/assets/img/card-background.png')] bg-cover bg-center p-0 md:h-56 md:py-6 lg:h-64">
        <CardDescription className="sr-only">
          {t("dashboard:caloriesCard.caloriesCardSR")}
        </CardDescription>
        {/* Mobile view <768px */}
        {mobileCard}
        {/* Desktop view >768px */}
        {desktopCard}
      </Card>
    </>
  );
};

import type { DaySummary } from "@/entities/day";
import type { UserGoals } from "@/entities/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";

interface CaloriesCardProps {
  userGoals: UserGoals;
  summary: DaySummary;
  exercise?: number;
}

export const CaloriesCard = (props: CaloriesCardProps) => {
  const { userGoals, summary, exercise = 0 } = props;

  const isOverGoal = summary.consumedCalories > userGoals?.targetCalories;

  const mobileCard = (
    <CardContent className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl bg-secondary/80 md:hidden">
      <div className="text-2xl font-bold">
        {isOverGoal ? (
          <span className="text-destructive">{`${-1 * summary.remainingCalories} kcal over goal`}</span>
        ) : (
          `${summary.remainingCalories} kcal remaining`
        )}
      </div>
    </CardContent>
  );

  const desktopCard = (
    <CardContent className="hidden w-full gap-4 md:flex md:flex-row md:items-end md:justify-between">
      <div className="rounded-xl bg-secondary/80 p-6 md:w-auto">
        <CardTitle className="hidden text-2xl font-bold md:block">
          Calories
        </CardTitle>
        <div className="font-bold">
          {isOverGoal ? (
            <span className="text-destructive">{`${-1 * summary.remainingCalories} kcal over goal`}</span>
          ) : (
            `${summary.remainingCalories} kcal remaining`
          )}
        </div>
      </div>
      <div className="hidden md:block md:rounded-xl md:bg-primary md:px-3 md:py-2 md:font-bold md:text-primary-foreground">
        Goal: {userGoals?.targetCalories} | Eaten: {summary.consumedCalories} |
        Exercise: {exercise > 0 ? `-${exercise}` : 0}
      </div>
    </CardContent>
  );

  return (
    <>
      {/* Calories Summary Card */}
      <Card className="h-48 w-full justify-end gap-0 bg-[url('@/shared/assets/img/card-background.png')] bg-cover bg-center p-0 md:h-56 md:py-6 lg:h-64">
        <CardDescription className="sr-only">
          Card showing calories summary.
        </CardDescription>
        {/* Mobile view <768px */}
        {mobileCard}
        {/* Desktop view >768px */}
        {desktopCard}
      </Card>
    </>
  );
};

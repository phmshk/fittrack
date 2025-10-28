import { CaloriesCard } from "@/widgets/caloriesCard";
import { H1 } from "@/shared/ui/headings";
import { useGetFoodsByDate } from "@/entities/day";
import { useDaySummary } from "@/features/getDaySummary";
import { useDateStore } from "@/shared/model";
import { Container } from "@/shared/ui/container/ui/Container";
import { useGetUserData } from "@/entities/user";
import { MacronutrientsChart } from "@/widgets/macronutrientsSummary";
import { WaterTracker } from "@/widgets/waterTracker";
import { Spinner } from "@/shared/ui/spinner";
import { Card, CardContent } from "@/shared/shadcn/components/ui/card";
import { Meals } from "@/widgets/meals";

export const DashboardPage = () => {
  const today = useDateStore((state) => state.today);

  const { data: foodLogs, isLoading: isLoadingLogs } = useGetFoodsByDate(today);
  const { data: userData, isLoading: isLoadingGoals } = useGetUserData();
  const summary = useDaySummary(foodLogs, userData?.dailyTargets);
  const waterTarget = userData?.dailyTargets?.targetWaterIntake;
  const isLoading = isLoadingLogs || isLoadingGoals;

  if (isLoading) {
    return (
      <Container>
        <Spinner text="Loading user data..." />
      </Container>
    );
  }

  return (
    <Container>
      {/* Page heading. Date display */}
      <H1>
        Today,{" "}
        {today.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
        })}
      </H1>
      {/* Water and Macronutrients intake summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
        <div className="col-span-1 md:col-span-2 md:row-span-2">
          <CaloriesCard userGoals={userData?.dailyTargets} summary={summary} />
        </div>
        <div className="col-span-1 md:row-span-3">
          <MacronutrientsChart daySummary={summary} />
        </div>
        <div className="col-span-1 md:col-span-2 md:row-span-1">
          {waterTarget ? (
            <WaterTracker date={today} targetWaterIntake={waterTarget} />
          ) : (
            <Card className="border-none">
              <CardContent className="flex h-48 items-center justify-center">
                <span className="text-muted-foreground">
                  No water intake goal set
                </span>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      {/* Meals summary */}
      {foodLogs ? (
        <Meals
          foodLogs={foodLogs}
          isLoading={isLoading}
          date={today}
          variant="collapsed"
          dailyTargets={userData?.dailyTargets}
        />
      ) : (
        <div>No food logs available</div>
      )}
    </Container>
  );
};

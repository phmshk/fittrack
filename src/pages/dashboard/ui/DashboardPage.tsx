import { CaloriesCard } from "@/widgets/caloriesCard";
import { H1 } from "@/shared/ui/headings";
import { Meals } from "@/widgets/meals";
import { useGetFoodsByDate } from "@/entities/day";
import { useDaySummary } from "@/features/getDaySummary";
import { useDateStore } from "@/shared/model";
import { Container } from "@/shared/ui/container/ui/Container";
import { useGetUserData } from "@/entities/user";
import { MacronutrientsChart } from "@/widgets/macronutrientsSummary";
import { WaterTracker } from "@/widgets/waterTracker";

export const DashboardPage = () => {
  const today = useDateStore((state) => state.today);

  const { data: foodLogs, isLoading: isLoadingLogs } = useGetFoodsByDate(today);
  const { data: userData, isLoading: isLoadingGoals } = useGetUserData();
  const summary = useDaySummary(foodLogs, userData?.dailyTargets);
  const isLoading = isLoadingLogs || isLoadingGoals;

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
        <div className="col-span-1 md:col-span-2 md:row-span-2">
          <CaloriesCard userGoals={userData?.dailyTargets} summary={summary} />
        </div>
        <div className="col-span-1 md:row-span-3">
          <MacronutrientsChart daySummary={summary} />
        </div>
        <div className="col-span-1 md:col-span-2 md:row-span-1">
          <WaterTracker date={today} />
        </div>
      </div>

      {/* Meals summary */}
      <Meals date={today} foodLogs={foodLogs} isLoading={isLoading} />
    </Container>
  );
};

import { CaloriesCard } from "@/widgets/caloriesCard";
import { H1 } from "@/shared/ui/headings";
import { Meals } from "@/widgets/meals";
import { useGetFoodsByDate } from "@/entities/day";
import { useGetUserGoals } from "@/entities/user";
import { useDaySummary } from "@/features/getDaySummary";
import { useDateStore } from "@/shared/model";

export const DashboardPage = () => {
  const today = useDateStore((state) => state.today);

  const { data: foodLogs, isLoading: isLoadingLogs } = useGetFoodsByDate(today);
  const { data: userGoals, isLoading: isLoadingGoals } = useGetUserGoals();
  const summary = useDaySummary(foodLogs, userGoals);
  const isLoading = isLoadingLogs || isLoadingGoals;

  return (
    <section className="container mx-auto flex max-w-6xl flex-col gap-4 p-4 md:gap-6">
      {/* Page heading. Date display */}
      <H1>
        Today,{" "}
        {today.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
        })}
      </H1>
      {/* Calories summary card */}
      <CaloriesCard userGoals={userGoals!} summary={summary} />

      {/* Meals summary */}
      <Meals date={today} foodLogs={foodLogs} isLoading={isLoading} />
    </section>
  );
};

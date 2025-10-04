import { CaloriesCard } from "@/widgets/caloriesCard";
import { H1 } from "@/shared/ui/headings";
import { Meals } from "@/widgets/meals";
import { useGetFoodsByDate } from "@/entities/day";
import { useGetUserGoals } from "@/entities/user";
import { useDaySummary } from "@/features/getDaySummary";
import { useDateStore } from "@/shared/model";
import { Container } from "@/shared/ui/container/ui/Container";

export const DashboardPage = () => {
  const today = useDateStore((state) => state.today);

  const { data: foodLogs, isLoading: isLoadingLogs } = useGetFoodsByDate(today);
  const { data: userGoals, isLoading: isLoadingGoals } = useGetUserGoals();
  const summary = useDaySummary(foodLogs, userGoals);
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
      {/* Calories summary card */}
      <CaloriesCard userGoals={userGoals!} summary={summary} />

      {/* Meals summary */}
      <Meals date={today} foodLogs={foodLogs} isLoading={isLoading} />
    </Container>
  );
};

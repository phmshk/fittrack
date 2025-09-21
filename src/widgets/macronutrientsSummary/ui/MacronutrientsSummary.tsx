import { type DaySummary } from "@/entities/day";
import type { UserGoals } from "@/entities/user";
import { H2 } from "@/shared/ui/headings";
import { ProgressBar } from "@/shared/ui/progressBar";
import { Spinner } from "@/shared/ui/spinner";
import { useMemo } from "react";

interface MacronutrientsSummaryProps {
  summary: DaySummary;
  userGoals: UserGoals;
  isLoading: boolean;
}

export const MacronutrientsSummary = (props: MacronutrientsSummaryProps) => {
  const { summary, userGoals, isLoading } = props;

  const result = useMemo(() => {
    return [
      {
        name: "Proteins",
        current: summary.consumedProteins,
        goal: userGoals?.targetProteins || 0,
        units: "g",
      },
      {
        name: "Fats",
        current: summary.consumedFats,
        goal: userGoals?.targetFats || 0,
        units: "g",
      },
      {
        name: "Carbs",
        current: summary.consumedCarbs,
        goal: userGoals?.targetCarbs || 0,
        units: "g",
      },
    ];
  }, [summary, userGoals]);

  if (isLoading) {
    return <Spinner text="Loading..." className="h-64" />;
  }

  return (
    <>
      <H2>Macronutrients</H2>
      {result.map((nutrient) => (
        <ProgressBar
          key={nutrient.name}
          currentValue={nutrient.current}
          goalValue={nutrient.goal}
          label={nutrient.name}
          units={nutrient.units}
        />
      ))}
    </>
  );
};

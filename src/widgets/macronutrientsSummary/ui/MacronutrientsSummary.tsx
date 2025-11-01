import { type DaySummary } from "@/entities/day";
import type { DailyTargets } from "@/entities/user";
import { H2 } from "@/shared/ui/headings";
import { ProgressBar } from "@/shared/ui/progressBar";
import { Spinner } from "@/shared/ui/spinner";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface MacronutrientsSummaryProps {
  summary: DaySummary;
  userGoals: DailyTargets;
  isLoading: boolean;
}

export const MacronutrientsSummary = (props: MacronutrientsSummaryProps) => {
  const { summary, userGoals, isLoading } = props;
  const { t } = useTranslation(["common", "nutrition"]);

  const result = useMemo(() => {
    return [
      {
        name: t("nutrition:macronutrients.proteins"),
        current: Number(summary.consumedProteins.toFixed(1)),
        goal: userGoals?.targetProteins || 0,
        units: t("nutrition:units:g"),
      },
      {
        name: t("nutrition:macronutrients.fats"),
        current: Number(summary.consumedFats.toFixed(1)),
        goal: userGoals?.targetFats || 0,
        units: t("nutrition:units:g"),
      },
      {
        name: t("nutrition:macronutrients.carbs"),
        current: Number(summary.consumedCarbs.toFixed(1)),
        goal: userGoals?.targetCarbs || 0,
        units: t("nutrition:units:g"),
      },
    ];
  }, [summary, userGoals]);

  if (isLoading) {
    return <Spinner text={t("common:loading")} className="h-64" />;
  }

  return (
    <>
      <H2>{t("nutrition:macronutrients.title")}</H2>
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

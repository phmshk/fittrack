import type { CalculationResult } from "@/entities/user";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/shared/shadcn/components/ui/card";
import { Beef, Droplet, Flame, Wheat, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

interface RecommendationsProps {
  dailyNeeds: CalculationResult;
  className?: string;
}

export const Recommendations = (props: RecommendationsProps) => {
  const { dailyNeeds, className } = props;
  const { t } = useTranslation("nutrition");

  const resultCards = [
    {
      title: t("nutrition:macronutrients.calories"),
      value: t("nutrition:units.totalCalories", {
        count: Number(dailyNeeds.caloriesForGoal.toFixed(1)),
      }),
      icon: <Flame stroke="var(--calories-color)" className="size-6" />,
    },
    {
      title: t("nutrition:macronutrients.water"),
      value: t("nutrition:units.totalMl", {
        count: Number(dailyNeeds.waterIntake.totalIntakeMl.toFixed(1)),
      }),
      icon: <Droplet stroke="var(--water-color)" className="size-6" />,
    },
    {
      title: t("nutrition:macronutrients.proteins"),
      value: t("nutrition:units.totalGrams", {
        count: Number(dailyNeeds.macronutrients.proteins.toFixed(1)),
      }),
      icon: <Beef stroke="var(--proteins-color)" className="size-6" />,
    },
    {
      title: t("nutrition:macronutrients.carbs"),
      value: t("nutrition:units.totalGrams", {
        count: Number(dailyNeeds.macronutrients.carbs.toFixed(1)),
      }),
      icon: <Wheat stroke="var(--carbs-color)" className="size-6" />,
    },
    {
      title: t("nutrition:macronutrients.fats"),
      value: t("nutrition:units.totalGrams", {
        count: Number(dailyNeeds.macronutrients.fats.toFixed(1)),
      }),
      icon: <Zap stroke="var(--fats-color)" className="size-6" />,
    },
  ];

  return (
    <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 ${className}`}>
      {resultCards.map((card) => (
        <Card key={card.title} className="text-center">
          <CardHeader className="pb-2">
            <div className="bg-secondary mx-auto flex size-12 items-center justify-center rounded-full">
              {card.icon}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">{card.title}</p>
            <p className="text-lg font-bold">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

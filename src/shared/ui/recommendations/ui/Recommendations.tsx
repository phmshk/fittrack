import type { CalculationResult } from "@/entities/user";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/shared/shadcn/components/ui/card";
import { Beef, Droplet, Flame, Wheat, Zap } from "lucide-react";

interface RecommendationsProps {
  dailyNeeds: CalculationResult;
  className?: string;
}

export const Recommendations = (props: RecommendationsProps) => {
  const { dailyNeeds, className } = props;

  const resultCards = [
    {
      title: "Calories",
      value: `${dailyNeeds.caloriesForGoal} kcal`,
      icon: <Flame stroke="var(--calories-color)" className="size-6" />,
    },
    {
      title: "Water",
      value: `${dailyNeeds.waterIntake.totalIntakeLiters.toFixed(1)} L`,
      icon: <Droplet stroke="var(--water-color)" className="size-6" />,
    },
    {
      title: "Protein",
      value: `${dailyNeeds.macronutrients.proteins} g`,
      icon: <Beef stroke="var(--proteins-color)" className="size-6" />,
    },
    {
      title: "Carbs",
      value: `${dailyNeeds.macronutrients.carbs} g`,
      icon: <Wheat stroke="var(--carbs-color)" className="size-6" />,
    },
    {
      title: "Fats",
      value: `${dailyNeeds.macronutrients.fats} g`,
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

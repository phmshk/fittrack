import {
  Card,
  CardContent,
  CardHeader,
} from "@/shared/shadcn/components/ui/card";
import { Flame, Droplet, Beef, Wheat, Zap } from "lucide-react";
import type { CalculationResult } from "../model/types";

interface RecommendationsProps {
  dailyNeeds: CalculationResult | null;
}

export const Recommendations = ({ dailyNeeds }: RecommendationsProps) => {
  if (!dailyNeeds) {
    return null;
  }

  const resultCards = [
    {
      title: "Calories",
      value: `${dailyNeeds.caloriesForGoal} kcal`,
      icon: <Flame className="size-6 text-rose-500" />,
    },
    {
      title: "Water",
      value: `${dailyNeeds.waterIntake.totalIntakeLiters.toFixed(1)} L`,
      icon: <Droplet className="size-6 text-blue-500" />,
    },
    {
      title: "Protein",
      value: `${dailyNeeds.macronutrients.proteins} g`,
      icon: <Beef className="size-6 text-red-500" />,
    },
    {
      title: "Carbs",
      value: `${dailyNeeds.macronutrients.carbs} g`,
      icon: <Wheat className="size-6 text-yellow-500" />,
    },
    {
      title: "Fats",
      value: `${dailyNeeds.macronutrients.fats} g`,
      icon: <Zap className="size-6 text-orange-500" />,
    },
  ];
  return (
    <div className="animate-in fade-in-20 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Your Daily Targets</h2>
        <p className="text-muted-foreground">
          Here are our recommendations. You can adjust these if you'd like.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
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
    </div>
  );
};

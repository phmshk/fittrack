import { useFormContext } from "react-hook-form";
import { useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/shared/shadcn/components/ui/card";
import { Flame, Droplet, Zap, Wheat, Beef } from "lucide-react";
import { Button } from "@/shared/shadcn/components/ui/button";
import { calculateDailyNeeds } from "../lib/calc";

interface ResultsProps {
  onRecalculate: () => void;
}

export const ResultsDisplay = ({ onRecalculate }: ResultsProps) => {
  const { watch, setValue } = useFormContext();
  const watchedValues = watch([
    "goal",
    "activityLevel",
    "age",
    "gender",
    "weight",
    "height",
  ]);

  const dailyNeeds = useMemo(() => {
    if (watchedValues.every((value) => value !== undefined && value !== "")) {
      const [goal, activityLevel, age, gender, weight, height] = watchedValues;
      return calculateDailyNeeds({
        activityLevel,
        age: Number(age),
        gender,
        weight: Number(weight),
        height: Number(height),
        goal,
      });
    }
    return null;
  }, [watchedValues]);

  useEffect(() => {
    if (dailyNeeds) {
      setValue("targetCalories", String(dailyNeeds.caloriesForGoal));
      setValue("targetProteins", String(dailyNeeds.macronutrients.proteins));
      setValue("targetCarbs", String(dailyNeeds.macronutrients.carbs));
      setValue("targetFats", String(dailyNeeds.macronutrients.fats));
      setValue(
        "targetWaterIntake",
        String(dailyNeeds.waterIntake.totalIntakeMl),
      );
    }
  }, [dailyNeeds, setValue]);

  if (!dailyNeeds) {
    return (
      <div className="text-center">
        <p>Please go back and fill in all your details.</p>
        <Button onClick={onRecalculate} variant="link">
          Go Back
        </Button>
      </div>
    );
  }

  const resultCards = [
    {
      title: "Calories",
      value: `${dailyNeeds.caloriesForGoal} kcal`,
      icon: <Flame className="text-destructive size-6" />,
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
      <div className="text-center">
        <Button variant="link" onClick={onRecalculate}>
          Want to make changes? Go back
        </Button>
      </div>
    </div>
  );
};

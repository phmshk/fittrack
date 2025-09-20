import { H2 } from "@/shared/ui/headings";
import { ProgressBar } from "@/shared/ui/progressBar";
import { useMemo } from "react";

export const MacronutrientsSummary = () => {
  // Dummy data for demonstration purposes
  const proteins = { current: 120, goal: 150 };
  const fats = { current: 70, goal: 80 };
  const carbs = { current: 250, goal: 300 };

  const result = useMemo(() => {
    return [
      {
        name: "Proteins",
        current: Number(proteins.current.toFixed(1)),
        goal: proteins.goal,
        units: "g",
      },
      {
        name: "Fats",
        current: Number(fats.current.toFixed(1)),
        goal: fats.goal,
        units: "g",
      },
      {
        name: "Carbs",
        current: Number(carbs.current.toFixed(1)),
        goal: carbs.goal,
        units: "g",
      },
    ];
  }, [proteins, fats, carbs]);

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

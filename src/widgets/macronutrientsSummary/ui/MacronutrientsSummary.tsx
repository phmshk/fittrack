import { H2 } from "@/shared/ui/headings";
import { ProgressBar } from "@/shared/ui/progressBar";

interface NutrientData {
  current: number;
  goal: number;
  name: string;
  units: string;
}

interface MacronutrientsSummaryProps {
  children?: React.ReactNode;
  macronutrients: NutrientData[];
}

export const MacronutrientsSummary = (props: MacronutrientsSummaryProps) => {
  const { macronutrients } = props;

  return (
    <>
      <H2>Macronutrients</H2>
      {macronutrients.map((nutrient) => (
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

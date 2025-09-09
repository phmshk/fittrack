import { FoodItem } from "@/shared/ui/foodItem/ui/FoodItem";
import { H2 } from "@/shared/ui/headings";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

interface FoodItem {
  id: number;
  name: string;
  grams: number;
  calories: number;
}

interface MealData {
  name: string;
  foods: FoodItem[];
}

interface MealsProps {
  mealsData: MealData[];
}

export const Meals = ({ mealsData }: MealsProps) => {
  const calculateMealCalories = (foods: FoodItem[]) => {
    return foods.reduce((acc, food) => acc + food.calories, 0);
  };

  return (
    <>
      <H2>Meals</H2>
      <Accordion type="single" collapsible className="w-full">
        {mealsData.map((meal) => (
          <AccordionItem
            className="mb-2 rounded-md border-2 px-4 py-2 text-sm font-medium"
            key={meal.name}
            value={meal.name}
          >
            <AccordionTrigger className="flex w-full cursor-pointer justify-between text-left [&[data-state=open]>svg]:rotate-180">
              <div>
                <span className="font-bold">{meal.name}</span>{" "}
                <span className="text-secondary-foreground">{`${calculateMealCalories(meal.foods)} kcal`}</span>
              </div>
              <ChevronDown className="pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 pt-4 transition-all duration-1000">
              {meal.foods.length === 0 ? (
                <div className="text-sm">No foods added.</div>
              ) : (
                <>
                  {meal.foods.map((food) => (
                    <FoodItem
                      key={food.id}
                      name={food.name}
                      grams={food.grams}
                      calories={food.calories}
                      className="border border-border last:border-0"
                    />
                  ))}
                  <div className="text-sm font-medium">
                    Total Calories:{" "}
                    <span className="text-secondary-foreground">
                      {calculateMealCalories(meal.foods)}
                    </span>
                  </div>
                </>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

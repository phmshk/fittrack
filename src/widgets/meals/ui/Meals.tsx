import { FoodItem } from "@/shared/ui/foodItem/ui/FoodItem";
import { H2 } from "@/shared/ui/headings";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { ChevronDown, Plus } from "lucide-react";
import { useDayStore, type MealType } from "@/entities/day";
import { useMemo } from "react";
import { AddFood } from "@/features/addFood";
import { DeleteFood } from "@/features/deleteFood";
import { FoodDetails } from "@/features/foodDetails/ui/FoodDetails";

export const Meals = () => {
  const mealsData = useDayStore((state) => state.meals);

  const mealsArray = useMemo(() => {
    return Object.entries(mealsData).map(([mealName, foods]) => {
      const totalCalories = foods.reduce((acc, food) => acc + food.calories, 0);

      return {
        name: mealName.charAt(0).toUpperCase() + mealName.slice(1),
        foods,
        totalCalories,
      };
    });
  }, [mealsData]);

  return (
    <>
      <H2>Meals</H2>
      {/* Accordion for meal types */}
      <Accordion type="single" collapsible className="w-full">
        {/* Meal Type Sections */}
        {/* Single Accordion Item for each meal type */}
        {mealsArray.map((meal) => (
          <AccordionItem
            className="mb-2 rounded-md border-2 px-4 py-2 text-sm font-medium"
            key={meal.name}
            value={meal.name}
          >
            <AccordionTrigger className="flex w-full cursor-pointer justify-between text-left [&[data-state=open]>svg]:rotate-180">
              <div>
                <span className="font-bold">{meal.name}</span>{" "}
                <span className="text-secondary-foreground">{`${meal.totalCalories} kcal`}</span>
              </div>
              <ChevronDown className="pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 pt-4 transition-all duration-1000">
              {meal.foods.length === 0 ? (
                <div className="flex items-center justify-between gap-4">
                  {/* Empty state */}
                  <div className="text-sm">No food added yet.</div>
                  <AddFood
                    mealName={meal.name.toLowerCase() as MealType}
                    triggerButtonProps={{
                      children: <Plus className="size-4" />,
                    }}
                  />
                </div>
              ) : (
                <>
                  {/* List of Food Items  */}
                  {meal.foods.map((food) => (
                    <FoodItem
                      key={food.id}
                      food={food}
                      actions={
                        <>
                          <DeleteFood
                            entryId={food.id}
                            mealType={meal.name.toLowerCase() as MealType}
                          />
                          <FoodDetails foodEntry={food} />
                        </>
                      }
                      className="border border-border last:border-0"
                    />
                  ))}
                  <div className="flex items-center justify-between text-sm font-medium">
                    <div>
                      Total Calories:{" "}
                      <span className="text-secondary-foreground">
                        {meal.totalCalories} kcal
                      </span>
                    </div>
                    <AddFood
                      mealName={meal.name.toLowerCase() as MealType}
                      triggerButtonProps={{
                        children: (
                          <div className="flex items-center justify-between gap-2">
                            <Plus className="size-4" />
                            <span className="hidden sm:block">Add more</span>
                          </div>
                        ),
                      }}
                    />
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

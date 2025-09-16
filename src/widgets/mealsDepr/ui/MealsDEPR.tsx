import { FoodItem } from "@/shared/ui/foodItem";
import { H2 } from "@/shared/ui/headings";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/shared/shadcn/components/ui/accordion";
import { Plus } from "lucide-react";
import { useDayStore, type MealType } from "@/entities/day";
import { useMemo } from "react";
import { AddFood } from "@/features/addFood";
//! DO NOT USE THIS ELEMENT. IT'S DEPRECATED. SEE src/widgets/meals/... INSTEAD.

export const MealsDEPR = () => {
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
            className="mb-2 rounded-md border-none bg-white px-4 py-2 text-sm font-medium"
            key={meal.name}
            value={meal.name}
          >
            <AccordionTrigger className="cursor-pointer">
              <div>
                <span className="font-bold">{meal.name}</span>{" "}
                <span className="text-secondary-foreground">{`${meal.totalCalories} kcal`}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 pt-4">
              {meal.foods.length === 0 ? (
                <div className="flex items-center justify-between gap-4">
                  {/* Empty state */}
                  <div className="text-sm">No food added yet.</div>
                  <AddFood
                    mealType={meal.name.toLowerCase() as MealType}
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
                      className="border border-border"
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
                      mealType={meal.name.toLowerCase() as MealType}
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

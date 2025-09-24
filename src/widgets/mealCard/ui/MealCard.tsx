import type { FoodLog, MealType } from "@/entities/day";
import { AddFood } from "@/features/addFood";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { FoodItem } from "@/shared/ui/foodItem";
import { Database, PlusCircleIcon, ScanBarcode, Utensils } from "lucide-react";
import { FoodOptions } from "./FoodOptions";
import { useMemo, useState } from "react";
import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/shadcn/components/ui/tooltip";

interface MealCardProps {
  mealType: string;
  foods: FoodLog[];
  totalCalories: number;
  imageUrl: string;
  date: Date;
}

const VISIBLE_ITEMS_LIMIT = 3;

export const MealCard = (props: MealCardProps) => {
  const { mealType, date, foods, totalCalories, imageUrl } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const visibleFoods = useMemo(() => {
    if (isExpanded) return foods;
    return foods.slice(0, VISIBLE_ITEMS_LIMIT);
  }, [foods, isExpanded]);

  return (
    <Card className="w-full max-w-lg border-none">
      <CardHeader className="flex items-center justify-between gap-4 pt-4 pb-2">
        <div>
          <CardTitle className="text-4xl font-bold sm:text-5xl">
            {mealType}
          </CardTitle>
          <CardDescription>
            <span className="text-secondary-foreground sm:text-lg">
              {totalCalories} kcal
            </span>
            <span className="sr-only">
              Meal card for {mealType} summarizing all foods eaten for that meal
            </span>
          </CardDescription>
        </div>
        <img
          src={imageUrl}
          alt={`${mealType} illustration`}
          className="w-1/3 rounded-full object-cover"
        />
      </CardHeader>
      <CardContent className="h-full">
        {foods.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-secondary-foreground">
            <div className="mb-4 rounded-full border-4 border-primary/40 p-8">
              <Utensils className="size-16 text-primary-foreground" />
            </div>
            <p className="mb-4 text-center text-sm">
              No food added yet for {mealType}.
            </p>
          </div>
        ) : (
          <ul>
            {visibleFoods.map((food) => (
              <li
                key={food.id}
                className="border-b border-foreground/10 last:border-0"
              >
                <FoodItem
                  food={food}
                  actions={<FoodOptions foodEntry={food} />}
                />
              </li>
            ))}
          </ul>
        )}
        {foods.length > VISIBLE_ITEMS_LIMIT &&
          (isExpanded ? (
            <Button
              variant="link"
              className="mt-2 w-full text-muted-foreground"
              onClick={() => setIsExpanded(false)}
            >
              Show less foods
            </Button>
          ) : (
            <Button
              variant="link"
              className="mt-2 w-full text-muted-foreground"
              onClick={() => setIsExpanded(true)}
            >
              Show all ({foods.length}) foods
            </Button>
          ))}
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-3 pt-2">
        <div className="flex w-full items-center gap-2">
          <AddFood
            mealType={mealType.toLowerCase() as MealType}
            date={date}
            triggerButtonProps={{
              className: "flex-grow",
              children: (
                <span className="flex items-center gap-2 text-primary-foreground">
                  <PlusCircleIcon className="size-4" />
                  Add Food
                </span>
              ),
            }}
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => {}}>
                  <ScanBarcode className="size-5" />
                  <span className="sr-only">Scan Barcode</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Scan Barcode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button
          variant="link"
          className="text-muted-foreground"
          onClick={() => {}}
        >
          <Database className="mr-2 size-4" />
          Add from Open Food Facts
        </Button>
      </CardFooter>
    </Card>
  );
};

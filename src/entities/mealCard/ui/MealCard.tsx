import type { FoodEntry, MealType } from "@/entities/day";
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
import { PlusCircleIcon } from "lucide-react";
import { FoodOptions } from "./FoodOptions";

interface MealCardProps {
  mealType: string;
  foods: FoodEntry[];
  totalCalories: number;
  imageUrl: string;
}

export const MealCard = (props: MealCardProps) => {
  const { mealType, foods, totalCalories, imageUrl } = props;
  return (
    <Card className="w-full max-w-lg border-none shadow-lg">
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
          <div className="text-sm text-secondary-foreground">
            No food added yet. Add some delicious items to your{" "}
            {mealType.toLowerCase()}!
          </div>
        ) : (
          <ul>
            {foods.map((food) => (
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
      </CardContent>
      <CardFooter>
        <AddFood
          mealType={mealType.toLowerCase() as MealType}
          triggerButtonProps={{
            className: "w-full",
            variant: "default",
            children: (
              <span className="flex items-center gap-2 text-primary-foreground">
                <PlusCircleIcon className="size-4" />
                Add Food
              </span>
            ),
          }}
        />
      </CardFooter>
    </Card>
  );
};

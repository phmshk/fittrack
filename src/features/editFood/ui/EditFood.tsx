import { useDayStore, type FoodEntry, type MealType } from "@/entities/day";
import type { FormOutput } from "@/entities/foodForm";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/shared/shadcn/components/ui/dialog";
import { FoodForm } from "@/entities/foodForm";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Pencil } from "lucide-react";

interface EditFoodProps {
  mealType: MealType;
  food: FoodEntry;
}

export const EditFood = ({ mealType, food }: EditFoodProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const editFoodEntry = useDayStore((state) => state.editFoodEntry);

  const handleFormSubmit = (data: FormOutput) => {
    editFoodEntry(mealType, {
      id: food.id,
      mealType: data.mealType,
      name: data.foodName,
      grams: Number(data.grams),
      calories: Number(data.calories),
      proteins: Number(data.proteins),
      carbs: Number(data.carbs),
      fats: Number(data.fats),
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Edit food entry">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit food Entry</DialogTitle>
          <DialogDescription className="mb-4">
            Edit the form below to modify the food item in your meal plan.
            <span className="sr-only">
              This will update the food item in your meal plan.
            </span>
          </DialogDescription>
          <FoodForm
            onSubmit={handleFormSubmit}
            initialData={{
              mealType: mealType,
              foodName: food.name,
              grams: food.grams.toString(),
              calories: food.calories.toString(),
              proteins: food.proteins.toString(),
              carbs: food.carbs.toString(),
              fats: food.fats.toString(),
            }}
            submitText="Save changes"
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

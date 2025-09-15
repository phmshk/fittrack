import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/shared/shadcn/components/ui/dialog";
import { Button } from "@/shared/shadcn/components/ui/button";
import { useState } from "react";
import { useDayStore, type MealType } from "@/entities/day";
import { FoodForm } from "@/entities/foodForm/ui/FoodForm";
import type { FormOutput } from "@/entities/foodForm";

interface AddFoodProps {
  triggerButtonProps: React.ComponentProps<typeof Button>;
  mealType?: MealType | undefined;
}

export const AddFood = ({ triggerButtonProps, mealType }: AddFoodProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const addFoodEntry = useDayStore((state) => state.addFoodEntry);
  const handleFormSubmit = (data: FormOutput) => {
    addFoodEntry(data.mealType!, {
      name: data.foodName,
      mealType: data.mealType!,
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
        <Button className="w-fit self-end" {...triggerButtonProps} />
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Food to Meal Plan</DialogTitle>
          <DialogDescription className="mb-4">
            Fill out the form below to add a new food item to your meal plan.
            <span className="sr-only">
              This will add the food item to your meal plan.
            </span>
          </DialogDescription>
        </DialogHeader>
        <FoodForm
          onSubmit={handleFormSubmit}
          initialData={{ mealType }}
          submitText="Save changes"
        />
      </DialogContent>
    </Dialog>
  );
};

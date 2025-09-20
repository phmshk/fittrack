import type { FormOutput } from "@/entities/foodForm";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/shared/shadcn/components/ui/dialog";
import { FoodForm } from "@/entities/foodForm";
import type { FoodLog, MealType } from "@/entities/day";

interface EditFoodProps {
  mealType: MealType;
  food: FoodLog;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const EditFood = ({
  mealType,
  food,
  isOpen,
  setIsOpen,
}: EditFoodProps) => {
  const handleFormSubmit = (data: FormOutput) => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              grams: food.grams,
              calories: food.calories,
              proteins: food.proteins,
              carbs: food.carbs,
              fats: food.fats,
            }}
            submitText="Save changes"
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

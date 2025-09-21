import type { FormOutput } from "@/entities/foodForm";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/shared/shadcn/components/ui/dialog";
import { FoodForm } from "@/entities/foodForm";
import { useUpdateFoodLog, type FoodLog } from "@/entities/day";
import {
  foodLogToZodInput,
  zodInputToFoodLogInput,
} from "@/entities/foodForm/model/helpers";

interface EditFoodProps {
  food: FoodLog;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const EditFood = ({ food, isOpen, setIsOpen }: EditFoodProps) => {
  const { mutate } = useUpdateFoodLog();

  const handleFormSubmit = (data: FormOutput) => {
    const formattedData = zodInputToFoodLogInput(data);
    mutate({ id: food.id, updatedLog: formattedData });
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
            initialData={foodLogToZodInput(food)}
            submitText="Save changes"
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

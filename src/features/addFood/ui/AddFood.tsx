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
import {
  FoodForm,
  useAddFoodLog,
  type FormOutput,
  type MealType,
} from "@/entities/day";
import { formatDateForApi } from "@/shared/lib/utils";

interface AddFoodProps {
  triggerButtonProps: React.ComponentProps<typeof Button>;
  mealType?: MealType;
  date: Date;
  initialData?: Partial<FormOutput>;
}

export const AddFood = (props: AddFoodProps) => {
  const { triggerButtonProps, mealType, date, initialData } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { mutate } = useAddFoodLog();

  const handleFormSubmit = (data: FormOutput) => {
    console.log("Submitting form data:", data);
    mutate(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit" {...triggerButtonProps} />
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
          initialData={{
            mealType,
            date: formatDateForApi(date),
            ...initialData,
          }}
          onSubmit={handleFormSubmit}
          submitText="Add Entry"
        />
      </DialogContent>
    </Dialog>
  );
};

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/shared/shadcn/components/ui/dialog";
import { AddFoodForm } from "./AddFoodForm";
import { Button } from "@/shared/shadcn/components/ui/button";
import { useState } from "react";
import type { MealType } from "@/entities/day";

interface AddFoodProps {
  triggerButtonProps: React.ComponentProps<typeof Button>;
  mealName?: MealType | undefined;
}

export const AddFood = ({ triggerButtonProps, mealName }: AddFoodProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
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
        <AddFoodForm onClose={handleClose} mealName={mealName} />
      </DialogContent>
    </Dialog>
  );
};

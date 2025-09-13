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

export const AddFood = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit cursor-pointer self-end">Add Food</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Food to Meal Plan</DialogTitle>
          <DialogDescription className="mb-4">
            Fill out the form below to add a new food item to your meal plan.
            <span className="sr-only">
              This will add the food item to your meal plan.
            </span>
          </DialogDescription>
        </DialogHeader>
        <AddFoodForm onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

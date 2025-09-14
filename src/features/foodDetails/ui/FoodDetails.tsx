import type { FoodEntry } from "@/entities/day";
import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/shadcn/components/ui/dialog";
import { Eye } from "lucide-react";
import { useState } from "react";

interface FoodDetailsProps {
  foodEntry: FoodEntry;
}
export const FoodDetails = (props: FoodDetailsProps) => {
  const { foodEntry } = props;
  const [isOpen, setIsOpen] = useState(false);
  const onChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="See food details">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{foodEntry.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Modal for food details like protein, carbs, fat, calories
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-muted-foreground">Calories</span>
            <span className="text-right font-medium">
              {foodEntry.calories} kcal
            </span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-muted-foreground">Proteins</span>
            <span className="text-right font-medium">
              {foodEntry.proteins} g
            </span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-muted-foreground">Fats</span>
            <span className="text-right font-medium">{foodEntry.fats} g</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-muted-foreground">Carbs</span>
            <span className="text-right font-medium">{foodEntry.carbs} g</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

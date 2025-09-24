import type { FoodLog } from "@/entities/day";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/shadcn/components/ui/dialog";

interface FoodDetailsProps {
  foodEntry: FoodLog;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
export const FoodDetails = (props: FoodDetailsProps) => {
  const { foodEntry, isOpen, setIsOpen } = props;
  const onChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
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

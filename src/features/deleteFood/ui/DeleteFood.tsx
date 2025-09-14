import { useDayStore } from "@/entities/day";
import type { MealType } from "@/entities/day";
import { Button, buttonVariants } from "@/shared/shadcn/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/shadcn/components/ui/alert-dialog";
import { cn } from "@/shared/shadcn/lib/utils";

interface DeleteFoodProps {
  mealType: MealType;
  entryId: string;
}

export const DeleteFood = (props: DeleteFoodProps) => {
  const { mealType, entryId } = props;
  const removeFoodEntry = useDayStore((state) => state.removeFoodEntry);

  const handleDelete = () => {
    removeFoodEntry(mealType, entryId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Delete food entry"
          className="hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the food
            entry.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

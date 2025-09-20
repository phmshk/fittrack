import type { MealType } from "@/entities/day";
import { buttonVariants } from "@/shared/shadcn/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/shadcn/components/ui/alert-dialog";
import { cn } from "@/shared/shadcn/lib/utils";

interface DeleteFoodProps {
  mealType: MealType;
  entryId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const DeleteFood = (props: DeleteFoodProps) => {
  const { mealType, entryId, isOpen, setIsOpen } = props;

  const handleDelete = () => {
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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

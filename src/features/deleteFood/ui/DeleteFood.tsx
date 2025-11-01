import { useDeleteFoodLog, type FoodLog } from "@/entities/day";
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
import { useTranslation } from "react-i18next";

interface DeleteFoodProps {
  food: FoodLog;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const DeleteFood = (props: DeleteFoodProps) => {
  const { food, isOpen, setIsOpen } = props;
  const { t } = useTranslation(["common", "food"]);

  const { mutate } = useDeleteFoodLog();

  const handleDelete = () => {
    mutate({ id: food.id, date: food.date });
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("food:deleteFoodModal.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("food:deleteFoodModal.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common:actions.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={handleDelete}
          >
            {t("common:actions.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

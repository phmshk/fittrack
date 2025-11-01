import type { FoodLog } from "@/entities/day";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/shadcn/components/ui/dialog";
import { useTranslation } from "react-i18next";

interface FoodDetailsProps {
  foodEntry: FoodLog;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
export const FoodDetails = (props: FoodDetailsProps) => {
  const { foodEntry, isOpen, setIsOpen } = props;
  const { t } = useTranslation(["common", "food", "nutrition"]);
  const onChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{foodEntry.name}</DialogTitle>
          <DialogDescription className="sr-only">
            {t("food:foodDetailsModal.srDescription")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-muted-foreground">
              {t("nutrition:macronutrients.calories")}
            </span>
            <span className="text-right font-medium">
              {t("nutrition:units.totalCalories", {
                count: foodEntry.calories,
              })}
            </span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-muted-foreground">
              {t("nutrition:macronutrients.proteins")}
            </span>
            <span className="text-right font-medium">
              {t("nutrition:units.totalGrams", { count: foodEntry.proteins })}
            </span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-muted-foreground">
              {t("nutrition:macronutrients.fats")}
            </span>
            <span className="text-right font-medium">
              {t("nutrition:units.totalGrams", { count: foodEntry.fats })}
            </span>
            {foodEntry.saturatedFats > 0 && (
              <>
                <span className="text-muted-foreground ml-4">
                  {t("nutrition:macronutrients.saturatedFats")}
                </span>
                <span className="text-right font-medium">
                  {t("nutrition:units.totalGrams", {
                    count: foodEntry.saturatedFats,
                  })}
                </span>
              </>
            )}
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-muted-foreground">
              {t("nutrition:macronutrients.carbs")}
            </span>
            <span className="text-right font-medium">
              {t("nutrition:units.totalGrams", { count: foodEntry.carbs })}
            </span>
            {foodEntry.sugars > 0 && (
              <>
                <span className="text-muted-foreground ml-4">
                  {t("nutrition:macronutrients.sugars")}
                </span>
                <span className="text-right font-medium">
                  {t("nutrition:units.totalGrams", { count: foodEntry.sugars })}
                </span>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

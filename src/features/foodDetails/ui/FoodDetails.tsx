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
  const { t } = useTranslation("common");
  const onChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{foodEntry.name}</DialogTitle>
          <DialogDescription className="sr-only">
            {t("common:foodDetailsModal.srDescription")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-muted-foreground">
              {t("common:macronutrients.calories")}
            </span>
            <span className="text-right font-medium">
              {t("common:units.totalCalories", { count: foodEntry.calories })}
            </span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-muted-foreground">
              {t("common:macronutrients.proteins")}
            </span>
            <span className="text-right font-medium">
              {t("common:units.totalGrams", { count: foodEntry.proteins })}
            </span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-muted-foreground">
              {t("common:macronutrients.fats")}
            </span>
            <span className="text-right font-medium">
              {t("common:units.totalGrams", { count: foodEntry.fats })}
            </span>
            {foodEntry.saturatedFats > 0 && (
              <>
                <span className="text-muted-foreground ml-4">
                  {t("common:macronutrients.saturatedFats")}
                </span>
                <span className="text-right font-medium">
                  {t("common:units.totalGrams", {
                    count: foodEntry.saturatedFats,
                  })}
                </span>
              </>
            )}
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-muted-foreground">
              {t("common:macronutrients.carbs")}
            </span>
            <span className="text-right font-medium">
              {t("common:units.totalGrams", { count: foodEntry.carbs })}
            </span>
            {foodEntry.sugars > 0 && (
              <>
                <span className="text-muted-foreground ml-4">
                  {t("common:macronutrients.sugars")}
                </span>
                <span className="text-right font-medium">
                  {t("common:units.totalGrams", { count: foodEntry.sugars })}
                </span>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

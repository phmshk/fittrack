import {
  FoodForm,
  foodLogToZodInput,
  useUpdateFoodLog,
  type FoodLog,
  type FormOutput,
} from "@/entities/day";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/shared/shadcn/components/ui/dialog";
import { useTranslation } from "react-i18next";

interface EditFoodProps {
  food: FoodLog;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const EditFood = ({ food, isOpen, setIsOpen }: EditFoodProps) => {
  const { t } = useTranslation("common");
  const { mutate } = useUpdateFoodLog();

  const handleFormSubmit = (data: FormOutput) => {
    mutate({ id: food.id, updatedLog: data });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>{t("common:editFoodModal.title")}</DialogTitle>
          <DialogDescription className="mb-4">
            {t("common:editFoodModal.description")}
            <span className="sr-only">{t("common:editFoodModal.SRdescr")}</span>
          </DialogDescription>
          <FoodForm
            onSubmit={handleFormSubmit}
            initialData={foodLogToZodInput(food)}
            submitText={t("common:editFoodModal.saveButton")}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

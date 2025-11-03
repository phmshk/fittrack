import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/shared/shadcn/components/ui/dialog";
import { Button } from "@/shared/shadcn/components/ui/button";
import { useState } from "react";
import {
  FoodForm,
  useAddFoodLog,
  type FormOutput,
  type MealType,
} from "@/entities/day";
import { formatDateForApi } from "@/shared/lib/utils";
import { useTranslation } from "react-i18next";

interface AddFoodProps {
  triggerButtonProps: React.ComponentProps<typeof Button>;
  mealType?: MealType;
  date: Date;
  initialData?: Partial<FormOutput>;
}

export const AddFood = (props: AddFoodProps) => {
  const { triggerButtonProps, mealType, date, initialData } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation(["forms", "food"]);

  const { mutate } = useAddFoodLog();

  const handleFormSubmit = (data: FormOutput) => {
    mutate(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit" {...triggerButtonProps} />
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>{t("food:addFoodForm.title")}</DialogTitle>
          <DialogDescription className="mb-4">
            {t("food:addFoodForm.description")}
            <span className="sr-only">
              {t("food:addFoodForm.srDescription")}
            </span>
          </DialogDescription>
        </DialogHeader>
        <FoodForm
          initialData={{
            mealType,
            date: formatDateForApi(date),
            ...initialData,
          }}
          onSubmit={handleFormSubmit}
          submitText={t("common:actions.addEntry")}
        />
      </DialogContent>
    </Dialog>
  );
};

import type { MealType } from "@/entities/day";
import { AddFood } from "@/features/addFood";
import { PlusCircleIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AddManuallyProps {
  date: Date;
  mealType: MealType;
}

export const AddManually = (props: AddManuallyProps) => {
  const { date, mealType } = props;
  const { t } = useTranslation(["common", "searchProduct"]);
  return (
    <div className="mt-4 flex items-center justify-center gap-4">
      <div className="border-muted flex-grow border-t" />
      <p>{t("searchProduct:addManually")}</p>
      <AddFood
        date={date}
        mealType={mealType}
        triggerButtonProps={{
          variant: "outline",
          className: "text-muted-foreground",
          children: (
            <>
              <PlusCircleIcon className="size-4" />
              <span>{t("common:actions.addFood")}</span>
            </>
          ),
        }}
      />
      <div className="border-muted flex-grow border-t" />
    </div>
  );
};

import { PlusCircleIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProductsView } from "@/widgets/productsView";
import { ProductCardCollapsedSkeleton } from "@/entities/product";
import { AddFoodSearchField } from "@/widgets/searchField";
import { AddFood } from "@/features/addFood";
import { useDateStore } from "@/shared/model";
import { useProductSearch } from "../model/useProductSearch";

const NUMBER_OF_SKELETONS = 5;

export const ProductSearch = () => {
  const { t } = useTranslation(["food", "searchProduct"]);
  const selectedDate = useDateStore((state) => state.selectedDate);
  const {
    barcodeError,
    searchQuery,
    isPending,
    listToDisplay,
    titleKey,
    tab,
    handleSearchQuery,
    handleScannedBarcode,
  } = useProductSearch();

  return (
    <>
      <AddFoodSearchField
        searchQuery={searchQuery}
        setSearchQuery={handleSearchQuery}
        setScannedBarcode={handleScannedBarcode}
      />

      <div className="flex items-center justify-center gap-4">
        <AddFood
          date={selectedDate}
          mealType={tab}
          triggerButtonProps={{
            variant: "outline",
            className: "text-muted-foreground",
            children: (
              <>
                <PlusCircleIcon className="size-4" />
                <span>{t("searchProduct:addManually")}</span>
              </>
            ),
          }}
        />
      </div>

      {isPending ? (
        <div className="mt-4 space-y-2">
          {Array.from({ length: NUMBER_OF_SKELETONS }).map((_, index) => (
            <ProductCardCollapsedSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          {listToDisplay.length > 0 && (
            <h3 className="text-muted-foreground mt-4 px-4 text-sm font-semibold uppercase tracking-wide">
              {t(titleKey)}
            </h3>
          )}
          <ProductsView products={listToDisplay} isError={barcodeError} />
        </>
      )}
    </>
  );
};

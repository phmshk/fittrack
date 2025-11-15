import { useBreakpoint, useDebounce } from "@/shared/lib";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Container } from "@/shared/ui/container";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { router } from "@/app/main";
import { useTranslation } from "react-i18next";
import { ProductsView } from "@/widgets/productsView";
import {
  ProductCardCollapsedSkeleton,
  useGetProductByBarcode,
  type Product,
} from "@/entities/product";
import { AddFoodSearchField } from "@/widgets/searchField";

const DEBOUNCE_DELAY = 800; // milliseconds
const NUMBER_OF_SKELETONS = 5;
// Parameters to fetch specific fields for barcode lookup to optimize data usage
// Product name, nutriments (calories, proteins, carbs, sugars, fats, saturated_fats), and image URL
const BARCODE_PRODUCT_PARAMS = "fields=product_name,nutriments,image_url";

export const AddFromDatabase = () => {
  //State for the search query and debounced search query
  const [searchQuery, setSearchQuery] = useState("");
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  // Debounce the search input to avoid excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY);
  const isMobile = useBreakpoint();
  const { t } = useTranslation("food");
  const {
    data: barcodeProductData,
    isLoading: isBarcodeLoading,
    error: barcodeError,
  } = useGetProductByBarcode(scannedBarcode, BARCODE_PRODUCT_PARAMS);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

  // console.log("API ERROR:", barcodeError);

  // useEffect(() => {
  //   if (debouncedSearchQuery === "qwerty") {
  //     setScannedBarcode("737628064502");
  //   } else if (debouncedSearchQuery === "banana") {
  //     setScannedBarcode("0qwe");
  //   }
  // }, [debouncedSearchQuery]);

  const isTextSearchLoading = false; // Placeholder for text search loading state

  // Determine if any loading is in progress
  const isPending =
    isBarcodeLoading ||
    isTextSearchLoading ||
    searchQuery !== debouncedSearchQuery;

  const handleScannedBarcode = (barcode: string | null) => {
    setScannedBarcode(barcode);
  };

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
    if (scannedBarcode) {
      setScannedBarcode(null);
      setDisplayedProducts([]);
    }
  };

  useEffect(() => {
    if (barcodeProductData) {
      setDisplayedProducts((prev) => {
        // Avoid duplicates
        const exists = prev.some(
          (product) => product.code === barcodeProductData.code,
        );
        if (exists) return prev;
        return [barcodeProductData, ...prev];
      });
    }
  }, [barcodeProductData]);

  return (
    <Container>
      {/* Button for desktop to go back to previous page */}
      {!isMobile && (
        <Button
          variant="ghost"
          onClick={() => router.history.back()}
          className="mb-4 self-start"
          asChild
        >
          <div>
            <ArrowLeft className="mr-2 h-4 w-4" />{" "}
            {t("food:addFood.backToMeal")}
          </div>
        </Button>
      )}
      <AddFoodSearchField
        searchQuery={searchQuery}
        setSearchQuery={handleSearchQuery}
        setScannedBarcode={handleScannedBarcode}
      />
      {isPending ? (
        <div className="mt-4 space-y-2">
          {/* Show loading skeletons while waiting for debounce */}
          {Array.from({ length: NUMBER_OF_SKELETONS }).map((_, index) => (
            <ProductCardCollapsedSkeleton key={index} />
          ))}
        </div>
      ) : (
        <ProductsView products={displayedProducts} isError={barcodeError} />
      )}
    </Container>
  );
};

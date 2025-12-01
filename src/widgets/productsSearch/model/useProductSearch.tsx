import { useGetFoodsByDateRange, type FoodLog } from "@/entities/day";
import { useGetProductByBarcode, type Product } from "@/entities/product";
import { normalizeLogToProduct } from "@/entities/product/lib/normalizeLogToProduct";
import { useDebounce } from "@/shared/lib";
import { useSearch } from "@tanstack/react-router";
import { subDays } from "date-fns";
import { useEffect, useState } from "react";

const DEBOUNCE_DELAY = 1000; // milliseconds
const BARCODE_PRODUCT_PARAMS = "fields=product_name,nutriments,image_url";
const HISTORY_DAYS_RANGE = 90;
const NUMBER_OF_RECENT_PRODUCTS = 20;

/**
 * Hook to manage product search logic, including text-based search and barcode scanning.
 * @returns  An object containing state and handlers for product search functionality.
 */
export const useProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY);

  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [productsToShow, setProductsToShow] = useState<Product[] | null>([]);

  const searchHistoryRange = {
    from: subDays(new Date(), HISTORY_DAYS_RANGE),
    to: new Date(),
  };
  const { data: foodLogHistory, isLoading: isHistoryLoading } =
    useGetFoodsByDateRange(searchHistoryRange);

  const {
    data: barcodeProductData,
    isLoading: isBarcodeLoading,
    error: barcodeError,
  } = useGetProductByBarcode(scannedBarcode, BARCODE_PRODUCT_PARAMS);

  console.log("BARCODE ERROR", barcodeError);
  const { tab } = useSearch({ from: "/_protectedRoutes/_addFood/addFood" });

  // useEffect for text-based search
  useEffect(() => {
    if (debouncedSearchQuery) {
      if (!foodLogHistory) return;

      const lowercasedQuery = debouncedSearchQuery.toLowerCase();
      const matchedProducts = foodLogHistory.filter((food) =>
        food.name.toLowerCase().includes(lowercasedQuery),
      );

      const uniqueProducts = new Map<string, Product>();
      matchedProducts.forEach((product) => {
        if (!uniqueProducts.has(product.name)) {
          uniqueProducts.set(product.name, {
            product_name: product.name,
            code: product.code,
            nutriments: {
              "energy-kcal_100g": product.calories,
              proteins_100g: product.proteins,
              fat_100g: product.fats,
              "saturated-fat_100g": product.saturatedFats,
              carbohydrates_100g: product.carbs,
              sugars_100g: product.sugars,
            },
            image_url: product.image_url,
          });
        }
      });
      console.log("Unique Products from Search:", uniqueProducts);
      const uniqueProductsArray = Array.from(uniqueProducts.values());

      setProductsToShow(
        uniqueProductsArray.length > 0 ? uniqueProductsArray : null,
      );
      setScannedBarcode(null);
    } else {
      if (scannedBarcode === null) {
        setProductsToShow([]);
      }
    }
  }, [debouncedSearchQuery, foodLogHistory, scannedBarcode]);

  //useEffect for "Recently Added"
  useEffect(() => {
    if (foodLogHistory && foodLogHistory.length > 0) {
      const sortedHistory = [...foodLogHistory].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      const uniqueRecentProducts = new Map<string, Product>();
      sortedHistory.forEach((food: FoodLog) => {
        if (!uniqueRecentProducts.has(food.name)) {
          uniqueRecentProducts.set(food.name, normalizeLogToProduct(food));
        }
      });
      setRecentProducts(
        Array.from(uniqueRecentProducts.values()).slice(
          0,
          NUMBER_OF_RECENT_PRODUCTS,
        ),
      );
    }
  }, [foodLogHistory]);

  // useEffect for scanned barcode
  useEffect(() => {
    if (barcodeProductData) {
      setProductsToShow([barcodeProductData]);
    }
  }, [barcodeProductData]);

  const handleScannedBarcode = (barcode: string | null) => {
    setScannedBarcode(barcode);
    setSearchQuery("");
  };

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
    if (scannedBarcode) {
      setScannedBarcode(null);
    }
  };

  const isLoadingRecents =
    isHistoryLoading && debouncedSearchQuery.length === 0;
  const isLoadingSearch = isHistoryLoading && debouncedSearchQuery.length > 0;
  const isDebouncing = searchQuery !== debouncedSearchQuery;

  const isPending =
    isBarcodeLoading || isLoadingSearch || isLoadingRecents || isDebouncing;

  const isSearchingOrScanned =
    debouncedSearchQuery.length > 0 || scannedBarcode !== null;
  const listToDisplay = isSearchingOrScanned ? productsToShow : recentProducts;

  const titleKey = isSearchingOrScanned
    ? "searchProduct:searchResults"
    : "searchProduct:recentlyAdded";

  console.log("List to Display:", listToDisplay);

  return {
    isPending,
    listToDisplay,
    titleKey,
    barcodeError,
    searchQuery,
    tab,
    handleSearchQuery,
    handleScannedBarcode,
  };
};

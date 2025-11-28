import { useEffect, useState } from "react";
import { ArrowLeft, Frown } from "lucide-react";
import {
  ProductCardCollapsed,
  ProductCardFull,
  type Product,
} from "@/entities/product";
import { AddFood } from "@/features/addFood";
import type { FormOutput } from "@/entities/day";
import { useDateStore } from "@/shared/model";
import { useSearch } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/shadcn/components/ui/button";

interface ProductsViewProps {
  products: Product[];
  isError: Error | null;
}

export const ProductsView = (props: ProductsViewProps) => {
  const { products, isError } = props;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const selectedDate = useDateStore((state) => state.selectedDate);
  const { tab } = useSearch({ from: "/_protectedRoutes/_addFood/addFood" });
  const { t } = useTranslation(["searchProduct"]);

  const productToFormOutput = (product: Product): Partial<FormOutput> => ({
    mealType: tab,
    name: product.product_name || "",
    calories: product.nutriments?.["energy-kcal_100g"]?.toString() || "",
    proteins: product.nutriments?.proteins_100g?.toString() || "",
    carbs: product.nutriments?.carbohydrates_100g?.toString() || "",
    sugars: product.nutriments?.sugars_100g?.toString() || "",
    fats: product.nutriments?.fat_100g?.toString() || "",
    saturatedFats: product.nutriments?.["saturated-fat_100g"]?.toString() || "",
    image_url: product.image_url,
    code: product.code,
  });

  // Automatically select the product if there's only one in the list
  useEffect(() => {
    if (products.length === 1) {
      setSelectedProduct(products[0]);
    } else {
      setSelectedProduct(null);
    }
  }, [products]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleGoBack = () => {
    setSelectedProduct(null);
  };

  // API error
  if (isError) {
    console.error("ProductsView error:", isError.message);
    if (isError.message === "Product not found") {
      return (
        <div className="flex w-full flex-col items-center justify-center text-center">
          <Frown className="size-8" />
          <p>{t("searchProduct:noResults")}</p>
        </div>
      );
    } else {
      return (
        <div className="flex w-full flex-col items-center justify-center text-center">
          <Frown className="size-8" />
          <p>{t("searchProduct:error")}</p>
        </div>
      );
    }
  }

  return (
    <div className="flex w-full gap-6">
      {/* Product List */}
      <div
        className={`w-full space-y-4 transition-all md:w-2/5 ${
          selectedProduct ? "hidden md:block" : "block"
        }`}
      >
        {products.map((product) => (
          <div
            key={product.product_name}
            onClick={() => handleSelectProduct(product)}
          >
            <ProductCardCollapsed
              product={product}
              additionalClasses="mx-auto"
            />
          </div>
        ))}
      </div>
      {/* Selected Product Details */}
      <div
        className={`w-full md:w-3/5 ${selectedProduct ? "block" : "hidden md:block"}`}
      >
        {selectedProduct ? (
          <div className="sticky top-20">
            {products.length > 1 && (
              <Button
                variant="ghost"
                onClick={handleGoBack}
                className="mb-4 md:hidden"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />{" "}
                {t("searchProduct:backToList")}
              </Button>
            )}
            <ProductCardFull
              product={selectedProduct}
              additionalClasses="mx-auto"
              action={
                <AddFood
                  date={selectedDate}
                  initialData={productToFormOutput(selectedProduct)}
                  triggerButtonProps={{
                    className: "flex-grow",
                    children: (
                      <span className="text-primary-foreground flex items-center gap-2">
                        {t("searchProduct:addToDiary")}
                      </span>
                    ),
                  }}
                />
              }
            />
          </div>
        ) : (
          <div className="bg-muted sticky top-20 hidden h-2/3 items-center justify-center rounded-lg border-2 border-dashed md:flex">
            <div className="text-muted-foreground flex h-full items-center justify-center">
              <p>{t("searchProduct:selectForDetails")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

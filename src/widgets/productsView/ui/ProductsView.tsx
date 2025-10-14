import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  ProductCardCollapsed,
  ProductCardFull,
  type Product,
} from "@/entities/product";
import { Button } from "@/shared/shadcn/components/ui/button";
import { AddFood } from "@/features/addFood";
import type { FormOutput } from "@/entities/day";
import { useDateStore } from "@/shared/model";
import { useSearch } from "@tanstack/react-router";

interface ProductsViewProps {
  products: Product[];
}

export const ProductsView = ({ products }: ProductsViewProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const selectedDate = useDateStore((state) => state.selectedDate);
  const { tab } = useSearch({ from: "/_protectedRoutes/addFood" });

  // Map product fields to form output structure
  const productToFormOutput = (product: Product): Partial<FormOutput> => ({
    mealType: tab,
    name: product.product_name || "",
    calories: product.nutriments?.["energy-kcal_100g"]?.toString() || "",
    proteins: product.nutriments?.proteins_100g?.toString() || "",
    carbs: product.nutriments?.carbohydrates_100g?.toString() || "",
    sugars: product.nutriments?.sugars_100g?.toString() || "",
    fats: product.nutriments?.fat_100g?.toString() || "",
    saturatedFats: product.nutriments?.["saturated-fat_100g"]?.toString() || "",
  });

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleGoBack = () => {
    setSelectedProduct(null);
  };

  if (!products || products.length === 0) {
    return <p>No products found.</p>;
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
          <div key={product.code} onClick={() => handleSelectProduct(product)}>
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
            <Button
              variant="ghost"
              onClick={handleGoBack}
              className="mb-4 md:hidden"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to list
            </Button>
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
                        Add item to diary
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
              Select a product to see details
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

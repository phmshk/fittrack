import { Card, CardContent } from "@/shared/shadcn/components/ui/card";
import type { Product } from "../model/types";
import { H3 } from "@/shared/ui/headings";

interface ProductCardCollapsedProps {
  product: Product;
  additionalClasses?: string;
}

export const ProductCardCollapsed = ({
  product,
  additionalClasses,
}: ProductCardCollapsedProps) => {
  const { product_name, nutriments } = product;

  return (
    <Card
      className={`max-w-xl hover:cursor-pointer hover:bg-muted ${additionalClasses}`}
    >
      <CardContent className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <img
            src={"https://placehold.co/200x200/e9f1ea/52946b?text=Product"}
            alt={product_name || "Product Image"}
            className="h-16 w-16 rounded-lg object-cover sm:h-24 sm:w-24"
          />
          <div className="min-w-0">
            <H3 additionalClasses="line-clamp-2">
              {product.product_name || "Unknown Product"}
            </H3>
          </div>
        </div>
        <div>
          <div>
            <p className="text-center text-lg font-bold text-foreground">
              {nutriments?.["energy-kcal_100g"] || "N/A"}
            </p>
            <p className="text-right text-xs text-muted-foreground">kca/100g</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

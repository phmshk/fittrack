import { Card, CardContent } from "@/shared/shadcn/components/ui/card";
import type { Product } from "../model/types";
import { H3 } from "@/shared/ui/headings";
import { useTranslation } from "react-i18next";
import { ProductPlaceholderIcon } from "@/shared/ui/productPlaceholderIcon";

interface ProductCardCollapsedProps {
  product: Product;
  additionalClasses?: string;
}

export const ProductCardCollapsed = ({
  product,
  additionalClasses,
}: ProductCardCollapsedProps) => {
  const { product_name, nutriments, image_url } = product;
  const { t } = useTranslation("nutrition");

  return (
    <Card
      className={`hover:bg-muted max-w-xl hover:cursor-pointer ${additionalClasses}`}
    >
      <CardContent className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {image_url ? (
            <img
              src={image_url}
              alt={product_name}
              className="size-16 min-w-16 rounded-lg object-cover sm:size-24"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          ) : (
            <ProductPlaceholderIcon className="size-16 rounded-lg sm:size-24" />
          )}

          <H3 additionalClasses="line-clamp-2 text-ellipsis">
            {product.product_name}
          </H3>
        </div>
        <div>
          <div>
            <p className="text-foreground text-center text-lg font-bold">
              {nutriments?.["energy-kcal_100g"] || "\u2014"}
            </p>
            <p className="text-muted-foreground text-right text-xs">
              {t("nutrition:units.kcal100g")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

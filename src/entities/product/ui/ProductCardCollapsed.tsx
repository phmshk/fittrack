import { Card, CardContent } from "@/shared/shadcn/components/ui/card";
import type { Product } from "../model/types";
import { H3 } from "@/shared/ui/headings";
import { useTranslation } from "react-i18next";

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
          <img
            src={
              image_url ||
              "https://placehold.co/200x200/e9f1ea/52946b?text=Product"
            }
            alt={product_name}
            className="h-16 w-16 rounded-lg object-cover sm:h-24 sm:w-24"
          />
          <div className="min-w-0">
            <H3 additionalClasses="line-clamp-2">{product.product_name}</H3>
          </div>
        </div>
        <div>
          <div>
            <p className="text-foreground text-center text-lg font-bold">
              {nutriments?.["energy-kcal_100g"] || "N/A"}
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

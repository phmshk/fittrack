import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/shadcn/components/ui/card";
import { type Product } from "../model/types";
import { H3 } from "@/shared/ui/headings";
import { useTranslation } from "react-i18next";
import { ProductPlaceholderIcon } from "@/shared/ui/productPlaceholderIcon";

interface ProductCardFullProps {
  product: Product;
  additionalClasses?: string;
  action: React.ReactNode; // Action button or element to be rendered in the footer
}

export const ProductCardFull = ({
  product,
  additionalClasses,
  action,
}: ProductCardFullProps) => {
  const { product_name, nutriments, image_url } = product;
  const { t } = useTranslation("nutrition");

  const formatValue = (rawValue: number | undefined, units: string): string => {
    const isNumeric = typeof rawValue === "number" && !isNaN(rawValue);
    const displayValue = isNumeric ? rawValue.toFixed(1) : "\u2014";
    return `${displayValue} ${t(`nutrition:units.${units}`)}`;
  };

  return (
    <Card
      className={`hover:bg-muted max-w-xl hover:cursor-pointer ${additionalClasses}`}
    >
      <CardHeader className="flex items-center justify-between">
        {image_url ? (
          <img
            src={image_url}
            alt={product_name}
            className="size-16 rounded-lg object-cover sm:size-24"
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
      </CardHeader>
      <CardContent>
        <div className="border-muted my-4 border-t"></div>
        <div className="grid gap-x-6 gap-y-3 text-sm">
          <div className="flex items-baseline justify-between">
            <span className="text-foreground">
              {t("nutrition:macronutrients.proteins")}
            </span>
            <span className="font-semibold">
              {formatValue(nutriments?.proteins_100g, "g")}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-foreground">
              {t("nutrition:macronutrients.fats")}
            </span>
            <span className="font-semibold">
              {formatValue(nutriments?.fat_100g, "g")}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-foreground">
              {t("nutrition:macronutrients.saturatedFats")}{" "}
            </span>
            <span className="font-semibold">
              {formatValue(nutriments?.["saturated-fat_100g"], "g")}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-foreground">
              {t("nutrition:macronutrients.carbs")}
            </span>
            <span className="font-semibold">
              {formatValue(nutriments?.carbohydrates_100g, "g")}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-foreground">
              {t("nutrition:macronutrients.sugars")}
            </span>
            <span className="font-semibold">
              {formatValue(nutriments?.sugars_100g, "g")}
            </span>
          </div>
        </div>
        <div className="border-muted my-4 border-t"></div>
      </CardContent>
      <CardFooter>{action}</CardFooter>
    </Card>
  );
};

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/shadcn/components/ui/card";
import { type Product } from "../model/types";
import { H3 } from "@/shared/ui/headings";
import { useTranslation } from "react-i18next";
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
  const { product_name, nutriments } = product;
  const { t } = useTranslation("nutrition");

  return (
    <Card
      className={`hover:bg-muted max-w-xl hover:cursor-pointer ${additionalClasses}`}
    >
      <CardHeader className="flex items-center justify-between">
        <img
          src={"https://placehold.co/200x200/e9f1ea/52946b?text=Product"}
          alt={product_name}
          className="h-16 w-16 rounded-lg object-cover sm:h-24 sm:w-24"
        />
        <div>
          <H3>{product.product_name}</H3>
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
      </CardHeader>
      <CardContent>
        <div className="border-muted my-4 border-t"></div>
        <div className="grid gap-x-6 gap-y-3 text-sm">
          <div className="flex items-baseline justify-between">
            <span className="text-foreground">
              {t("nutrition:macronutrients.proteins")}
            </span>
            <span className="font-semibold">
              {t("nutrition:units.totalGrams", {
                count: Number(nutriments?.proteins_100g?.toFixed(1)),
              })}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-foreground">
              {t("nutrition:macronutrients.fats")}
            </span>
            <span className="font-semibold">
              {t("nutrition:units.totalGrams", {
                count: Number(nutriments?.fat_100g?.toFixed(1)),
              })}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-foreground">
              {t("nutrition:macronutrients.saturatedFats")}{" "}
            </span>
            <span className="font-semibold">
              {t("nutrition:units.totalGrams", {
                count: Number(nutriments?.["saturated-fat_100g"]?.toFixed(1)),
              })}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-foreground">
              {t("nutrition:macronutrients.carbs")}
            </span>
            <span className="font-semibold">
              {t("nutrition:units.totalGrams", {
                count: Number(nutriments?.carbohydrates_100g?.toFixed(1)),
              })}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-foreground">
              {t("nutrition:macronutrients.sugars")}
            </span>
            <span className="font-semibold">
              {t("nutrition:units.totalGrams", {
                count: Number(nutriments?.sugars_100g?.toFixed(1)),
              })}
            </span>
          </div>
        </div>
        <div className="border-muted my-4 border-t"></div>
      </CardContent>
      <CardFooter>{action}</CardFooter>
    </Card>
  );
};

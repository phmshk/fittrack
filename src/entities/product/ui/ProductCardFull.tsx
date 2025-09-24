import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/shadcn/components/ui/card";
import { type Product } from "../model/types";
import { H3 } from "@/shared/ui/headings";
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

  return (
    <Card
      className={`max-w-xl hover:cursor-pointer hover:bg-muted ${additionalClasses}`}
    >
      <CardHeader className="flex items-center justify-between">
        <img
          src={"https://placehold.co/200x200/e9f1ea/52946b?text=Product"}
          alt={product_name || "Product Image"}
          className="h-16 w-16 rounded-lg object-cover sm:h-24 sm:w-24"
        />
        <div>
          <H3>{product.product_name || "Unknown Product"}</H3>
        </div>
        <div>
          <div>
            <p className="text-center text-lg font-bold text-foreground">
              {nutriments?.["energy-kcal_100g"] || "N/A"}
            </p>
            <p className="text-right text-xs text-muted-foreground">kca/100g</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="my-4 border-t border-muted"></div>
        <div className="grid gap-x-6 gap-y-3 text-sm">
          <div className="flex items-baseline justify-between">
            <span className="text-foreground">Proteins</span>
            <span className="font-semibold">
              {nutriments?.proteins_100g?.toFixed(1)} g
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-foreground">Fats</span>
            <span className="font-semibold">
              {nutriments?.fat_100g?.toFixed(1)} g
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-foreground">Saturated Fats</span>
            <span className="font-semibold">
              {nutriments?.["saturated-fat_100g"]?.toFixed(1)} g
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-foreground">Carbs</span>
            <span className="font-semibold">
              {nutriments?.carbohydrates_100g?.toFixed(1)} g
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-foreground">Sugars</span>
            <span className="font-semibold">
              {nutriments?.sugars_100g?.toFixed(1)} g
            </span>
          </div>
        </div>
        <div className="my-4 border-t border-muted"></div>
      </CardContent>
      <CardFooter>{action}</CardFooter>
    </Card>
  );
};

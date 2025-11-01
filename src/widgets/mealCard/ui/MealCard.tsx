import type { FoodLog, MealType } from "@/entities/day";
import { AddFood } from "@/features/addFood";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { FoodItem } from "@/shared/ui/foodItem";
import { Database, PlusCircleIcon, ScanBarcode, Utensils } from "lucide-react";
import { FoodOptions } from "./FoodOptions";
import { useMemo, useState } from "react";
import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/shadcn/components/ui/tooltip";
import { Link } from "@tanstack/react-router";
import { useDateStore } from "@/shared/model";
import { useDayEditStore } from "@/features/editDay";
import { useBreakpoint } from "@/shared/lib";
import { useTranslation } from "react-i18next";

interface MealCardProps {
  mealType: string;
  foods: FoodLog[];
  totalCalories: number;
  imageUrl: string;
  date: Date;
}

const VISIBLE_ITEMS_LIMIT = 3;

export const MealCard = (props: MealCardProps) => {
  const { t } = useTranslation(["dashboard", "common"]);

  const { mealType, date, foods, totalCalories, imageUrl } = props;
  const isMobile = useBreakpoint();
  const setSelectedDate = useDateStore((state) => state.setSelectedDate);
  const today = useDateStore((state) => state.today);
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleFoods = useMemo(() => {
    if (isExpanded) return foods;
    return foods.slice(0, VISIBLE_ITEMS_LIMIT);
  }, [foods, isExpanded]);

  const editingEnabled =
    useDayEditStore((state) => state.isEditing) ||
    date.toDateString() === today.toDateString();

  return (
    <Card className="w-full max-w-xl border-none">
      <CardHeader className="flex items-center justify-between gap-4 pb-2 pt-4">
        <div>
          <CardTitle className="text-4xl font-bold sm:text-5xl">
            {t(`common:meals.${mealType}`)}
          </CardTitle>
          <CardDescription>
            <span className="text-secondary-foreground sm:text-lg">
              {`${totalCalories} ${t("common:units.kcal")}`}
            </span>
            <span className="sr-only">
              {t("common:mealCard.SRdescr", { mealType: mealType })}
            </span>
          </CardDescription>
        </div>

        <img
          src={imageUrl}
          alt={t("common:mealCard.img.alt", { mealType: mealType })}
          className="w-1/3 rounded-full object-cover"
        />
      </CardHeader>
      <CardContent className="h-full">
        {foods.length === 0 ? (
          <div className="text-secondary-foreground flex h-full flex-col items-center justify-center">
            <div className="border-primary/80 mb-4 rounded-full border-4 p-8">
              <Utensils className="text-primary/80 size-16" />
            </div>
            <p className="mb-4 text-center text-sm">
              {t("common:mealCard.noFoodAdded", { mealType: mealType })}
            </p>
          </div>
        ) : (
          <ul>
            {visibleFoods.map((food) => (
              <li
                key={food.id}
                className="border-foreground/10 border-b last:border-0"
              >
                <FoodItem
                  food={food}
                  actions={<FoodOptions foodEntry={food} />}
                />
              </li>
            ))}
          </ul>
        )}
        {foods.length > VISIBLE_ITEMS_LIMIT &&
          (isExpanded ? (
            <Button
              variant="link"
              className="text-muted-foreground mt-2 w-full"
              onClick={() => setIsExpanded(false)}
            >
              {t("common:mealCard.showLess")}
            </Button>
          ) : (
            <Button
              variant="link"
              className="text-muted-foreground mt-2 w-full"
              onClick={() => setIsExpanded(true)}
            >
              {t("common:mealCard.showAll", { count: foods.length })}
            </Button>
          ))}
      </CardContent>

      <CardFooter
        className={`${editingEnabled ? "flex" : "hidden"} flex-col items-center gap-3 pt-2`}
      >
        <div className="flex w-full items-center gap-2">
          <AddFood
            mealType={mealType.toLowerCase() as MealType}
            date={date}
            triggerButtonProps={{
              className: "flex-grow",
              children: (
                <span className="text-primary-foreground flex items-center gap-2">
                  <PlusCircleIcon className="size-4" />
                  {t("common:actions.addFood")}
                </span>
              ),
            }}
          />

          {isMobile && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <ScanBarcode className="size-5" />
                    <span className="sr-only">
                      {t("common:actions.scanBarcode")}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("common:actions.scanBarcode")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <Button
          variant="link"
          className="text-muted-foreground"
          onClick={() => {
            setSelectedDate(date);
          }}
          asChild
        >
          <Link
            to="/addFood"
            search={{ tab: `${mealType.toLowerCase() as MealType}` }}
            state={{ from: "allowedToAddFood" }}
          >
            <Database className="mr-2 size-4" />
            {t("common:actions.addFromOpenFoodFacts")}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

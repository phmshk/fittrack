interface FoodItemProps {
  name: string;
  calories: number;
  grams: number;
  className?: string;
}

export const FoodItem = (props: FoodItemProps) => {
  const { name, calories, grams, className } = props;

  return (
    <div
      className={`flex items-center justify-between rounded-md px-1 py-2 hover:bg-accent ${className}`}
    >
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-secondary-foreground">{grams} g</p>
      </div>
      <p className="font-medium">{calories} kcal</p>
    </div>
  );
};

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";

export const CaloriesCard = () => {
  // Dummy data for calories summary
  const mockData = {
    eaten: 1234,
    protein: 45,
    carbs: 67,
    fats: 89,
    burned: 234,
    goal: 2000,
    remaining: 766,
  };

  const mobileCard = (
    <CardContent className="md:hidden bg-secondary/80 h-full w-full flex flex-col justify-center items-center gap-2 rounded-xl">
      <div className="font-bold text-2xl">
        {mockData.remaining} kcal remaining
      </div>
    </CardContent>
  );

  const desktopCard = (
    <CardContent className="hidden md:flex w-full gap-4 md:flex-row md:justify-between md:items-end">
      <div className="bg-secondary/80 p-6 rounded-xl md:w-auto">
        <CardTitle className="hidden md:block font-bold text-2xl">
          Calories
        </CardTitle>
        <div className="font-bold">{mockData.remaining} kcal remaining</div>
      </div>
      <div className="hidden md:block md:bg-primary md:rounded-xl md:px-3 md:py-2 md:text-primary-foreground md:font-bold">
        Goal: {mockData.goal} | Eaten: {mockData.eaten} | Exercise: -
        {mockData.burned}
      </div>
    </CardContent>
  );

  return (
    <>
      {/* Calories Summary Card */}
      <Card className="w-full justify-end gap-0 p-0 md:py-6 bg-[url('@/shared/assets/img/card-background.png')] bg-cover bg-center h-48 md:h-56 lg:h-64 ">
        <CardDescription className="sr-only">
          Card showing calories summary.
        </CardDescription>
        {/* Mobile view <768px */}
        {mobileCard}
        {/* Desktop view >768px */}
        {desktopCard}
      </Card>
    </>
  );
};

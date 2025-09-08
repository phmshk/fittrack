import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const locale = "en-US";
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(new Date());
  }, []);

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

  return (
    <section className="flex flex-col gap-4 p-4 md:gap-6 ">
      {/* Page heading. Date display */}
      <h1 className="text-2xl md:text-4xl font-bold">
        Today,{" "}
        {date.toLocaleDateString(locale, { day: "numeric", month: "long" })}
      </h1>

      {/* Calories Summary */}
      <Card className="w-full bg-[url('@/shared/assets/img/card-background.png')] bg-cover bg-center h-32 md:h-48 lg:h-64">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Calories</CardTitle>
          <CardDescription className="sr-only">
            Card showing calories summary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <div className="text-center">
            <p className="text-4xl font-bold tracking-tighter">
              {mockData.remaining}
            </p>
            <p className="text-sm text-muted-foreground">kkal remaining</p>
          </div>

          <div className="flex justify-between items-center text-sm text-muted-foreground pt-2 border-t border-border">
            <div className="text-center">
              <p className="font-semibold">{mockData.goal}</p>
              <p>Цель</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{mockData.eaten}</p>
              <p>Съедено</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{mockData.burned}</p>
              <p>Упражнения</p>
            </div>
          </div> */}
        </CardContent>
      </Card>
    </section>
  );
};

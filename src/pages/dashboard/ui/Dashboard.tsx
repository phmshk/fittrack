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

  return (
    <section className="flex flex-col gap-4 p-4 md:gap-6 ">
      {/* Page heading. Date display */}
      <h1 className="text-2xl md:text-4xl font-bold">
        Today,{" "}
        {date.toLocaleDateString(locale, { day: "numeric", month: "long" })}
      </h1>

      {/* Calories Summary */}
      <Card className="bg-[url('@/shared/assets/img/card-background.png')] bg-cover bg-center h-32 md:h-48 lg:h-64">
        <CardContent className="flex justify-between items-center">
          <CardHeader>
            <CardTitle className="font-bold text-2xl">Calories</CardTitle>
            <CardDescription className="text-lg">
              800 kcal remaining
            </CardDescription>
          </CardHeader>
          <div>123</div>
        </CardContent>
      </Card>
    </section>
  );
};

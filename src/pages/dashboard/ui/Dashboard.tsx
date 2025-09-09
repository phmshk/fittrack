import { CaloriesCard } from "@/shared/ui/caloriesCard";
import { useState } from "react";

export const Dashboard = () => {
  const locale = "en-US";
  const [date] = useState(new Date());

  return (
    <section className="flex flex-col gap-4 p-4 md:gap-6 ">
      {/* Page heading. Date display */}
      <h1 className="text-3xl md:text-4xl font-bold">
        Today,{" "}
        {date.toLocaleDateString(locale, { day: "numeric", month: "long" })}
      </h1>
      <CaloriesCard />
    </section>
  );
};

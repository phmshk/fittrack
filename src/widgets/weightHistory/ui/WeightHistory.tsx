import type { WeightLog } from "@/entities/user";
import { WeightChart } from "./WeightChart";
import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/shared/shadcn/components/ui/tabs";
import type { DaysRange } from "../model/types";

interface WeightHistoryProps {
  weightHistory: WeightLog[];
}

export const WeightHistory = (props: WeightHistoryProps) => {
  const { weightHistory } = props;
  const [range, setRange] = useState<DaysRange>("30d");
  return (
    <div>
      <WeightChart data={weightHistory} range={range} />
      <div className="flex justify-center">
        <Tabs
          defaultValue="30d"
          onValueChange={(value) => setRange(value as DaysRange)}
        >
          <TabsList>
            <TabsTrigger className="cursor-pointer" value="7d">
              7 days
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="30d">
              30 days
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="90d">
              90 days
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="1y">
              1 year
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="all">
              All time
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

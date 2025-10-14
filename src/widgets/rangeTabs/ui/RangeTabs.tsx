import type { DaysRange } from "../model/types";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/shared/shadcn/components/ui/tabs";

interface RangeTabsProps {
  value: DaysRange;
  setRange: (range: DaysRange) => void;
}

export const RangeTabs = (props: RangeTabsProps) => {
  const { setRange, value } = props;

  return (
    <div className="flex justify-center">
      <Tabs
        defaultValue={value}
        onValueChange={(value) => setRange(value as DaysRange)}
      >
        <TabsList className="bg-secondary/50">
          <TabsTrigger className="text-md cursor-pointer" value="7d">
            7 days
          </TabsTrigger>
          <TabsTrigger className="text-md cursor-pointer" value="30d">
            30 days
          </TabsTrigger>
          <TabsTrigger className="text-md cursor-pointer" value="90d">
            90 days
          </TabsTrigger>
          <TabsTrigger className="text-md cursor-pointer" value="1y">
            1 year
          </TabsTrigger>
          <TabsTrigger className="text-md cursor-pointer" value="all">
            All time
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("progress");

  return (
    <div className="flex justify-center">
      <Tabs
        defaultValue={value}
        onValueChange={(value) => setRange(value as DaysRange)}
      >
        <TabsList className="bg-secondary/50">
          <TabsTrigger className="text-md cursor-pointer" value="7d">
            {t("progress:rangeTabs.7d")}
          </TabsTrigger>
          <TabsTrigger className="text-md cursor-pointer" value="30d">
            {t("progress:rangeTabs.30d")}
          </TabsTrigger>
          <TabsTrigger className="text-md cursor-pointer" value="90d">
            {t("progress:rangeTabs.90d")}
          </TabsTrigger>
          <TabsTrigger className="text-md cursor-pointer" value="1y">
            {t("progress:rangeTabs.1y")}
          </TabsTrigger>
          <TabsTrigger className="text-md cursor-pointer" value="all">
            {t("progress:rangeTabs.all")}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

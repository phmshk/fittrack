import type { WeightLog } from "@/entities/user";
import { WeightChart } from "./WeightChart";
import type { DaysRange } from "@/widgets/rangeTabs";
import { H2 } from "@/shared/ui/headings";
import { useTranslation } from "react-i18next";

interface WeightHistoryProps {
  weightHistory: WeightLog[];
  range: DaysRange;
}

export const WeightHistory = (props: WeightHistoryProps) => {
  const { weightHistory, range } = props;
  const { t } = useTranslation("progress");
  return (
    <>
      <div>
        <H2>{t("progress:weightHistory.title")}</H2>
        <p className="text-muted-foreground">
          {t("progress:weightHistory.description")}
        </p>
      </div>

      <div className="max-w-2xl">
        <WeightChart data={weightHistory} range={range} />
      </div>
    </>
  );
};

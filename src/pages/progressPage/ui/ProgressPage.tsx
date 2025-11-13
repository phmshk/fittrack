import { useGetUserData } from "@/entities/user";
import { useGetWeightLogs } from "@/entities/weight";
import { Container } from "@/shared/ui/container";
import { H1 } from "@/shared/ui/headings";
import { Spinner } from "@/shared/ui/spinner";
import { ProgressSummary } from "@/widgets/progressSummary";
import { RangeTabs, type DaysRange } from "@/widgets/rangeTabs";
import { WeightHistory } from "@/widgets/weightHistory";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ProgressPage = () => {
  const { t } = useTranslation(["progress", "common"]);
  const { data: user, isLoading: isLoadingUser } = useGetUserData();
  const { data: weightLogs } = useGetWeightLogs();
  const weightHistory =
    import.meta.env.VITE_USE_MOCKS === "true"
      ? user?.weightHistory || []
      : weightLogs || [];
  const [range, setRange] = useState<DaysRange>("30d");

  const isLoading = isLoadingUser;

  if (isLoading || !user) {
    return (
      <Container className="items-center justify-center">
        <Spinner text={t("common:loading")} />
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-6">
        <H1>{t("progress:title")}</H1>
        <p className="text-muted-foreground">{t("progress:description")}</p>
      </div>
      <RangeTabs value={range} setRange={setRange} />
      <WeightHistory weightHistory={weightHistory} range={range} />
      <ProgressSummary range={range} />
    </Container>
  );
};

import { useGetUserData } from "@/entities/user";
import { Container } from "@/shared/ui/container";
import { H1 } from "@/shared/ui/headings";
import { Spinner } from "@/shared/ui/spinner";
import { ProgressSummary } from "@/widgets/progressSummary";
import { RangeTabs, type DaysRange } from "@/widgets/rangeTabs";
import { WeightHistory } from "@/widgets/weightHistory";
import { useState } from "react";

export const ProgressPage = () => {
  const { data: user, isLoading: isLoadingUser } = useGetUserData();
  const weightHistory = user?.weightHistory || [];
  const [range, setRange] = useState<DaysRange>("30d");

  const isLoading = isLoadingUser;

  if (isLoading || !user) {
    return (
      <Container className="items-center justify-center">
        <Spinner text="Loading your progress..." />
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-6">
        <H1>Progress</H1>
        <p className="text-muted-foreground">
          Track and manage your weight and nutrition over time.
        </p>
      </div>
      <RangeTabs value={range} setRange={setRange} />
      <WeightHistory weightHistory={weightHistory} range={range} />
      <ProgressSummary range={range} />
    </Container>
  );
};

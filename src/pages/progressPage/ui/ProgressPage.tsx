import { useGetUserData } from "@/entities/user";
import { Container } from "@/shared/ui/container";
import { H1 } from "@/shared/ui/headings";
import { Spinner } from "@/shared/ui/spinner";
import { WeightHistory } from "@/widgets/weightHistory";

export const ProgressPage = () => {
  const { data: user, isLoading: isLoadingUser } = useGetUserData();
  const weightHistory = user?.weightHistory || [];

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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WeightHistory weightHistory={weightHistory} />
      </div>
    </Container>
  );
};

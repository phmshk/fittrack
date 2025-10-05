import { useState } from "react";
import { useGetUserData } from "@/entities/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { Container } from "@/shared/ui/container";
import { Spinner } from "@/shared/ui/spinner";
import { toast } from "sonner";
import { StatCard } from "@/shared/ui/statCard";
import { CircularProgress } from "@/shared/ui/circularProgress";

export const ProfilePage = () => {
  const { data: userData, isLoading: isLoadingGoals } = useGetUserData();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const isLoading = !userData || isLoadingGoals;

  const handleSuccess = () => {
    toast.success("Profile updated successfully!");
    setIsEditDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <Spinner text="Loading your profile..." />
      </div>
    );
  }

  const macroGoals = [
    {
      label: "Protein",
      value: userData?.dailyTargets?.targetProteins || 0,
      color: "text-sky-500",
    },
    {
      label: "Carbs",
      value: userData?.dailyTargets?.targetCarbs || 0,
      color: "text-amber-500",
    },
    {
      label: "Fat",
      value: userData?.dailyTargets?.targetFats || 0,
      color: "text-rose-500",
    },
  ];

  return (
    <Container>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hello, {userData?.name}</h1>
          <p className="text-muted-foreground">
            Here's an overview of your profile and goals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-6 lg:col-span-1">
          <StatCard
            label="Age"
            value={userData?.personalData?.age || "N/A"}
            unit="years"
          />
          <StatCard
            label="Height"
            value={userData?.personalData?.height || "N/A"}
            unit="cm"
          />
          <StatCard
            label="Weight"
            value={userData?.personalData?.weight || "N/A"}
            unit="kg"
          />
          <StatCard
            label="Activity"
            value={userData?.activityLevel || "N/A"}
            className="capitalize"
          />
        </div>

        {/* Calorie Goal */}
        <Card className="flex flex-col items-center justify-center text-center lg:col-span-1">
          <CardHeader className="w-full">
            <CardTitle className="text-muted-foreground text-base font-medium">
              Daily Calorie Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-primary text-5xl font-bold">
              {userData?.dailyTargets?.targetCalories}
            </p>
            <p className="text-muted-foreground">kcal</p>
          </CardContent>
        </Card>

        {/* Macronutrients */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Macro Goals</CardTitle>
            <CardDescription>Your daily targets in grams.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-around">
            {macroGoals.map((macro) => (
              <CircularProgress
                key={macro.label}
                label={macro.label}
                value={macro.value}
                className={macro.color}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

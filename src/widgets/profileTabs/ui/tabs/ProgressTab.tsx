import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { BarChart3 } from "lucide-react";

export const ProgressTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress</CardTitle>
        <CardDescription>Track your progress over time.</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground flex h-64 flex-col items-center justify-center space-y-4 text-center">
        <BarChart3 className="h-12 w-12" />
        <p>
          Progress charts and statistics will be available here in a future
          update.
        </p>
      </CardContent>
    </Card>
  );
};

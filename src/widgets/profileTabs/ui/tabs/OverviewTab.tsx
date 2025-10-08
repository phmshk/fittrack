import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";

import { LayoutGrid } from "lucide-react";

export const OverviewTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutritional Goals</CardTitle>
        <CardDescription>
          Overview of your nutritional intake and goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground flex h-64 flex-col items-center justify-center space-y-4 text-center">
        <LayoutGrid className="h-12 w-12" />
        <p>
          Overview charts and statistics will be available here in a future
          update.
        </p>
      </CardContent>
    </Card>
  );
};

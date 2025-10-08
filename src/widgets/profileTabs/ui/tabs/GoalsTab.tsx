import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";

export const GoalsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutritional Goals</CardTitle>
        <CardDescription>
          Update your daily targets. These can be changed at any time.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground flex h-64 flex-col items-center justify-center space-y-4 text-center">
        <p>Goals will be available here in a future update.</p>
      </CardContent>
    </Card>
  );
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { User as UserIcon } from "lucide-react";

export const PersonalInfoTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details below.</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground flex h-64 flex-col items-center justify-center space-y-4 text-center">
        <UserIcon className="h-12 w-12" />
        <p>
          Progress charts and statistics will be available here in a future
          update.
        </p>
      </CardContent>
    </Card>
  );
};

import type { User } from "@/entities/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { Cog } from "lucide-react";

interface SettingsTabProps {
  userData: User;
}

export const SettingsTab = (props: SettingsTabProps) => {
  const { userData } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground flex h-64 flex-col items-center justify-center space-y-4 text-center">
        <Cog className="h-12 w-12" />
        <p>
          Account settings and preferences will be available here in a future
          update.
        </p>
      </CardContent>
    </Card>
  );
};

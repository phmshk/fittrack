import { ThemeToggle } from "@/features/changeTheme";
import { LogoutButton } from "@/features/logout";
import { useBreakpoint } from "@/shared/lib";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { InfoRow, SettingRow } from "@/shared/ui/row";

export const SettingsTab = () => {
  const isMobile = useBreakpoint();
  return (
    <Card className="mx-auto w-full max-w-2xl border-0 shadow-none md:border md:shadow">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Manage your account and application settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <SettingRow
            id="theme-toggle"
            label="Application Theme"
            description="Choose between light, dark, or system default theme."
            control={<ThemeToggle />}
          />

          {/**To be implemented */}
          {/* <SettingRow
            id="notifications-switch"
            label="Push Notifications"
            description="Receive notifications about new events."
            control={<Switch id="notifications-switch" />}
          /> */}
          <InfoRow label="Application Version" value="0.0.1-beta" />
        </div>
      </CardContent>

      {isMobile && (
        <CardFooter className="mt-4">
          <LogoutButton />
        </CardFooter>
      )}
    </Card>
  );
};

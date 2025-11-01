import { LanguageSwitcher } from "@/features/changeLanguage";
import { ThemeToggle } from "@/features/changeTheme";
import { LogoutButton } from "@/features/logout";
import { useBreakpoint } from "@/shared/lib";
import { CONFIG } from "@/shared/model";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { InfoRow, SettingRow } from "@/shared/ui/row";
import { useTranslation } from "react-i18next";

export const SettingsTab = () => {
  const isMobile = useBreakpoint();
  const { t } = useTranslation("profile");
  return (
    <Card className="mx-auto w-full max-w-2xl border-0 shadow-none md:border md:shadow">
      <CardHeader>
        <CardTitle>{t("profile:tabs.settings.title")}</CardTitle>
        <CardDescription>
          {t("profile:tabs.settings.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <SettingRow
            id="theme-toggle"
            label={t("profile:tabs.settings.items.theme.title")}
            description={t("profile:tabs.settings.items.theme.description")}
            control={<ThemeToggle />}
          />
          <SettingRow
            id="language-switcher"
            label={t("profile:tabs.settings.items.language.title")}
            description={t("profile:tabs.settings.items.language.description")}
            control={<LanguageSwitcher />}
          />

          {/**To be implemented */}
          {/* <SettingRow
            id="notifications-switch"
            label="Push Notifications"
            description="Receive notifications about new events."
            control={<Switch id="notifications-switch" />}
          /> */}
          <InfoRow
            label={t("profile:tabs.settings.items.version.title")}
            value={CONFIG.APP_VERSION}
          />
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

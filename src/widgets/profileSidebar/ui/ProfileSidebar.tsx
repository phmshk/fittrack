import { profileTabs } from "@/entities/profile";
import { cn } from "@/shared/shadcn/lib/utils";
import { Link, useSearch } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const ProfileSidebar = () => {
  const { tab } = useSearch({ from: "/_protectedRoutes/profile/" });
  const { t } = useTranslation("profile");
  return (
    <nav className="flex flex-col gap-2">
      {Object.values(profileTabs).map(({ href, Icon }) => (
        <Link
          key={href}
          to="/profile"
          search={{ tab: href }}
          replace={true}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            tab === href
              ? "bg-secondary text-secondary-foreground"
              : "hover:bg-secondary/50",
          )}
        >
          <Icon className="h-4 w-4" />
          {t(`profile:tabs.${href}.title`)}
        </Link>
      ))}
    </nav>
  );
};

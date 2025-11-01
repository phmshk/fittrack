import { useNavLinks } from "@/shared/lib/hooks/useNavLinks";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/shared/shadcn/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const DesktopNavigation = () => {
  const routes = useNavLinks();
  const { t } = useTranslation("common");
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-4">
        {routes.map((link) => (
          <NavigationMenuItem key={link.href}>
            <Link to={link.href} activeProps={{ className: "font-bold" }}>
              {t(`common:nav.${link.href}`)}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

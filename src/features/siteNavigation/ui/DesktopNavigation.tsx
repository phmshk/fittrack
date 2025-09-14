import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/shared/shadcn/components/ui/navigation-menu";
import { NAV_LINKS } from "../model/links";
import { Link } from "@tanstack/react-router";

export const DesktopNavigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-4">
        {NAV_LINKS.map((link) => (
          <NavigationMenuItem key={link.href}>
            <Link to={link.href} activeProps={{ className: "font-bold" }}>
              {link.text}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

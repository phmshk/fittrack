import { useNavLinks } from "@/shared/lib/hooks/useNavLinks";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/shared/shadcn/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";

export const DesktopNavigation = () => {
  const routes = useNavLinks();
  console.log("Routes:", routes);
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-4">
        {routes.map((link) => (
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

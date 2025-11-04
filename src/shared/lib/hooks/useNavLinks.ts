import type { NavTab } from "@/shared/model";
import { useRouter } from "@tanstack/react-router";
import { useMemo } from "react";

type NavLink = {
  href: string;
  text: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

/**
 * A custom hook to generate navigation links based on the router's routes.
 * It supports two types of navigation links:
 * 1. A main route marked with `isNavRoute: true`.
 * 2. Specific tabs within a route defined in a `navTabs` array in `staticData` and marked with `isNavRoute: true`.
 * @returns An array of navigation links derived from the router's routes.
 */
export const useNavLinks = (): Array<NavLink> => {
  const router = useRouter();

  const routes = useMemo(() => {
    const allNavLinks: Array<NavLink> = [];

    Object.values(router.routesByPath).forEach((route) => {
      const { staticData } = route.options;
      if (!staticData) return;

      // Check if the route itself is a main navigation route
      if (staticData.isNavRoute) {
        allNavLinks.push({
          href: route.fullPath,
          text: staticData.key,
          Icon: staticData.icon,
        });
      }

      // Check if the route has any navigation tabs
      if (staticData.navTabs) {
        staticData.navTabs.forEach((tab: NavTab) => {
          if (tab.isNavRoute) {
            const searchString = `?tab=${tab.href}`;
            const href = route.fullPath + searchString;
            allNavLinks.push({
              href,
              text: tab.title,
              Icon: tab.Icon,
            });
          }
        });
      }
    });

    return allNavLinks.sort((a, b) => a.text.localeCompare(b.text));
  }, [router.routesByPath]);

  return routes;
};

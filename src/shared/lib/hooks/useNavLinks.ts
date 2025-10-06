import { useRouter } from "@tanstack/react-router";
import { useMemo } from "react";

/**
 * A custom hook to generate navigation links based on the router's routes.
 * It filters routes that are marked as navigation routes and maps them to an array of link objects.
 * Each link contains an `href` and `text` property.
 * @returns An array of navigation links derived from the router's routes.
 */
export const useNavLinks = () => {
  const router = useRouter();

  const routes = useMemo(() => {
    return Object.values(router.routesByPath)
      .filter((route) => route.options.staticData.isNavRoute)
      .sort((a, b) =>
        a.options.staticData.title.localeCompare(b.options.staticData.title),
      )
      .map((route) => {
        return {
          href: route.fullPath,
          text: route.options.staticData.title,
        };
      });
  }, [router.routesByPath]);

  return routes;
};

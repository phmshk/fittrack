import { profileTabs, type ProfileTab } from "@/entities/profile";
import { useMemo } from "react";
import { useSearch } from "@tanstack/react-router";

type ProfileNavLink = {
  href: ProfileTab["href"];
  text: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
};

/**
 * Custom hook to generate navigation links specifically for the profile page tabs.
 * It also determines which link is currently active based on the URL search params.
 * @returns An array of navigation links for the profile page.
 */
export const useProfileNavLinks = (): Array<ProfileNavLink> => {
  const { tab: activeTab } = useSearch({
    from: "/_protectedRoutes/_profile/profile",
  });

  const navLinks = useMemo(() => {
    return Object.values(profileTabs).map(({ href, title, Icon }) => ({
      href,
      text: title,
      Icon,
      isActive: activeTab === href,
    }));
  }, [activeTab]);

  return navLinks;
};

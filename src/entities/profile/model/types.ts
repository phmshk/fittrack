import { Cog, LayoutGrid, Target, UserIcon } from "lucide-react";
import type { ProfileSearchSchema } from "./zodSchema";

export type ProfileTab = {
  title: string;
  href: ProfileSearchSchema["tab"];
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isNavRoute: boolean;
};

export const profileTabs: Record<string, ProfileTab> = {
  OVERVIEW: {
    title: "Overview",
    href: "overview",
    Icon: LayoutGrid,
    isNavRoute: false,
  },
  GOALS: { title: "Goals", href: "goals", Icon: Target, isNavRoute: false },
  PERSONAL_INFO: {
    title: "Personal Info",
    href: "personal-info",
    Icon: UserIcon,
    isNavRoute: false,
  },
  SETTINGS: {
    title: "Settings",
    href: "settings",
    Icon: Cog,
    isNavRoute: false,
  },
};

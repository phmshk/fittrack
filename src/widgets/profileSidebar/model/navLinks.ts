import type { ProfileSearchSchema } from "@/pages/profilePage";
import {
  BarChart3,
  Cog,
  LayoutGrid,
  Target,
  User as UserIcon,
} from "lucide-react";
type NavLink = {
  href: ProfileSearchSchema["tab"];
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const navLinks: NavLink[] = [
  {
    href: "overview",
    label: "Overview",
    icon: LayoutGrid,
  },
  {
    href: "goals",
    label: "My Goals",
    icon: Target,
  },
  {
    href: "personal-info",
    label: "Personal Info",
    icon: UserIcon,
  },
  {
    href: "progress",
    label: "Progress",
    icon: BarChart3,
  },
  {
    href: "settings",
    label: "Settings",
    icon: Cog,
  },
];

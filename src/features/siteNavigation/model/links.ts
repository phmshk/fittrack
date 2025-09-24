interface NavLink {
  href: string;
  text: string;
}

// Navigation links for the site
export const NAV_LINKS_AS_ARRAY: NavLink[] = [
  { href: "/", text: "Dashboard" },
  { href: "/diary", text: "Diary" },
  { href: "/addFood", text: "Add Food" },
];

export const NAV_LINKS_BY_NAME: Record<string, NavLink> = {
  DASHBOARD: { href: "/", text: "Dashboard" },
  DIARY: { href: "/diary", text: "Diary" },
  ADD_FOOD: { href: "/addFood", text: "Add Food" },
};

interface NavLink {
  href: string;
  text: string;
}

// Navigation links for the site
export const NAV_LINKS: NavLink[] = [
  { href: "/dashboard", text: "Dashboard" },
  { href: "/diary", text: "Diary" },
  { href: "/recipes", text: "Recipes" },
  { href: "/training", text: "Training" },
];

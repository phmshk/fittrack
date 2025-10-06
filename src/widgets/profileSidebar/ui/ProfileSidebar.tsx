import { cn } from "@/shared/shadcn/lib/utils";
import { Link, useSearch } from "@tanstack/react-router";
import { navLinks } from "../model/navLinks";

export const ProfileSidebar = () => {
  const { tab } = useSearch({ from: "/_protectedRoutes/profile/" });

  return (
    <nav className="flex flex-col space-y-1">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          to="/profile"
          search={{ tab: link.href }}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            tab === link.href
              ? "bg-secondary text-secondary-foreground"
              : "hover:bg-secondary/50",
          )}
        >
          <link.icon className="h-4 w-4" />
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

import { useNavLinks } from "@/shared/lib";
import { Link, useLocation } from "@tanstack/react-router";

export const MobileBottomNav = () => {
  const navLinks = useNavLinks();
  const location = useLocation();
  return (
    <footer className="bg-background sticky bottom-0 z-50 w-full rounded-t-md border-t shadow-md md:rounded-none">
      <nav className="relative p-2">
        <ul className="flex justify-around">
          {navLinks.map(({ href, text, Icon }) => {
            const isActive = location.pathname === href;
            return (
              <li
                key={href}
                className="relative flex h-full items-center justify-center"
              >
                <Link
                  to={href}
                  className={`flex flex-col items-center ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <Icon strokeWidth={1.5} />
                  <span className="mt-1 block text-xs">{text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
};

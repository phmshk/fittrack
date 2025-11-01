import { useNavLinks } from "@/shared/lib";
import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const MobileBottomNav = () => {
  const navLinks = useNavLinks();
  const location = useLocation();
  const { t } = useTranslation("common");
  return (
    <footer className="bg-background sticky bottom-0 z-50 w-full rounded-t-md border-t shadow-sm md:rounded-none">
      <nav className="relative p-2">
        <ul className="flex justify-around">
          {navLinks.map(({ href, Icon }) => {
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
                  <span className="mt-1 block text-xs">
                    {t(`common:nav.${href}`)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
};

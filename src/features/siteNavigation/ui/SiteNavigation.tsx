import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";

export const SiteNavigation = () => {
  return (
    <nav aria-label="Main navigation">
      {/* Show on md(768px) screens and up */}
      <div className="hidden md:block">
        <DesktopNavigation />
      </div>

      {/* Show on screens smaller than md(768px) */}
      <div className="md:hidden">
        <MobileNavigation />
      </div>
    </nav>
  );
};

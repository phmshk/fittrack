import { Logo } from "@/entities/brand";
import { DesktopNavigation } from "@/features/siteNavigation";
import { UserMenu } from "@/widgets/userMenu";

export const DesktopHeader = () => {
  return (
    <div className="block">
      <div className="flex h-16 items-center justify-between">
        {/* Left side: Logo and Title */}
        <Logo />

        {/* Right side: Navigation Menu and profile menu */}
        <div className="flex items-center gap-4">
          <DesktopNavigation />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

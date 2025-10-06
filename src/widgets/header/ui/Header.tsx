import { Logo } from "@/entities/brand";
import { SiteNavigation } from "@/features/siteNavigation";
import { Container } from "@/shared/ui/container";
import { UserMenu } from "@/widgets/userMenu";

export const Header = () => {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b shadow-sm">
      <Container className="py-0">
        {/* Container component to center and constrain the header content */}
        <div className="flex h-16 items-center justify-between">
          {/* Left side: Logo and Title */}
          <Logo />

          {/* Right side: Navigation Menu and Auth Buttons */}
          <div className="flex items-center gap-4">
            {/* Navigation Menu. Both Desktop and Mobile versions. */}
            <SiteNavigation />
            {/* User Menu with Avatar and Dropdown */}
            <div className="hidden md:block">
              <UserMenu />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

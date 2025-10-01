import { Logo } from "@/entities/brand";
import { LogoutButton } from "@/features/logout";
import { SiteNavigation } from "@/features/siteNavigation";
import { Container } from "@/shared/ui/container";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      {/* Container component to center and constrain the header content */}
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Left side: Logo and Title */}
          <Logo />

          {/* Right side: Navigation Menu and Auth Buttons */}
          <div className="flex items-center">
            {/* Navigation Menu. Both Desktop and Mobile versions. */}
            <SiteNavigation />
            <div className="hidden md:ml-4 md:block">
              <LogoutButton />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

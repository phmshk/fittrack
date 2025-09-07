import { Logo } from "@/entities/brand";
import { AuthActions } from "@/features/authActions/ui/AuthActions";
import { SiteNavigation } from "@/features/siteNavigation";
import { Container } from "@/shared/ui";

export const Header = () => {
  return (
    <header className="sticky top-0 w-full border-b shadow-sm z-50 bg-background">
      {/* Container component to center and constrain the header content */}
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Left side: Logo and Title */}
          <Logo />

          {/* Right side: Navigation Menu and Auth Buttons */}
          <div className="flex items-center">
            {/* Navigation Menu. Both Desktop and Mobile versions. */}
            <SiteNavigation />

            {/* Auth Buttons */}
            <div className="hidden md:block md:ml-4">
              <AuthActions />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

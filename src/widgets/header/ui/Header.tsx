import { Container } from "@/shared/ui/container";
import { MobileHeader } from "./MobileHeader";
import { DesktopHeader } from "./DesktopHeader";
import { useBreakpoint } from "@/shared/lib";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
}

export const Header = (props: HeaderProps) => {
  const { showBackButton = false, title } = props;
  const { isMobile } = useBreakpoint();

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b shadow-sm">
      <Container className="md:py-0">
        {isMobile ? (
          <MobileHeader showBackButton={showBackButton} title={title} />
        ) : (
          <DesktopHeader />
        )}
      </Container>
    </header>
  );
};

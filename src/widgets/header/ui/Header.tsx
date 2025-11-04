import { Container } from "@/shared/ui/container";
import { MobileHeader } from "./MobileHeader";
import { DesktopHeader } from "./DesktopHeader";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showMobileHeaderNav?: boolean;
  isMobile: boolean;
  emptyHeader?: boolean;
}

export const Header = (props: HeaderProps) => {
  const {
    showBackButton = false,
    title,
    isMobile,
    showMobileHeaderNav,
    emptyHeader,
  } = props;
  const { t } = useTranslation("common");

  return (
    <header className="bg-background sticky top-0 z-50 w-full rounded-b-md border-b shadow-sm md:rounded-none">
      <Container className="md:py-0">
        {isMobile ? (
          <MobileHeader
            showBackButton={showBackButton}
            title={title && t(`common:mobileHeaderTitles.${title}`)}
            showMobileHeaderNav={showMobileHeaderNav}
            emptyHeader={emptyHeader}
          />
        ) : (
          <DesktopHeader />
        )}
      </Container>
    </header>
  );
};

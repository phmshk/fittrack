import { MobileBottomNav } from "./MobileBottomNav";

interface FooterProps {
  isMobile: boolean;
}

export const Footer = (props: FooterProps) => {
  const { isMobile } = props;
  return isMobile && <MobileBottomNav />;
};

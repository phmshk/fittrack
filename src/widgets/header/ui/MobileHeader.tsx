import { router } from "@/app/main";
import { Logo } from "@/entities/brand";
import { MobileProfileNavigation } from "@/features/siteNavigation";
import { Button } from "@/shared/shadcn/components/ui/button";
import { H2 } from "@/shared/ui/headings";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, User2Icon } from "lucide-react";

interface MobileHeaderProps {
  showBackButton?: boolean;
  title?: string;
  showMobileHeaderNav?: boolean;
}

export const MobileHeader = (props: MobileHeaderProps) => {
  const { showBackButton, title, showMobileHeaderNav } = props;
  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.history.back()}
          >
            <ArrowLeft className="size-5" />
          </Button>
        )}
      </div>
      {title ? <H2>{title}</H2> : <Logo />}
      {showMobileHeaderNav ? (
        <MobileProfileNavigation />
      ) : (
        <div>
          <Link
            to="/profile"
            search={{ tab: "personal-info" }}
            aria-label="Profile"
          >
            <User2Icon className="size-5" strokeWidth={2} />
          </Link>
        </div>
      )}
    </div>
  );
};

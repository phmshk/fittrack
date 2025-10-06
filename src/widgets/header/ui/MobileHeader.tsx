import { router } from "@/app/main";
import { Logo } from "@/entities/brand";
import { Button } from "@/shared/shadcn/components/ui/button";
import { H2 } from "@/shared/ui/headings";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, User2Icon } from "lucide-react";

interface MobileHeaderProps {
  showBackButton?: boolean;
  title?: string;
}

export const MobileHeader = (props: MobileHeaderProps) => {
  const { showBackButton, title } = props;
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
      <div>
        <Link to="/profile" search={{ tab: "overview" }} aria-label="Profile">
          <User2Icon className="size-5" />
        </Link>
      </div>
    </div>
  );
};

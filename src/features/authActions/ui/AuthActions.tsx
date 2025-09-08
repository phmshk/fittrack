import { NAV_LINKS_BY_NAME } from "@/features/siteNavigation/model/links";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Link } from "@tanstack/react-router";

interface AuthActionsProps {
  classes?: string;
}

export const AuthActions = ({ classes }: AuthActionsProps) => {
  return (
    <div className={`flex items-center space-x-4 ${classes}`}>
      <Button variant="ghost" asChild>
        <Link to={NAV_LINKS_BY_NAME.DASHBOARD.href}>Login</Link>
      </Button>
      <Button asChild>
        <Link to={NAV_LINKS_BY_NAME.DASHBOARD.href}>Sign Up</Link>
      </Button>
    </div>
  );
};

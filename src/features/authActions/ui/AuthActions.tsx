import { Button } from "@/shared/shadcn/components/ui/button";
import { Link } from "@tanstack/react-router";

interface AuthActionsProps {
  classes?: string;
}

export const AuthActions = ({ classes }: AuthActionsProps) => {
  return (
    <div className={`flex items-center space-x-4 ${classes}`}>
      <Button variant="ghost" asChild>
        <Link to="/dashboard">Login</Link>
      </Button>
      <Button asChild>
        <Link to="/dashboard">Sign Up</Link>
      </Button>
    </div>
  );
};

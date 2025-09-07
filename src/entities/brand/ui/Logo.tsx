import { Link } from "@tanstack/react-router";
import { Gauge } from "lucide-react";

// Logo component for the application to be used in the header and elsewhere
export const Logo = () => {
  return (
    <Link
      to="/dashboard"
      className="flex items-center space-x-2 text-lg font-bold"
    >
      <Gauge className="h-6 w-6 text-primary" />
      <span>
        Fit<span className="text-primary">Track</span>
      </span>
    </Link>
  );
};

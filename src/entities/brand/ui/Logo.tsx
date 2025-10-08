import { Link } from "@tanstack/react-router";
import { Gauge } from "lucide-react";

// Logo component for the application to be used in the header and elsewhere
export const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center space-x-2 text-xl font-bold"
      aria-label="FitTrack Home Page"
    >
      <Gauge className="text-primary h-6 w-6" />
      <span>
        Fit<span className="text-primary">Track</span>
      </span>
    </Link>
  );
};

import { Button } from "@/shared/shadcn/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/shared/shadcn/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";
import { Gauge } from "lucide-react";

export function Header() {
  const isAuthenticated = false; // Replace with actual authentication logic
  return (
    <header className="flex h-16 w-full justify-between items-center border-b bg-white px-4 shadow-sm">
      {/* Left side: Logo and Title */}
      <div className="flex items-center space-x-2">
        <Gauge />
        <Link to="/dashboard">FitTrack</Link>
      </div>

      {/* Right side: Navigation Menu and Auth Buttons */}
      <div className="flex items-center space-x-8">
        {/* Navigation Menu */}
        <nav aria-label="Main navigation">
          <NavigationMenu>
            <NavigationMenuList className="space-x-4">
              <NavigationMenuItem>
                <Link to="/dashboard" activeProps={{ className: "font-bold " }}>
                  Dashboard
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/diary" activeProps={{ className: "font-bold " }}>
                  Diary
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/recipes" activeProps={{ className: "font-bold" }}>
                  Recipes
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/training"
                  activeProps={{ className: "font-bold text-blue-600" }}
                >
                  Training
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Authentication Buttons */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/** Display user's name or profile picture as Link */}
              {/* <Link to="/profile">{user.name}</Link> */}
              <Button
                variant="ghost"
                onClick={() => {
                  /* Handle logout */
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost">Login</Button>
              <Button>Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

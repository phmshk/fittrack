import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/shadcn/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useProfileNavLinks } from "../model/useProfileNavLinks";

export const MobileProfileNavigation = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const profileLinks = useProfileNavLinks();

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      {/* Button to open the burger menu */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
          <span className="sr-only">Open profile menu</span>
        </Button>
      </SheetTrigger>

      {/* Mobile navigation content */}
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold">Profile</SheetTitle>
          <SheetDescription className="sr-only">
            Navigation for mobile devices.
          </SheetDescription>
        </SheetHeader>

        {/* Mobile navigation items */}
        <ul aria-label="Mobile navigation" className="flex flex-col space-y-4">
          {profileLinks.map(({ href, text, Icon, isActive }) => (
            <li key={href}>
              <SheetClose asChild>
                <Link
                  to={"/profile"}
                  search={{ tab: href }}
                  replace={true}
                  className={`flex items-center gap-3 rounded-md p-3 text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground font-bold"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon />
                  <span className="ml-2">{text}</span>
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

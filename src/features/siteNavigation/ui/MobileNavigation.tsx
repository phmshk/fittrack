import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/shadcn/components/ui/sheet";
import { Menu } from "lucide-react";
import { NAV_LINKS_AS_ARRAY } from "../model/links";
import { Link } from "@tanstack/react-router";
import { LogoutButton } from "@/features/logout";

export const MobileNavigation = () => {
  return (
    <Sheet>
      {/* Button to open the burger menu */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>

      {/* Mobile navigation content */}
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
        </SheetHeader>
        <SheetDescription className="sr-only">
          Navigation for mobile devices.
        </SheetDescription>

        {/* Mobile navigation items */}
        <ul aria-label="Mobile navigation" className="flex flex-col space-y-4">
          {NAV_LINKS_AS_ARRAY.map((link) => (
            <li key={link.href}>
              <SheetClose asChild>
                <Link
                  to={link.href}
                  className="block rounded-md p-3 text-lg font-medium transition-colors"
                  activeProps={{
                    className: "bg-accent font-bold text-accent-foreground",
                  }}
                >
                  {link.text}
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>

        {/* Authentication actions */}
        <SheetFooter className="ml-auto">
          <SheetClose asChild>
            <LogoutButton />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

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
import { Link } from "@tanstack/react-router";
import { UserMenu } from "@/widgets/userMenu";
import { useState } from "react";
import { useNavLinks } from "@/shared/lib";

export const MobileNavigation = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const routes = useNavLinks();
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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
          <SheetDescription className="sr-only">
            Navigation for mobile devices.
          </SheetDescription>
        </SheetHeader>

        {/* Mobile navigation items */}
        <ul aria-label="Mobile navigation" className="flex flex-col space-y-4">
          {routes.map((link) => (
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
            <UserMenu handleClose={() => setIsSheetOpen(false)} />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

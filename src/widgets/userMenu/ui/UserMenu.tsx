import { useCurrentUser } from "@/entities/user";
import { useLogout } from "@/features/logout";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/shadcn/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/shadcn/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { LogOutIcon } from "lucide-react";

interface UserMenuProps {
  handleClose?: () => void;
}

export const UserMenu = ({ handleClose }: UserMenuProps) => {
  const user = useCurrentUser();

  const logout = useLogout();

  // Fallback initials if the user name is not available
  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-10 cursor-pointer">
          {/* AvatarImage can be used here if you have user profile pictures */}
          <AvatarImage
            src={`https://placehold.co/100x100/e9f1ea/52946b?text=${getInitials(
              user?.name,
            )}`}
            alt="User avatar"
          />
          <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleClose} asChild>
          <Link
            to="/profile"
            search={{ tab: "overview" }}
            className="cursor-pointer"
          >
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={logout}
        >
          <LogOutIcon className="text-destructive h-4 w-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

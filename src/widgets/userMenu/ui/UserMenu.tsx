import { useCurrentUser } from "@/entities/user";
import { useLogout } from "@/features/logout";
import { getInitials } from "@/shared/lib/utils";
import { Avatar, AvatarFallback } from "@/shared/shadcn/components/ui/avatar";
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
import { useTranslation } from "react-i18next";

interface UserMenuProps {
  handleClose?: () => void;
}

export const UserMenu = ({ handleClose }: UserMenuProps) => {
  const user = useCurrentUser();
  const { t } = useTranslation("profile");
  const logout = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-10 cursor-pointer">
          <AvatarFallback className="bg-primary text-primary-foreground font-medium">
            {getInitials(user?.name)}
          </AvatarFallback>
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
            search={{ tab: "personal-info" }}
            className="cursor-pointer"
          >
            {t("profile:myProfile")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={logout}
        >
          <LogOutIcon className="text-destructive h-4 w-4" />
          {t("profile:logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

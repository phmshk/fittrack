import type { FoodLog } from "@/entities/day";
import { DeleteFood } from "@/features/deleteFood";
import { EditFood } from "@/features/editFood";
import { FoodDetails } from "@/features/foodDetails";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/shadcn/components/ui/dropdown-menu";
import { EllipsisVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface FoodOptionsProps {
  foodEntry: FoodLog;
}

export const FoodOptions = ({ foodEntry }: FoodOptionsProps) => {
  const { t } = useTranslation("common");
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleDetailsClick = () => {
    setDetailsOpen(true);
    setMenuOpen(false);
  };

  const handleEditClick = () => {
    setEditOpen(true);
    setMenuOpen(false);
  };

  const handleDeleteClick = () => {
    setDeleteOpen(true);
    setMenuOpen(false);
  };

  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger className="cursor-pointer">
          <EllipsisVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={handleEditClick}
            className="flex cursor-pointer items-center gap-1"
          >
            <Pencil className="h-4 w-4" /> {t("common:actions.edit")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDetailsClick}
            className="flex cursor-pointer items-center gap-1"
          >
            <Eye className="h-4 w-4" /> {t("common:actions.details")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className="flex cursor-pointer items-center gap-1"
          >
            <Trash2 className="text-destructive h-4 w-4" />{" "}
            {t("common:actions.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditFood food={foodEntry} isOpen={isEditOpen} setIsOpen={setEditOpen} />
      <FoodDetails
        foodEntry={foodEntry}
        isOpen={isDetailsOpen}
        setIsOpen={setDetailsOpen}
      />
      <DeleteFood
        food={foodEntry}
        isOpen={isDeleteOpen}
        setIsOpen={setDeleteOpen}
      />
    </>
  );
};

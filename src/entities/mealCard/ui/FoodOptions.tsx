import type { FoodEntry } from "@/entities/day";
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

interface FoodOptionsProps {
  foodEntry: FoodEntry;
}

export const FoodOptions = ({ foodEntry }: FoodOptionsProps) => {
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
            <Pencil className="h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDetailsClick}
            className="flex cursor-pointer items-center gap-1"
          >
            <Eye className="h-4 w-4" /> Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className="flex cursor-pointer items-center gap-1"
          >
            <Trash2 className="h-4 w-4 text-destructive" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditFood
        food={foodEntry}
        mealType={foodEntry.mealType}
        isOpen={isEditOpen}
        setIsOpen={setEditOpen}
      />
      <FoodDetails
        foodEntry={foodEntry}
        isOpen={isDetailsOpen}
        setIsOpen={setDetailsOpen}
      />
      <DeleteFood
        mealType={foodEntry.mealType}
        entryId={foodEntry.id}
        isOpen={isDeleteOpen}
        setIsOpen={setDeleteOpen}
      />
    </>
  );
};

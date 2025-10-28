import type { ProfileFormData } from "@/entities/user";
import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/shadcn/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/shared/shadcn/components/ui/field";
import { Input } from "@/shared/shadcn/components/ui/input";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type UseFormHandleSubmit,
} from "react-hook-form";

interface ProfileFieldModalProps<T extends FieldValues> {
  fieldName: Path<T>;
  control: Control<T>;
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: ProfileFormData) => void;
  handleSubmit: UseFormHandleSubmit<ProfileFormData>;
  type?: string;
}

export const ProfileFieldModal = <T extends FieldValues>(
  props: ProfileFieldModalProps<T>,
) => {
  const { fieldName, isOpen, onClose, onSave, control, handleSubmit } = props;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Edit {fieldName}</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form id="modal-form" onSubmit={handleSubmit(onSave)}>
          <Controller
            name={fieldName}
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder={`Enter your ${fieldName}`}
                  aria-invalid={fieldState.invalid}
                  autoFocus
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="modal-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

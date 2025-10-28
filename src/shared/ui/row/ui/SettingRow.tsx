import { Label } from "@/shared/shadcn/components/ui/label";

interface SettingRowProps {
  id: string;
  label: string;
  description: string;
  control: React.ReactNode;
}

export const SettingRow = ({
  id,
  label,
  description,
  control,
}: SettingRowProps) => (
  <div className="flex items-center justify-between gap-4 rounded-lg border p-4 shadow-sm">
    <div className="space-y-1">
      <Label htmlFor={id} className="text-base font-medium">
        {label}
      </Label>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
    {control}
  </div>
);

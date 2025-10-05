import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { cn } from "@/shared/shadcn/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  className?: string;
}

export const StatCard = ({ label, value, unit, className }: StatCardProps) => {
  return (
    <Card className={cn("text-center", className)}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-2xl font-bold">
          {value}
          {unit && <span className="text-base font-normal"> {unit}</span>}
        </p>
      </CardContent>
    </Card>
  );
};

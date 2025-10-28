interface InfoRowProps {
  label: string;
  value: string;
}

export const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
    <p className="text-base font-medium">{label}</p>
    <p className="text-muted-foreground text-sm">{value}</p>
  </div>
);

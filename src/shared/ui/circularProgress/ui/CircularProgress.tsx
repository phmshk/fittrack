interface CircularProgressProps {
  label: string;
  value: number;
  className?: string;
}

export const CircularProgress = ({
  label,
  value,
  className,
}: CircularProgressProps) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  // A simple placeholder for progress calculation. In a real app, this would be dynamic.
  const progress = 75; // Example: 75%
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <svg className="h-24 w-24 -rotate-90 transform" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-muted"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        {/* Progress circle */}
        <circle
          className={className}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          style={{ transition: "stroke-dashoffset 0.3s ease-in-out" }}
        />
      </svg>
      <div className="flex flex-col">
        <span className="text-lg font-bold">{value}g</span>
        <span className="text-muted-foreground text-xs">{label}</span>
      </div>
    </div>
  );
};

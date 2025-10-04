import { Apple, Dumbbell, GlassWater, Grape, Salad, Wheat } from "lucide-react";

export const CalculationAnimation = () => {
  const icons = [
    { Icon: Apple, color: "text-red-500", key: 1 },
    { Icon: Grape, color: "text-purple-500", key: 2 },
    { Icon: Salad, color: "text-green-500", key: 3 },
    { Icon: Wheat, color: "text-yellow-500", key: 4 },
    { Icon: GlassWater, color: "text-blue-500", key: 5 },
    { Icon: Dumbbell, color: "text-black-500", key: 6 },
  ];

  return (
    <div className="flex h-64 flex-col items-center justify-center space-y-8">
      <div className="calculation-container-fade">
        {icons.map(({ Icon, color, key }) => (
          <Icon key={key} className={`icon icon-${key} ${color} size-7`} />
        ))}
      </div>
      <p className="text-muted-foreground">
        Calculating your personalized goals...
      </p>
    </div>
  );
};

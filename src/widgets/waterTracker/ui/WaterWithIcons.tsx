import { GlassWater } from "lucide-react";
import { WATER_PORTION_ML } from "./WaterTracker";

interface WaterWithIconsProps {
  target: number;
  numberOfItems: number;
}

export const WaterWithIcons = (props: WaterWithIconsProps) => {
  const { numberOfItems, target } = props;

  const icons = Array.from(
    { length: Math.ceil(target / WATER_PORTION_ML) },
    (_, index) => {
      const isVisible = index < numberOfItems;
      return (
        <div key={crypto.randomUUID()}>
          <div className="relative inline-block">
            <GlassWater
              className={`text-background size-10`}
              strokeWidth={1.5}
            />

            <div className="absolute left-0 top-0">
              <GlassWater
                className={`size-10`}
                stroke={isVisible ? "var(--water-color)" : "transparent"}
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>
      );
    },
  );
  return <div className="flex flex-wrap gap-2">{icons}</div>;
};

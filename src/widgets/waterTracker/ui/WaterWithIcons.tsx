import { GlassWater } from "lucide-react";

interface WaterWithIconsProps {
  target: number;
  numberOfItems: number;
}

export const WaterWithIcons = (props: WaterWithIconsProps) => {
  const { numberOfItems, target } = props;

  const icons = Array.from({ length: target / 250 }, (_, index) => {
    const isVisible = index < numberOfItems;
    return (
      <div key={crypto.randomUUID()}>
        <div className="relative inline-block">
          <GlassWater className={`text-muted size-10`} strokeWidth={1.5} />

          <div className="absolute left-0 top-0">
            <GlassWater
              className={`size-10 ${isVisible ? "text-blue-600" : "text-muted"}`}
              stroke="currentColor"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>
    );
  });
  return <div className="flex flex-wrap gap-2">{icons}</div>;
};

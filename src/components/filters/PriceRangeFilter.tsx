
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  priceRange: number[];
  onPriceChange: (values: number[]) => void;
}

export const PriceRangeFilter = ({
  priceRange,
  onPriceChange
}: PriceRangeFilterProps) => {
  return (
    <div>
      <Label className="text-sm font-medium mb-3 block">
        Faixa de Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
      </Label>
      <Slider
        value={priceRange}
        onValueChange={onPriceChange}
        max={1000}
        min={0}
        step={10}
        className="mt-2"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>R$ 0</span>
        <span>R$ 1000+</span>
      </div>
    </div>
  );
};

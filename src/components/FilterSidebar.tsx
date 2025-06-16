
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterSidebarProps {
  onBrandChange: (brand: string) => void;
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  onClearFilters: () => void;
}

export const FilterSidebar = ({ onBrandChange, onPriceRangeChange, onClearFilters }: FilterSidebarProps) => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const popularBrands = [
    "Nike", "Adidas", "Samsung", "Apple", "Sony", 
    "LG", "Brastemp", "Electrolux", "Puma", "Under Armour"
  ];

  const handleBrandSelect = (brand: string) => {
    const newBrand = selectedBrand === brand ? "" : brand;
    setSelectedBrand(newBrand);
    onBrandChange(newBrand);
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    onPriceRangeChange({ min: values[0], max: values[1] });
  };

  const handleClearFilters = () => {
    setSelectedBrand("");
    setPriceRange([0, 1000]);
    onClearFilters();
  };

  return (
    <div className="w-64 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClearFilters}
            className="w-full"
          >
            Limpar Filtros
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Brand Filter */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Marca</Label>
            <div className="space-y-2">
              {popularBrands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrand === brand}
                    onCheckedChange={() => handleBrandSelect(brand)}
                  />
                  <Label htmlFor={brand} className="text-sm cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Faixa de Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
            </Label>
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
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
        </CardContent>
      </Card>
    </div>
  );
};

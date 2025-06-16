
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterSidebarProps {
  onBrandChange: (brands: string[]) => void;
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  onClearFilters: () => void;
  availableBrands: string[];
}

export const FilterSidebar = ({ onBrandChange, onPriceRangeChange, onClearFilters, availableBrands }: FilterSidebarProps) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // RULE 4: Create ordered brand list with selected brands at the top
  const getOrderedBrands = () => {
    if (selectedBrands.length === 0) {
      // No brands selected, show all brands in alphabetical order
      return availableBrands;
    }
    
    // Show selected brands first (in selection order), then unselected brands alphabetically
    const unselectedBrands = availableBrands
      .filter(brand => !selectedBrands.includes(brand))
      .sort();
    
    return [...selectedBrands, ...unselectedBrands];
  };

  const handleBrandToggle = (brand: string) => {
    console.log('=== BRAND TOGGLE ===');
    console.log('Toggling brand:', brand);
    console.log('Current selected brands:', selectedBrands);
    
    const newSelectedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    
    console.log('New selected brands:', newSelectedBrands);
    
    setSelectedBrands(newSelectedBrands);
    onBrandChange(newSelectedBrands);
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    onPriceRangeChange({ min: values[0], max: values[1] });
  };

  const handleClearFilters = () => {
    console.log('Clearing all filters');
    setSelectedBrands([]);
    setPriceRange([0, 1000]);
    onClearFilters();
  };

  const orderedBrands = getOrderedBrands();

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
            <Label className="text-sm font-medium mb-3 block">
              Marca {selectedBrands.length > 0 && `(${selectedBrands.length} selecionadas)`}
            </Label>
            <ScrollArea className="h-80 w-full rounded-md border p-2">
              <div className="space-y-2">
                {orderedBrands.length > 0 ? (
                  orderedBrands.map((brand) => {
                    const isSelected = selectedBrands.includes(brand);
                    return (
                      <div 
                        key={brand} 
                        className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
                          isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                        }`}
                      >
                        <Checkbox
                          id={brand}
                          checked={isSelected}
                          onCheckedChange={() => handleBrandToggle(brand)}
                        />
                        <Label 
                          htmlFor={brand} 
                          className={`text-sm cursor-pointer flex-1 ${
                            isSelected ? 'font-medium text-blue-700' : ''
                          }`}
                        >
                          {brand}
                        </Label>
                        {isSelected && (
                          <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                            {selectedBrands.indexOf(brand) + 1}
                          </span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500 p-2">Nenhuma marca encontrada</p>
                )}
              </div>
            </ScrollArea>
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

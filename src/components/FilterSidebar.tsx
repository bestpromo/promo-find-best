
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
  searchQuery?: string;
  allProducts?: any[];
  selectedBrands?: string[];
  priceRange?: { min: number; max: number };
}

export const FilterSidebar = ({ 
  onBrandChange, 
  onPriceRangeChange, 
  onClearFilters, 
  availableBrands,
  searchQuery,
  allProducts = [],
  selectedBrands = [],
  priceRange = { min: 0, max: 1000 }
}: FilterSidebarProps) => {
  const [localSelectedBrands, setLocalSelectedBrands] = useState<string[]>(selectedBrands);
  const [localPriceRange, setLocalPriceRange] = useState([priceRange.min, priceRange.max]);

  // Sync with parent state
  useEffect(() => {
    setLocalSelectedBrands(selectedBrands);
  }, [selectedBrands]);

  useEffect(() => {
    setLocalPriceRange([priceRange.min, priceRange.max]);
  }, [priceRange]);

  // Reset filters when search query changes
  useEffect(() => {
    console.log('FilterSidebar: Search query changed, resetting filters');
    setLocalSelectedBrands([]);
    setLocalPriceRange([0, 1000]);
  }, [searchQuery]);

  // Calculate product count for each brand
  const getBrandProductCount = (brand: string) => {
    return allProducts.filter(product => product.brand_name === brand).length;
  };

  // RULE 4: Create ordered brand list with selected brands at the top
  const getOrderedBrands = () => {
    if (localSelectedBrands.length === 0) {
      // No brands selected, show all brands in alphabetical order
      return availableBrands;
    }
    
    // Show selected brands first (in selection order), then unselected brands alphabetically
    const unselectedBrands = availableBrands
      .filter(brand => !localSelectedBrands.includes(brand))
      .sort();
    
    return [...localSelectedBrands, ...unselectedBrands];
  };

  const handleBrandToggle = (brand: string) => {
    console.log('=== BRAND TOGGLE ===');
    console.log('Toggling brand:', brand);
    console.log('Current selected brands:', localSelectedBrands);
    
    const newSelectedBrands = localSelectedBrands.includes(brand)
      ? localSelectedBrands.filter(b => b !== brand)
      : [...localSelectedBrands, brand];
    
    console.log('New selected brands:', newSelectedBrands);
    
    setLocalSelectedBrands(newSelectedBrands);
    onBrandChange(newSelectedBrands);
  };

  const handlePriceChange = (values: number[]) => {
    setLocalPriceRange(values);
    onPriceRangeChange({ min: values[0], max: values[1] });
  };

  const handleClearFilters = () => {
    console.log('Clearing all filters');
    setLocalSelectedBrands([]);
    setLocalPriceRange([0, 1000]);
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
              Marca {localSelectedBrands.length > 0 && `(${localSelectedBrands.length} selecionadas)`}
            </Label>
            <ScrollArea className="h-80 w-full rounded-md border p-2">
              <div className="space-y-2">
                {orderedBrands.length > 0 ? (
                  orderedBrands.map((brand) => {
                    const isSelected = localSelectedBrands.includes(brand);
                    const productCount = getBrandProductCount(brand);
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
                        <div className="flex items-center justify-between w-full">
                          <Label 
                            htmlFor={brand} 
                            className={`text-sm cursor-pointer ${
                              isSelected ? 'font-medium text-blue-700' : ''
                            }`}
                          >
                            {brand}
                          </Label>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              ({productCount})
                            </span>
                            {isSelected && (
                              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                                {localSelectedBrands.indexOf(brand) + 1}
                              </span>
                            )}
                          </div>
                        </div>
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
              Faixa de Preço: R$ {localPriceRange[0]} - R$ {localPriceRange[1]}
            </Label>
            <Slider
              value={localPriceRange}
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

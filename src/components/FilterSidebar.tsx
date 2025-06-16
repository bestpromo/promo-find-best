
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterSidebarProps {
  onBrandChange: (brands: string[]) => void;
  onStoreChange: (stores: string[]) => void;
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  onClearFilters: () => void;
  availableBrands: string[];
  availableStores: string[];
  searchQuery?: string;
  allProducts?: any[];
  selectedBrands?: string[];
  selectedStores?: string[];
  priceRange?: { min: number; max: number };
}

export const FilterSidebar = ({ 
  onBrandChange,
  onStoreChange,
  onPriceRangeChange, 
  onClearFilters, 
  availableBrands,
  availableStores,
  searchQuery,
  allProducts = [],
  selectedBrands = [],
  selectedStores = [],
  priceRange = { min: 0, max: 1000 }
}: FilterSidebarProps) => {
  const [localSelectedBrands, setLocalSelectedBrands] = useState<string[]>(selectedBrands);
  const [localSelectedStores, setLocalSelectedStores] = useState<string[]>(selectedStores);
  const [localPriceRange, setLocalPriceRange] = useState([priceRange.min, priceRange.max]);

  // Sync with parent state
  useEffect(() => {
    setLocalSelectedBrands(selectedBrands);
  }, [selectedBrands]);

  useEffect(() => {
    setLocalSelectedStores(selectedStores);
  }, [selectedStores]);

  useEffect(() => {
    setLocalPriceRange([priceRange.min, priceRange.max]);
  }, [priceRange]);

  // Reset filters when search query changes
  useEffect(() => {
    if (searchQuery !== undefined) {
      console.log('FilterSidebar: Search query changed, resetting filters');
      setLocalSelectedBrands([]);
      setLocalSelectedStores([]);
      setLocalPriceRange([0, 1000]);
    }
  }, [searchQuery]);

  // Calculate product count for each brand considering current store filters
  const getBrandProductCount = (brand: string) => {
    let filteredProducts = allProducts.filter(product => product.brand_name === brand);
    
    // If stores are selected, also filter by stores
    if (localSelectedStores.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        localSelectedStores.includes(product.store_name)
      );
    }
    
    return filteredProducts.length;
  };

  // Calculate product count for each store considering current brand filters
  const getStoreProductCount = (store: string) => {
    let filteredProducts = allProducts.filter(product => product.store_name === store);
    
    // If brands are selected, also filter by brands
    if (localSelectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        localSelectedBrands.includes(product.brand_name)
      );
    }
    
    return filteredProducts.length;
  };

  // Create ordered brand list with selected brands at the top
  const getOrderedBrands = () => {
    if (localSelectedBrands.length === 0) {
      return availableBrands.sort();
    }
    
    const unselectedBrands = availableBrands
      .filter(brand => !localSelectedBrands.includes(brand))
      .sort();
    
    return [...localSelectedBrands, ...unselectedBrands];
  };

  // Create ordered store list with selected stores at the top
  const getOrderedStores = () => {
    if (localSelectedStores.length === 0) {
      return availableStores.sort();
    }
    
    const unselectedStores = availableStores
      .filter(store => !localSelectedStores.includes(store))
      .sort();
    
    return [...localSelectedStores, ...unselectedStores];
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

  const handleStoreToggle = (store: string) => {
    console.log('=== STORE TOGGLE ===');
    console.log('Toggling store:', store);
    console.log('Current selected stores:', localSelectedStores);
    
    const newSelectedStores = localSelectedStores.includes(store)
      ? localSelectedStores.filter(s => s !== store)
      : [...localSelectedStores, store];
    
    console.log('New selected stores:', newSelectedStores);
    
    setLocalSelectedStores(newSelectedStores);
    onStoreChange(newSelectedStores);
  };

  const handlePriceChange = (values: number[]) => {
    setLocalPriceRange(values);
    onPriceRangeChange({ min: values[0], max: values[1] });
  };

  const handleClearFilters = () => {
    console.log('Clearing all filters');
    setLocalSelectedBrands([]);
    setLocalSelectedStores([]);
    setLocalPriceRange([0, 1000]);
    onClearFilters();
  };

  const orderedBrands = getOrderedBrands();
  const orderedStores = getOrderedStores();

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
                          id={`brand-${brand}`}
                          checked={isSelected}
                          onCheckedChange={() => handleBrandToggle(brand)}
                        />
                        <div className="flex items-center justify-between w-full">
                          <Label 
                            htmlFor={`brand-${brand}`} 
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

          {/* Store Filter */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Loja {localSelectedStores.length > 0 && `(${localSelectedStores.length} selecionadas)`}
            </Label>
            <ScrollArea className="h-80 w-full rounded-md border p-2">
              <div className="space-y-2">
                {orderedStores.length > 0 ? (
                  orderedStores.map((store) => {
                    const isSelected = localSelectedStores.includes(store);
                    const productCount = getStoreProductCount(store);
                    return (
                      <div 
                        key={store} 
                        className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
                          isSelected ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'
                        }`}
                      >
                        <Checkbox
                          id={`store-${store}`}
                          checked={isSelected}
                          onCheckedChange={() => handleStoreToggle(store)}
                        />
                        <div className="flex items-center justify-between w-full">
                          <Label 
                            htmlFor={`store-${store}`} 
                            className={`text-sm cursor-pointer ${
                              isSelected ? 'font-medium text-green-700' : ''
                            }`}
                          >
                            {store}
                          </Label>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              ({productCount})
                            </span>
                            {isSelected && (
                              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                                {localSelectedStores.indexOf(store) + 1}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500 p-2">Nenhuma loja encontrada</p>
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

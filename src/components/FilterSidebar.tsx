
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrandFilter } from "./filters/BrandFilter";
import { StoreFilter } from "./filters/StoreFilter";
import { PriceRangeFilter } from "./filters/PriceRangeFilter";

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

  // Add debug logs for stores
  useEffect(() => {
    console.log('=== FILTER SIDEBAR DEBUG ===');
    console.log('availableStores:', availableStores);
    console.log('availableStores length:', availableStores.length);
    console.log('allProducts sample (first 3):', allProducts.slice(0, 3).map(p => ({
      title: p.title,
      store_name: p.store_name,
      brand_name: p.brand_name
    })));
    console.log('Unique store_names from products:', [...new Set(allProducts.map(p => p.store_name))]);
  }, [availableStores, allProducts]);

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
          <BrandFilter
            availableBrands={availableBrands}
            selectedBrands={localSelectedBrands}
            allProducts={allProducts}
            selectedStores={localSelectedStores}
            onBrandToggle={handleBrandToggle}
          />

          <StoreFilter
            availableStores={availableStores}
            selectedStores={localSelectedStores}
            allProducts={allProducts}
            selectedBrands={localSelectedBrands}
            onStoreToggle={handleStoreToggle}
          />

          <PriceRangeFilter
            priceRange={localPriceRange}
            onPriceChange={handlePriceChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

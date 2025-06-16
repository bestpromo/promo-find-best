
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
      setLocalSelectedBrands([]);
      setLocalSelectedStores([]);
      setLocalPriceRange([0, 1000]);
    }
  }, [searchQuery]);

  // Clean up selected brands when stores change
  useEffect(() => {
    if (localSelectedStores.length > 0) {
      // Get brands available in selected stores
      const brandsInSelectedStores = [...new Set(
        allProducts
          .filter(product => localSelectedStores.includes(product.store_name))
          .map(product => product.brand_name)
          .filter(brand => brand && brand !== 'Unknown Store')
      )];

      // Filter selected brands to only include those available in selected stores
      const validSelectedBrands = localSelectedBrands.filter(brand => 
        brandsInSelectedStores.includes(brand)
      );

      // If some brands were removed, update the selection
      if (validSelectedBrands.length !== localSelectedBrands.length) {
        setLocalSelectedBrands(validSelectedBrands);
        onBrandChange(validSelectedBrands);
      }
    }
  }, [localSelectedStores, allProducts]);

  const handleBrandToggle = (brand: string) => {
    const newSelectedBrands = localSelectedBrands.includes(brand)
      ? localSelectedBrands.filter(b => b !== brand)
      : [...localSelectedBrands, brand];
    
    setLocalSelectedBrands(newSelectedBrands);
    onBrandChange(newSelectedBrands);
  };

  const handleStoreToggle = (store: string) => {
    const newSelectedStores = localSelectedStores.includes(store)
      ? localSelectedStores.filter(s => s !== store)
      : [...localSelectedStores, store];
    
    setLocalSelectedStores(newSelectedStores);
    onStoreChange(newSelectedStores);
  };

  const handlePriceChange = (values: number[]) => {
    setLocalPriceRange(values);
    onPriceRangeChange({ min: values[0], max: values[1] });
  };

  const handleClearFilters = () => {
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
          {/* 1. Store Filter - First and independent */}
          <StoreFilter
            availableStores={availableStores}
            selectedStores={localSelectedStores}
            allProducts={allProducts}
            onStoreToggle={handleStoreToggle}
          />

          {/* 2. Brand Filter - Second, considers store selection */}
          <BrandFilter
            availableBrands={availableBrands}
            selectedBrands={localSelectedBrands}
            allProducts={allProducts}
            selectedStores={localSelectedStores}
            onBrandToggle={handleBrandToggle}
          />

          {/* 3. Price Range Filter - Third, considers store and brand selection */}
          <PriceRangeFilter
            priceRange={localPriceRange}
            onPriceChange={handlePriceChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

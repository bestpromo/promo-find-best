
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal } from "lucide-react";
import { FilterSidebar } from "./FilterSidebar";
import { SearchControls } from "./SearchControls";

interface MobileFiltersProps {
  onBrandChange: (brands: string[]) => void;
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  onClearFilters: () => void;
  onSortChange: (value: string) => void;
  onDisplayModeChange: (mode: 'grid' | 'list') => void;
  displayMode: 'grid' | 'list';
  availableBrands: string[];
  searchQuery?: string;
  allProducts?: any[];
  activeFiltersCount: number;
}

export const MobileFilters = ({
  onBrandChange,
  onPriceRangeChange,
  onClearFilters,
  onSortChange,
  onDisplayModeChange,
  displayMode,
  availableBrands,
  searchQuery,
  allProducts,
  activeFiltersCount
}: MobileFiltersProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Filtros Button */}
          <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 relative">
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filtros</span>
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="p-4">
                <FilterSidebar
                  onBrandChange={onBrandChange}
                  onPriceRangeChange={onPriceRangeChange}
                  onClearFilters={() => {
                    onClearFilters();
                    setIsFiltersOpen(false);
                  }}
                  availableBrands={availableBrands}
                  searchQuery={searchQuery}
                  allProducts={allProducts}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* Search Controls - Simplified for mobile */}
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="text-sm ml-1">Ordenar</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto">
                <SheetHeader className="pb-4">
                  <SheetTitle>Ordenar produtos</SheetTitle>
                </SheetHeader>
                <SearchControls 
                  onSortChange={onSortChange}
                  onDisplayModeChange={onDisplayModeChange}
                  displayMode={displayMode}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

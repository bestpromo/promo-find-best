
import { ReactNode } from "react";
import { SearchControls } from "@/components/SearchControls";
import { FilterSidebar } from "@/components/FilterSidebar";
import { MobileFilters } from "@/components/MobileFilters";

interface SearchPageLayoutProps {
  isMobile: boolean;
  query: string;
  displayMode: 'grid' | 'list';
  availableBrands: string[];
  availableStores: string[];
  displayProducts: any[];
  activeFiltersCount: number;
  selectedBrands: string[];
  selectedStores: string[];
  priceRange: { min: number; max: number };
  isLoading: boolean;
  onSortChange: (value: string) => void;
  onDisplayModeChange: (mode: 'grid' | 'list') => void;
  onBrandFilterChange: (brands: string[]) => void;
  onStoreFilterChange: (stores: string[]) => void;
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  onClearFilters: () => void;
  children: ReactNode;
}

export const SearchPageLayout = ({
  isMobile,
  query,
  displayMode,
  availableBrands,
  availableStores,
  displayProducts,
  activeFiltersCount,
  selectedBrands,
  selectedStores,
  priceRange,
  isLoading,
  onSortChange,
  onDisplayModeChange,
  onBrandFilterChange,
  onStoreFilterChange,
  onPriceRangeChange,
  onClearFilters,
  children
}: SearchPageLayoutProps) => {
  return (
    <>
      {/* Mobile Filters - Fixed below header */}
      {isMobile && (
        <div className="fixed top-[72px] left-0 right-0 z-40">
          <MobileFilters
            onBrandChange={onBrandFilterChange}
            onStoreChange={onStoreFilterChange}
            onPriceRangeChange={onPriceRangeChange}
            onClearFilters={onClearFilters}
            onSortChange={onSortChange}
            onDisplayModeChange={onDisplayModeChange}
            displayMode={displayMode}
            availableBrands={availableBrands}
            availableStores={availableStores}
            searchQuery={query}
            allProducts={displayProducts}
            activeFiltersCount={activeFiltersCount}
            selectedBrands={selectedBrands}
            selectedStores={selectedStores}
            priceRange={priceRange}
          />
        </div>
      )}

      {/* Desktop Controls - Only show on larger screens */}
      {!isMobile && (
        <div className="container mx-auto px-4 py-4 border-b">
          <SearchControls 
            onSortChange={onSortChange}
            onDisplayModeChange={onDisplayModeChange}
            displayMode={displayMode}
          />
        </div>
      )}

      {/* Main Content with appropriate padding */}
      <main className={`container mx-auto px-4 py-8 ${isMobile ? 'pt-[140px]' : ''}`}>
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar - Only show on larger screens */}
          {!isMobile && (
            <FilterSidebar
              onBrandChange={onBrandFilterChange}
              onStoreChange={onStoreFilterChange}
              onPriceRangeChange={onPriceRangeChange}
              onClearFilters={onClearFilters}
              availableBrands={availableBrands}
              availableStores={availableStores}
              searchQuery={query}
              allProducts={displayProducts}
              selectedBrands={selectedBrands}
              selectedStores={selectedStores}
              priceRange={priceRange}
              isLoading={isLoading}
            />
          )}

          {/* Products Section */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

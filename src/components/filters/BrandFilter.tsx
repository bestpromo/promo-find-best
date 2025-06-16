
import { FilterSection } from "./FilterSection";
import { FilterItem } from "./FilterItem";
import { FilterSkeleton } from "@/components/ui/skeleton";
import { useFilterCounts } from "@/hooks/useFilterCounts";

interface BrandFilterProps {
  availableBrands: string[];
  selectedBrands: string[];
  allProducts: any[];
  selectedStores: string[];
  onBrandToggle: (brand: string) => void;
  isLoading?: boolean;
  searchQuery?: string;
  priceRange?: { min: number; max: number };
}

export const BrandFilter = ({
  availableBrands,
  selectedBrands,
  allProducts,
  selectedStores,
  onBrandToggle,
  isLoading = false,
  searchQuery = "",
  priceRange = { min: 0, max: 1000 }
}: BrandFilterProps) => {
  // Get real filter counts
  const { data: filterCounts } = useFilterCounts({
    searchQuery,
    selectedStores,
    selectedBrands: [],
    priceRange
  });

  const { brandCounts = {} } = filterCounts || {};

  // The availableBrands now comes filtered from the backend based on selected stores
  // So we can use them directly without additional filtering
  const filteredBrands = availableBrands;

  // Get real product count for each brand
  const getBrandProductCount = (brand: string) => {
    return brandCounts[brand] || 0;
  };

  // Create ordered brand list with selected brands at the top, but only from filtered brands
  const getOrderedBrands = () => {
    const validSelectedBrands = selectedBrands.filter(brand => 
      filteredBrands.includes(brand)
    );
    
    if (validSelectedBrands.length === 0) {
      return filteredBrands.sort();
    }
    
    const unselectedBrands = filteredBrands
      .filter(brand => !validSelectedBrands.includes(brand))
      .sort();
    
    return [...validSelectedBrands, ...unselectedBrands];
  };

  const orderedBrands = getOrderedBrands();
  const validSelectedBrands = selectedBrands.filter(brand => filteredBrands.includes(brand));

  if (isLoading) {
    return (
      <FilterSection title="Marcas" showCount={false}>
        <FilterSkeleton />
      </FilterSection>
    );
  }

  return (
    <FilterSection 
      title="Marcas" 
      selectedCount={validSelectedBrands.length}
      showCount={validSelectedBrands.length > 0}
    >
      {orderedBrands.length > 0 ? (
        orderedBrands.map((brand) => {
          const isSelected = selectedBrands.includes(brand);
          const productCount = getBrandProductCount(brand);
          return (
            <FilterItem
              key={brand}
              id={`brand-${brand}`}
              label={brand}
              isSelected={isSelected}
              productCount={productCount}
              onToggle={() => onBrandToggle(brand)}
              selectedIndex={isSelected ? selectedBrands.indexOf(brand) : undefined}
              color="blue"
            />
          );
        })
      ) : (
        <p className="text-sm text-gray-500 p-2">
          {selectedStores.length > 0 
            ? "Nenhuma marca encontrada nos parceiros selecionados" 
            : "Nenhuma marca encontrada"
          }
        </p>
      )}
    </FilterSection>
  );
};

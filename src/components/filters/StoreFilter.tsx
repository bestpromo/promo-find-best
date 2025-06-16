
import { FilterSection } from "./FilterSection";
import { FilterItem } from "./FilterItem";
import { FilterSkeleton } from "@/components/ui/skeleton";
import { useFilterCounts } from "@/hooks/useFilterCounts";

interface StoreFilterProps {
  availableStores: string[];
  selectedStores: string[];
  allProducts: any[];
  onStoreToggle: (store: string) => void;
  isLoading?: boolean;
  searchQuery?: string;
  selectedBrands?: string[];
  priceRange?: { min: number; max: number };
}

export const StoreFilter = ({
  availableStores,
  selectedStores,
  allProducts,
  onStoreToggle,
  isLoading = false,
  searchQuery = "",
  selectedBrands = [],
  priceRange = { min: 0, max: 1000 }
}: StoreFilterProps) => {
  // Get real filter counts
  const { data: filterCounts } = useFilterCounts({
    searchQuery,
    selectedStores: [],
    selectedBrands,
    priceRange
  });

  const { storeCounts = {} } = filterCounts || {};

  // Get real product count for each store
  const getStoreProductCount = (store: string) => {
    return storeCounts[store] || 0;
  };

  // Create ordered store list with selected stores at the top
  const getOrderedStores = () => {
    if (selectedStores.length === 0) {
      return availableStores.sort();
    }
    
    const unselectedStores = availableStores
      .filter(store => !selectedStores.includes(store))
      .sort();
    
    return [...selectedStores, ...unselectedStores];
  };

  const orderedStores = getOrderedStores();

  if (isLoading) {
    return (
      <FilterSection title="Parceiros" showCount={false} className="h-48">
        <FilterSkeleton />
      </FilterSection>
    );
  }

  return (
    <FilterSection 
      title="Parceiros" 
      selectedCount={selectedStores.length} 
      showCount={selectedStores.length > 0}
      className="h-48"
    >
      {orderedStores.length > 0 ? (
        orderedStores.map((store) => {
          const isSelected = selectedStores.includes(store);
          const productCount = getStoreProductCount(store);
          return (
            <FilterItem
              key={store}
              id={`store-${store}`}
              label={store}
              isSelected={isSelected}
              productCount={productCount}
              onToggle={() => onStoreToggle(store)}
              selectedIndex={isSelected ? selectedStores.indexOf(store) : undefined}
              color="green"
            />
          );
        })
      ) : (
        <div>
          <p className="text-sm text-gray-500 p-2">Nenhum parceiro encontrado</p>
        </div>
      )}
    </FilterSection>
  );
};

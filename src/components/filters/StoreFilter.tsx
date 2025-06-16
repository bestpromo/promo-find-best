
import { FilterSection } from "./FilterSection";
import { FilterItem } from "./FilterItem";
import { FilterSkeleton } from "@/components/ui/skeleton";

interface StoreFilterProps {
  availableStores: string[];
  selectedStores: string[];
  allProducts: any[];
  onStoreToggle: (store: string) => void;
  isLoading?: boolean;
  searchQuery?: string;
}

export const StoreFilter = ({
  availableStores,
  selectedStores,
  allProducts,
  onStoreToggle,
  isLoading = false,
  searchQuery
}: StoreFilterProps) => {
  // For now, show a generic count since we don't have the full dataset
  // This will be improved when we get the full filter data from the backend
  const getStoreProductCount = (store: string) => {
    // Show a meaningful count - this could be enhanced to show real counts
    // from a separate API call if needed
    return "..."; // Placeholder until we implement real counts
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

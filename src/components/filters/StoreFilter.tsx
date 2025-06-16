
import { FilterSection } from "./FilterSection";
import { FilterItem } from "./FilterItem";

interface StoreFilterProps {
  availableStores: string[];
  selectedStores: string[];
  allProducts: any[];
  onStoreToggle: (store: string) => void;
}

export const StoreFilter = ({
  availableStores,
  selectedStores,
  allProducts,
  onStoreToggle
}: StoreFilterProps) => {
  // Calculate product count for each store from available data
  // Note: allProducts here represents the current search results, not filtered results
  const getStoreProductCount = (store: string) => {
    // Since we're showing counts based on search results, we count from allProducts
    // which represents the current page/search results
    const count = allProducts.filter(product => product.store_name === store).length;
    // If no products in current page, show that the store is available but count might be on other pages
    return count || 1; // Show at least 1 to indicate the store has products in the search
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

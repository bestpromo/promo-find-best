
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
  console.log('=== STORE FILTER DEBUG ===');
  console.log('availableStores:', availableStores);
  console.log('availableStores length:', availableStores.length);

  // Calculate product count for each store (independent of other filters)
  const getStoreProductCount = (store: string) => {
    const filteredProducts = allProducts.filter(product => product.store_name === store);
    return filteredProducts.length;
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

  console.log('orderedStores:', orderedStores);
  console.log('orderedStores length:', orderedStores.length);

  return (
    <FilterSection title="Loja" selectedCount={selectedStores.length}>
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
          <p className="text-sm text-gray-500 p-2">Nenhuma loja encontrada</p>
          <p className="text-xs text-red-500 p-2">Debug: availableStores = {availableStores.length}</p>
        </div>
      )}
    </FilterSection>
  );
};

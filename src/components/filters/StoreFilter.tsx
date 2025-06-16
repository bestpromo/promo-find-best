
import { FilterSection } from "./FilterSection";
import { FilterItem } from "./FilterItem";

interface StoreFilterProps {
  availableStores: string[];
  selectedStores: string[];
  allProducts: any[];
  selectedBrands: string[];
  onStoreToggle: (store: string) => void;
}

export const StoreFilter = ({
  availableStores,
  selectedStores,
  allProducts,
  selectedBrands,
  onStoreToggle
}: StoreFilterProps) => {
  console.log('=== STORE FILTER DEBUG ===');
  console.log('availableStores:', availableStores);
  console.log('availableStores length:', availableStores.length);

  // Calculate product count for each store considering current brand filters
  const getStoreProductCount = (store: string) => {
    let filteredProducts = allProducts.filter(product => product.store_name === store);
    
    // If brands are selected, also filter by brands
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        selectedBrands.includes(product.brand_name)
      );
    }
    
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
      {console.log('Rendering stores section, orderedStores:', orderedStores)}
      {orderedStores.length > 0 ? (
        orderedStores.map((store) => {
          console.log('Rendering store:', store);
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
          {console.log('No stores to show, debugging info:')}
          {console.log('availableStores:', availableStores)}
          {console.log('orderedStores:', orderedStores)}
          <p className="text-sm text-gray-500 p-2">Nenhuma loja encontrada</p>
          <p className="text-xs text-red-500 p-2">Debug: availableStores = {availableStores.length}</p>
        </div>
      )}
    </FilterSection>
  );
};

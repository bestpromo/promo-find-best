
import { FilterSection } from "./FilterSection";
import { FilterItem } from "./FilterItem";

interface BrandFilterProps {
  availableBrands: string[];
  selectedBrands: string[];
  allProducts: any[];
  selectedStores: string[];
  onBrandToggle: (brand: string) => void;
}

export const BrandFilter = ({
  availableBrands,
  selectedBrands,
  allProducts,
  selectedStores,
  onBrandToggle
}: BrandFilterProps) => {
  // Calculate product count for each brand considering current store filters
  const getBrandProductCount = (brand: string) => {
    let filteredProducts = allProducts.filter(product => product.brand_name === brand);
    
    // If stores are selected, also filter by stores
    if (selectedStores.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        selectedStores.includes(product.store_name)
      );
    }
    
    return filteredProducts.length;
  };

  // Create ordered brand list with selected brands at the top
  const getOrderedBrands = () => {
    if (selectedBrands.length === 0) {
      return availableBrands.sort();
    }
    
    const unselectedBrands = availableBrands
      .filter(brand => !selectedBrands.includes(brand))
      .sort();
    
    return [...selectedBrands, ...unselectedBrands];
  };

  const orderedBrands = getOrderedBrands();

  return (
    <FilterSection title="Marca" selectedCount={selectedBrands.length}>
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
        <p className="text-sm text-gray-500 p-2">Nenhuma marca encontrada</p>
      )}
    </FilterSection>
  );
};

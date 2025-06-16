
import { FilterSection } from "./FilterSection";
import { FilterItem } from "./FilterItem";
import { FilterSkeleton } from "@/components/ui/skeleton";

interface BrandFilterProps {
  availableBrands: string[];
  selectedBrands: string[];
  allProducts: any[];
  selectedStores: string[];
  onBrandToggle: (brand: string) => void;
  isLoading?: boolean;
}

export const BrandFilter = ({
  availableBrands,
  selectedBrands,
  allProducts,
  selectedStores,
  onBrandToggle,
  isLoading = false
}: BrandFilterProps) => {
  // Filter brands based on selected stores
  const getFilteredBrands = () => {
    if (selectedStores.length === 0) {
      return availableBrands;
    }
    
    // Get unique brands from products that belong to selected stores
    const brandsInSelectedStores = [...new Set(
      allProducts
        .filter(product => selectedStores.includes(product.store_name))
        .map(product => product.brand_name)
        .filter(brand => brand && brand !== 'Unknown Store')
    )].sort();
    
    // Return intersection of availableBrands and brandsInSelectedStores
    return availableBrands.filter(brand => brandsInSelectedStores.includes(brand));
  };

  const filteredBrands = getFilteredBrands();

  // Calculate product count for each brand considering current store filters
  const getBrandProductCount = (brand: string) => {
    let filteredProducts = allProducts.filter(product => product.brand_name === brand);
    
    // If stores are selected, also filter by stores
    if (selectedStores.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        selectedStores.includes(product.store_name)
      );
    }
    
    // Show at least 1 to indicate the brand has products in the search
    return filteredProducts.length || 1;
  };

  // Create ordered brand list with selected brands at the top, but only from filtered brands
  const getOrderedBrands = () => {
    // Filter selected brands to only include those available in selected stores
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


import { SearchBar } from "@/components/SearchBar";
import { ProductCard } from "@/components/ProductCard";
import { SearchControls } from "@/components/SearchControls";
import { useSearchParams, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";

const PRODUCTS_PER_PAGE = 20;

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<string>('name-asc');
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
  const [visibleProducts, setVisibleProducts] = useState(PRODUCTS_PER_PAGE);
  
  const query = searchParams.get("q") || "";
  const { data: products = [], isLoading } = useProducts(query, sortBy);

  // Sort products based on selected sorting option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-desc':
        return Number(b.price) - Number(a.price);
      case 'price-asc':
        return Number(a.price) - Number(b.price);
      case 'name-desc':
        return (b.nome || '').localeCompare(a.nome || '');
      case 'name-asc':
      default:
        return (a.nome || '').localeCompare(b.nome || '');
    }
  });

  const handleLoadMore = () => {
    setVisibleProducts(prev => prev + PRODUCTS_PER_PAGE);
  };

  const productsToShow = sortedProducts.slice(0, visibleProducts);
  const hasMoreProducts = visibleProducts < sortedProducts.length;

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-8">
            <Link to="/">
              <img 
                src="/lovable-uploads/5a8f2c7c-9460-4fbf-a4ab-7160fe6749d2.png" 
                alt="Bestpromo Logo" 
                className="h-8"
              />
            </Link>
            <SearchBar initialValue={query} className="flex-1" />
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-4 border-b">
        <SearchControls 
          onSortChange={setSortBy}
          onDisplayModeChange={setDisplayMode}
          displayMode={displayMode}
        />
      </div>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : (
          <>
            <div className={`
              ${displayMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' 
                : 'flex flex-col gap-6'
              }
            `}>
              {productsToShow.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  displayMode={displayMode}
                />
              ))}
            </div>
            
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found for "{query}"</p>
              </div>
            )}

            {hasMoreProducts && (
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleLoadMore}
                  variant="outline"
                  className="hover:bg-orange-500 hover:text-white"
                >
                  Load More Products
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default SearchPage;


import { useQuery } from "@tanstack/react-query";
import type { ProductView, ProductsResponse, ProductFilters } from "@/types/product";
import { createDataQuery, createFiltersQuery } from "@/utils/productQueries";
import { transformProductData, extractUniqueFilters } from "@/utils/productTransformers";

export const useProducts = (
  searchQuery: string, 
  sortBy: string, 
  page: number = 1,
  pageSize: number = 50,
  brandFilter?: string[], 
  priceRange?: { min: number; max: number },
  storeFilter?: string[]
) => {
  return useQuery({
    queryKey: ["products", searchQuery, sortBy, page, pageSize, brandFilter, priceRange, storeFilter],
    queryFn: async (): Promise<ProductsResponse> => {
      try {
        console.log('Fetching products with params:', { searchQuery, sortBy, page, pageSize, brandFilter, priceRange, storeFilter });

        const filters: ProductFilters = {
          searchQuery,
          sortBy,
          page,
          pageSize,
          brandFilter,
          priceRange,
          storeFilter
        };

        // Create queries
        const dataQuery = createDataQuery(filters);
        const filtersQuery = createFiltersQuery(filters);

        console.log('Executing simplified queries...');
        
        // Execute queries with shorter timeout
        const [{ data, error }, { data: filtersData, error: filtersError }] = await Promise.all([
          dataQuery,
          filtersQuery
        ]);

        if (error) {
          console.error("Error fetching data:", error);
          return { 
            products: [], 
            totalCount: 0, 
            hasMore: false, 
            availableBrands: [], 
            availableStores: [] 
          };
        }

        if (filtersError) {
          console.warn("Error fetching filters:", filtersError);
        }

        console.log('Query results:', { dataLength: data?.length, filtersDataLength: filtersData?.length });

        // Transform the data
        const products: ProductView[] = (data || []).map(transformProductData);

        // Extract unique brands and stores
        const { availableBrands, availableStores } = extractUniqueFilters(filtersData);

        // Simple pagination logic
        const hasMore = products.length === pageSize;
        const estimatedTotal = hasMore ? (page * pageSize + 1) : ((page - 1) * pageSize + products.length);

        console.log('Final results:', { 
          productsCount: products.length, 
          estimatedTotal, 
          hasMore, 
          page,
          pageSize,
          availableBrandsCount: availableBrands.length,
          availableStoresCount: availableStores.length 
        });

        return { 
          products, 
          totalCount: estimatedTotal, 
          hasMore, 
          availableBrands, 
          availableStores 
        };

      } catch (fallbackError) {
        console.error("Error in products query:", fallbackError);
        return { 
          products: [], 
          totalCount: 0, 
          hasMore: false, 
          availableBrands: [], 
          availableStores: [] 
        };
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    retryDelay: 1000,
  });
};

// Export types for external use
export type { ProductView, ProductsResponse } from "@/types/product";

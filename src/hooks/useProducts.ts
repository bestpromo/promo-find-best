import { useQuery } from "@tanstack/react-query";
import type { ProductView, ProductsResponse, ProductFilters } from "@/types/product";
import { createDataQuery, createCountQuery, createFiltersQuery } from "@/utils/productQueries";
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
        const countQuery = createCountQuery(filters);
        const filtersQuery = createFiltersQuery(filters);

        // Execute queries
        console.log('Executing queries...');
        const [{ data, error }, { count, error: countError }, { data: filtersData, error: filtersError }] = await Promise.all([
          dataQuery,
          countQuery,
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

        if (countError) {
          console.warn("Error fetching count:", countError);
        }

        if (filtersError) {
          console.warn("Error fetching filters:", filtersError);
        }

        console.log('Query results:', { dataLength: data?.length, count, filtersDataLength: filtersData?.length });

        // Transform the data
        const products: ProductView[] = (data || []).map(transformProductData);

        // Extract unique brands and stores
        const { availableBrands, availableStores } = extractUniqueFilters(filtersData);

        const totalCount = count || 0;
        const from = (page - 1) * pageSize;
        const hasMore = (from + products.length) < totalCount;

        console.log('Final results:', { 
          productsCount: products.length, 
          totalCount, 
          hasMore, 
          availableBrandsCount: availableBrands.length,
          availableStoresCount: availableStores.length 
        });

        return { 
          products, 
          totalCount, 
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
    // Keep data fresh for 5 minutes to avoid unnecessary refetches
    staleTime: 5 * 60 * 1000,
    // Add retry logic for failed queries
    retry: 2,
    retryDelay: 1000,
  });
};

// Export types for external use
export type { ProductView, ProductsResponse } from "@/types/product";

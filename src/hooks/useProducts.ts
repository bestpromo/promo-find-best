
import { useQuery } from "@tanstack/react-query";
import type { ProductView, ProductsResponse, ProductFilters } from "@/types/product";
import { transformProductData, extractUniqueFilters } from "@/utils/productTransformers";
import { supabase } from "@/integrations/supabase/client";

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
        console.log('=== STARTING PRODUCTS QUERY ===');
        console.log('Query params:', { searchQuery, sortBy, page, pageSize, brandFilter, priceRange, storeFilter });

        // Limit maximum records to 500 per request
        const maxRecords = 500;
        const limitedPageSize = Math.min(pageSize, maxRecords);

        // Helper function to apply search filter only (for counts and filters)
        const applySearchFilter = (query: any) => {
          if (searchQuery && searchQuery.trim()) {
            console.log('Applying search filter for:', searchQuery);
            query = query.ilike('title', `%${searchQuery.trim()}%`);
          }
          return query;
        };

        // Helper function to apply all filters to a query
        const applyAllFilters = (query: any) => {
          query = applySearchFilter(query);

          // Apply brand filter
          if (brandFilter && brandFilter.length > 0) {
            console.log('Applying brand filter:', brandFilter);
            query = query.in('brand_name', brandFilter);
          }

          // Apply store filter
          if (storeFilter && storeFilter.length > 0) {
            console.log('Applying store filter:', storeFilter);
            query = query.in('store_name', storeFilter);
          }

          // Apply price range filter
          if (priceRange && (priceRange.min > 0 || priceRange.max < 1000)) {
            console.log('Applying price range filter:', priceRange);
            query = query.gte('sale_price', priceRange.min).lte('sale_price', priceRange.max);
          }

          return query;
        };

        // 1. Get real total count for search term only (not filtered)
        console.log('Getting real total count for search term...');
        let totalCountQuery = supabase
          .from('offer_search')
          .select('*', { count: 'exact', head: true });
        
        totalCountQuery = applySearchFilter(totalCountQuery);
        const { count: realTotalCount, error: countError } = await totalCountQuery;

        if (countError) {
          console.error('Total count query failed:', countError);
        }

        console.log('Real total count for search term:', realTotalCount);

        // 2. Get available filters based on search term only (all products matching search)
        console.log('Getting available filters for all search results...');
        let filtersQuery = supabase.from('offer_search').select('brand_name, store_name, sale_price').limit(5000);
        filtersQuery = applySearchFilter(filtersQuery);

        const filtersResult = await filtersQuery;
        const { availableBrands, availableStores } = extractUniqueFilters(filtersResult.data || []);

        console.log('Available filters from all search results:', {
          brands: availableBrands.length,
          stores: availableStores.length
        });

        // 3. Get data with all filters applied (for current page)
        let dataQuery = supabase.from('offer_search').select('*');
        dataQuery = applyAllFilters(dataQuery);

        // Apply sorting
        switch (sortBy) {
          case 'price-desc':
            dataQuery = dataQuery.order('sale_price', { ascending: false });
            break;
          case 'price-asc':
            dataQuery = dataQuery.order('sale_price', { ascending: true });
            break;
          case 'nome-desc':
            dataQuery = dataQuery.order('title', { ascending: false });
            break;
          case 'nome-asc':
          default:
            dataQuery = dataQuery.order('title', { ascending: true });
            break;
        }

        // Apply pagination with limited page size
        const from = (page - 1) * limitedPageSize;
        const to = from + limitedPageSize - 1;
        dataQuery = dataQuery.range(from, to);

        console.log('Executing data query with limited pagination:', { from, to, limitedPageSize });
        const dataResult = await dataQuery;

        console.log('Data query result:', {
          error: dataResult.error,
          dataLength: dataResult.data?.length,
          status: dataResult.status
        });

        if (dataResult.error) {
          console.error('Data query failed:', dataResult.error);
          return { 
            products: [], 
            totalCount: realTotalCount || 0, 
            hasMore: false, 
            availableBrands, 
            availableStores 
          };
        }

        // Transform products
        const products: ProductView[] = (dataResult.data || []).map(transformProductData);
        console.log('Transformed products:', products.length);

        // Calculate hasMore based on real total vs current position
        const currentPosition = (page - 1) * limitedPageSize + products.length;
        const hasMore = products.length === limitedPageSize && currentPosition < (realTotalCount || 0);

        const result = {
          products,
          totalCount: realTotalCount || 0, // Use real count from database
          hasMore,
          availableBrands,
          availableStores
        };

        console.log('=== FINAL RESULT ===');
        console.log('Products returned:', result.products.length);
        console.log('Real total count:', result.totalCount);
        console.log('Has more:', result.hasMore);
        console.log('Available brands:', result.availableBrands.length);
        console.log('Available stores:', result.availableStores.length);

        return result;

      } catch (error) {
        console.error("CRITICAL ERROR in products query:", error);
        return { products: [], totalCount: 0, hasMore: false, availableBrands: [], availableStores: [] };
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    retryDelay: 1000,
  });
};

// Export types for external use
export type { ProductView, ProductsResponse } from "@/types/product";

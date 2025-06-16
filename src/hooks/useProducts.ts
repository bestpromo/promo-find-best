
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

        // Limit maximum records to 500 per request for data query only
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

        // 1. Get REAL total count using proper count query (no LIMIT!)
        console.log('Getting REAL total count for search results...');
        let totalCountQuery = supabase.from('offer_search').select('*', { count: 'exact', head: true });
        totalCountQuery = applySearchFilter(totalCountQuery);

        const totalCountResult = await totalCountQuery;
        const realTotalCount = totalCountResult.count || 0;
        console.log('REAL total count for search term:', realTotalCount);

        // 2. Get available filters based on search term only (using limited query for performance)
        console.log('Getting available filters for search results...');
        let allFiltersQuery = supabase.from('offer_search').select('brand_name, store_name, sale_price').limit(10000);
        allFiltersQuery = applySearchFilter(allFiltersQuery);

        const allFiltersResult = await allFiltersQuery;
        const { availableBrands: allBrands, availableStores: allStores } = extractUniqueFilters(allFiltersResult.data || []);

        // 3. Get filtered brands based on selected stores
        console.log('Getting filtered brands based on selected stores...');
        let filteredBrands = allBrands;
        if (storeFilter && storeFilter.length > 0) {
          let brandFilterQuery = supabase.from('offer_search').select('brand_name').limit(10000);
          brandFilterQuery = applySearchFilter(brandFilterQuery);
          brandFilterQuery = brandFilterQuery.in('store_name', storeFilter);
          
          const brandFilterResult = await brandFilterQuery;
          const { availableBrands } = extractUniqueFilters(brandFilterResult.data || []);
          filteredBrands = availableBrands;
        }

        console.log('Available filters:', {
          allBrands: allBrands.length,
          filteredBrands: filteredBrands.length,
          stores: allStores.length,
          filteredByStores: storeFilter && storeFilter.length > 0
        });

        // 4. Get data with all filters applied (for current page)
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
            totalCount: realTotalCount, 
            hasMore: false, 
            availableBrands: filteredBrands, 
            availableStores: allStores 
          };
        }

        // Transform products
        const products: ProductView[] = (dataResult.data || []).map(transformProductData);
        console.log('Transformed products:', products.length);

        // Calculate hasMore based on total vs current position
        const currentPosition = (page - 1) * limitedPageSize + products.length;
        const hasMore = products.length === limitedPageSize && currentPosition < realTotalCount;

        const result = {
          products,
          totalCount: realTotalCount, // Use the REAL count here
          hasMore,
          availableBrands: filteredBrands,
          availableStores: allStores
        };

        console.log('=== FINAL RESULT ===');
        console.log('Products returned:', result.products.length);
        console.log('REAL Total count:', result.totalCount);
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

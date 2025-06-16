
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

        // Helper function to apply all filters to a query
        const applyFilters = (query: any) => {
          // Apply search filter
          if (searchQuery && searchQuery.trim()) {
            console.log('Applying search filter for:', searchQuery);
            query = query.ilike('title', `%${searchQuery.trim()}%`);
          }

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

        // Get data with all filters applied - simplified approach
        let dataQuery = supabase.from('offer_search').select('*');
        dataQuery = applyFilters(dataQuery);

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
          return { products: [], totalCount: 0, hasMore: false, availableBrands: [], availableStores: [] };
        }

        // Transform products
        const products: ProductView[] = (dataResult.data || []).map(transformProductData);
        console.log('Transformed products:', products.length);

        // Get available filters based on search only (simplified query)
        let filtersQuery = supabase.from('offer_search').select('brand_name, store_name').limit(1000);
        if (searchQuery && searchQuery.trim()) {
          filtersQuery = filtersQuery.ilike('title', `%${searchQuery.trim()}%`);
        }

        const filtersResult = await filtersQuery;
        const { availableBrands, availableStores } = extractUniqueFilters(filtersResult.data || []);

        // Estimate total count based on returned data
        // If we got less than requested, we're likely at the end
        const estimatedTotalCount = products.length < limitedPageSize ? 
          ((page - 1) * limitedPageSize) + products.length :
          ((page - 1) * limitedPageSize) + products.length + limitedPageSize;

        const hasMore = products.length === limitedPageSize;

        const result = {
          products,
          totalCount: estimatedTotalCount,
          hasMore,
          availableBrands,
          availableStores
        };

        console.log('=== FINAL RESULT ===');
        console.log('Products returned:', result.products.length);
        console.log('Estimated total count:', result.totalCount);
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
